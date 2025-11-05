import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, XCircle, Home, DollarSign, Eye } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { getPendingListings, getAllListingsAdmin, approveListing, rejectListing, approveAllListings } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const { toast } = useToast();

  const { data: pendingListings = [], isLoading: pendingLoading } = useQuery({
    queryKey: ['/api/admin/listings/pending'],
    queryFn: getPendingListings,
    refetchInterval: 5000,
  });

  const { data: allListings = [], isLoading: allLoading } = useQuery({
    queryKey: ['/api/admin/listings/all'],
    queryFn: getAllListingsAdmin,
    refetchInterval: 5000,
  });

  const approveMutation = useMutation({
    mutationFn: approveListing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listings/pending'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listings/all'] });
      queryClient.invalidateQueries({ queryKey: ['/api/listings'] });
      toast({
        title: "Annonce approuvée",
        description: "L'annonce a été approuvée avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectListing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listings/pending'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listings/all'] });
      toast({
        title: "Annonce rejetée",
        description: "L'annonce a été rejetée",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const approveAllMutation = useMutation({
    mutationFn: approveAllListings,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listings/pending'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/listings/all'] });
      queryClient.invalidateQueries({ queryKey: ['/api/listings'] });
      toast({
        title: "Approbation réussie",
        description: data.message,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const pendingCount = pendingListings.length;
  const approvedCount = allListings.filter(l => l.status === "approved").length;
  const confirmedPayments = allListings.filter(l => l.paymentStatus === "confirmed");
  const totalRevenue = confirmedPayments.length * 1500;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading" data-testid="text-dashboard-title">
            Tableau de Bord Administrateur
          </h1>
          <p className="text-muted-foreground">Gérez les annonces et les paiements</p>
        </div>
        
        {pendingCount > 0 && (
          <Button 
            size="lg" 
            onClick={() => approveAllMutation.mutate()}
            disabled={approveAllMutation.isPending}
            className="gap-2"
            data-testid="button-approve-all"
          >
            <CheckCircle2 className="h-5 w-5" />
            {approveAllMutation.isPending ? 'Traitement...' : `Approuver Tout (${pendingCount})`}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Annonces</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-listings">{allListings.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Attente</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary" data-testid="text-pending-listings">{pendingCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-revenue">{totalRevenue.toLocaleString()} CFA</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending" data-testid="tab-pending">
            En Attente ({pendingCount})
          </TabsTrigger>
          <TabsTrigger value="all" data-testid="tab-all">
            Toutes les Annonces
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : pendingListings.length > 0 ? (
            pendingListings.map(listing => (
              <Card key={listing.id} data-testid={`card-listing-${listing.id}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="text-lg font-semibold">{listing.propertyType}</h3>
                        <Badge variant={listing.paymentStatus === "confirmed" ? "default" : "secondary"}>
                          {listing.paymentStatus === "confirmed" ? "Payé" : "Paiement en attente"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {listing.city}, {listing.commune} - {listing.neighborhood}
                      </p>
                      <p className="text-lg font-bold">{listing.price.toLocaleString()} CFA</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Contact: {listing.phone}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {listing.rooms} chambre{listing.rooms > 1 ? 's' : ''} - {listing.transactionType}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => rejectMutation.mutate(listing.id)}
                        disabled={rejectMutation.isPending}
                        className="gap-2"
                        data-testid={`button-reject-${listing.id}`}
                      >
                        <XCircle className="h-4 w-4" />
                        Rejeter
                      </Button>
                      <Button
                        onClick={() => approveMutation.mutate(listing.id)}
                        disabled={approveMutation.isPending}
                        className="gap-2"
                        data-testid={`button-approve-${listing.id}`}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Approuver
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Aucune annonce en attente</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {allLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : allListings.length > 0 ? (
            allListings.map(listing => (
              <Card key={listing.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="text-lg font-semibold">{listing.propertyType}</h3>
                        <Badge variant={
                          listing.status === "approved" ? "default" :
                          listing.status === "rejected" ? "destructive" :
                          "secondary"
                        }>
                          {listing.status === "approved" ? "Approuvé" :
                           listing.status === "rejected" ? "Rejeté" :
                           "En attente"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {listing.city}, {listing.commune} - {listing.neighborhood}
                      </p>
                      <p className="text-lg font-bold">{listing.price.toLocaleString()} CFA</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {listing.rooms} chambre{listing.rooms > 1 ? 's' : ''} - {listing.transactionType}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Home className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Aucune annonce</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
