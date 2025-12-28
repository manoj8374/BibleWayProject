import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaId?: string;
  onLearnMore?: () => void;
}

export function FeatureCard({ icon: Icon, title, description, ctaId, onLearnMore }: FeatureCardProps) {
  return (
    <Card className="border-border/50 shadow-[0_8px_24px_rgba(11,107,88,0.06)] hover:shadow-[0_12px_32px_rgba(11,107,88,0.1)] transition-shadow duration-300">
      <CardHeader>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20 mb-4">
          <Icon className="h-6 w-6 text-accent" strokeWidth={2} />
        </div>
        <CardTitle className="font-serif">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
