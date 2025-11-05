import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminAccessModal from "@/components/AdminAccessModal";
import HomePage from "@/pages/HomePage";
import BrowsePage from "@/pages/BrowsePage";
import PublishPage from "@/pages/PublishPage";
import PropertyDetailPage from "@/pages/PropertyDetailPage";
import AdminPage from "@/pages/AdminPage";
import NotFound from "@/pages/not-found";

function Router() {
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [, setLocation] = useState<any>();

  return (
    <div className="min-h-screen flex flex-col">
      <Header onAdminClick={() => setAdminModalOpen(true)} />
      
      <main className="flex-1">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/parcourir" component={BrowsePage} />
          <Route path="/publier" component={PublishPage} />
          <Route path="/propriete/:id" component={PropertyDetailPage} />
          <Route path="/admin" component={AdminPage} />
          <Route component={NotFound} />
        </Switch>
      </main>

      <Footer />

      <AdminAccessModal
        open={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onSuccess={() => {
          window.location.href = '/admin';
        }}
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
