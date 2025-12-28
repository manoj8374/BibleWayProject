import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

interface FeatureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature: {
    title: string;
    description: string;
    details: string;
  } | null;
}

export function FeatureModal({ open, onOpenChange, feature }: FeatureModalProps) {
  if (!feature) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif">{feature.title}</DialogTitle>
          <DialogDescription>{feature.description}</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="prose prose-sm max-w-none">
            <p className="text-text">{feature.details}</p>
          </div>
          <div className="flex gap-3 pt-4">
            <Button className="bg-primary hover:bg-primary/90">
              Try {feature.title}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
