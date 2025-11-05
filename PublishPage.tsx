import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import PublishForm from "@/components/PublishForm";
import PaymentModal from "@/components/PaymentModal";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { createListing, confirmPayment } from "@/lib/api";

export default function PublishPage() {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const createListingMutation = useMutation({
    mutationFn: createListing,
    onSuccess: (data) => {
      setPaymentId(data.payment.id);
      setPaymentModalOpen(true);
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const confirmPaymentMutation = useMutation({
    mutationFn: confirmPayment,
    onSuccess: () => {
      setPaymentModalOpen(false);
      toast({
        title: "Paiement confirmé",
        description: "Votre annonce sera publiée après validation par l'administrateur.",
      });
      setTimeout(() => {
        setLocation('/');
      }, 2000);
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleFormSubmit = (data: any) => {
    const formData = new FormData();
    
    Object.keys(data).forEach(key => {
      if (key === 'images') {
        data[key].forEach((file: File) => {
          formData.append('images', file);
        });
      } else if (data[key] !== undefined && data[key] !== '') {
        formData.append(key, data[key].toString());
      }
    });

    createListingMutation.mutate(formData);
  };

  const handlePaymentConfirm = () => {
    if (paymentId) {
      confirmPaymentMutation.mutate(paymentId);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <PublishForm onSubmit={handleFormSubmit} />
      
      <PaymentModal
        open={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        amount={1500}
        type="publish"
        onConfirm={handlePaymentConfirm}
      />
    </div>
  );
}
