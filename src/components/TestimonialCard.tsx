import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatarUrl?: string;
}

export function TestimonialCard({ quote, author, role, avatarUrl }: TestimonialCardProps) {
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="border-border/50 shadow-[0_8px_24px_rgba(11,107,88,0.06)]">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          <p className="text-text italic">"{quote}"</p>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={avatarUrl} alt={`Portrait of ${author}`} />
              <AvatarFallback className="bg-accent/20 text-accent">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-text">{author}</p>
              <p className="text-xs text-muted-foreground">{role}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
