import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Lock } from "lucide-react";

interface AdminAccessModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AdminAccessModal({ open, onClose, onSuccess }: AdminAccessModalProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === "Ben&4002") {
      console.log('Admin access granted');
      onSuccess?.();
      onClose();
      setCode("");
      setError("");
    } else {
      setError("Code d'accès incorrect");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) {
        setCode("");
        setError("");
      }
      onClose();
    }}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-admin-access">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading flex items-center gap-2">
            <Lock className="h-6 w-6 text-primary" />
            Accès Administrateur
          </DialogTitle>
          <DialogDescription>
            Entrez le code secret pour accéder au tableau de bord
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="admin-code">Code d'Accès</Label>
            <Input
              id="admin-code"
              type="password"
              placeholder="Entrez le code secret..."
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError("");
              }}
              data-testid="input-admin-code"
            />
            {error && (
              <p className="text-sm text-destructive" data-testid="text-error">
                {error}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1" data-testid="button-cancel-admin">
              Annuler
            </Button>
            <Button type="submit" className="flex-1" data-testid="button-submit-admin">
              Accéder
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
