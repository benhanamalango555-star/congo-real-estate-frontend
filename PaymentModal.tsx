import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  amount: number;
  type: "publish" | "unlock";
  onConfirm?: () => void;
}

export default function PaymentModal({ open, onClose, amount, type, onConfirm }: PaymentModalProps) {
  const [copied, setCopied] = useState(false);
  const phoneNumber = "+243831140205";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-payment">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">
            {type === "publish" ? "Paiement de Publication" : "Débloquer le Numéro"}
          </DialogTitle>
          <DialogDescription>
            Suivez les instructions ci-dessous pour effectuer le paiement
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="bg-primary/10 rounded-lg p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Montant à payer</p>
            <p className="text-4xl font-bold text-primary" data-testid="text-payment-amount">
              {amount.toLocaleString()} CFA
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Étape 1: Composez</p>
              <div className="bg-muted rounded-lg p-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span className="font-mono text-lg font-semibold" data-testid="text-payment-number">
                    {phoneNumber}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="gap-2"
                  data-testid="button-copy-number"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Copié
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copier
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Étape 2: Effectuez le paiement</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Utilisez votre Mobile Money (Airtel Money, M-Pesa, Orange Money)</li>
                <li>• Envoyez exactement <strong>{amount.toLocaleString()} CFA</strong></li>
                <li>• Notez le numéro de transaction</li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Étape 3: Confirmation</p>
              <p className="text-sm text-muted-foreground">
                Après le paiement, cliquez sur "J'ai Payé" ci-dessous. Votre {type === "publish" ? "annonce" : "numéro"} sera validé par l'administrateur sous peu.
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1" data-testid="button-cancel-payment">
              Annuler
            </Button>
            <Button 
              onClick={() => {
                console.log('Payment confirmed');
                onConfirm?.();
              }} 
              className="flex-1"
              data-testid="button-confirm-payment"
            >
              J'ai Payé
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
