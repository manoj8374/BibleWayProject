import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "signin" | "signup";
}

export function AuthModal({ open, onOpenChange, mode }: AuthModalProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (mode === "signup") {
        toast.success("Welcome to Bible Way — your 7-Day plan awaits. Check your email.");
        // Emit analytics event
        console.log("Analytics: event.auth.signup_success", { email });
      } else {
        toast.success("Welcome back!");
        console.log("Analytics: event.auth.signin_success", { email });
      }
      onOpenChange(false);
      setEmail("");
      setPassword("");
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif">
            {mode === "signup" ? "Join Bible Way" : "Welcome back"}
          </DialogTitle>
          <DialogDescription>
            {mode === "signup"
              ? "Create your free account to begin your spiritual journey"
              : "Sign in to continue your spiritual journey"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-input-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-input-background"
            />
          </div>
          {mode === "signup" && (
            <p className="text-xs text-muted-foreground">
              By creating an account, you agree to our Terms of Use and Privacy Policy.
            </p>
          )}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === "signup" ? "Creating your guided plan..." : "Signing in..."}
              </>
            ) : (
              <>{mode === "signup" ? "Create Free Account" : "Sign in"}</>
            )}
          </Button>
          <div className="text-center text-sm">
            {mode === "signup" ? (
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="text-primary hover:underline"
                >
                  Sign in
                </button>
              </p>
            ) : (
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="text-primary hover:underline"
                >
                  Join free
                </button>
              </p>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
