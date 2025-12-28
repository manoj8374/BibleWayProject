import { Dialog, DialogContent } from "./ui/dialog";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface YouTubeVideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoUrl: string;
}

// Helper function to extract YouTube video ID from various URL formats
function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  
  // Match YouTube URLs in various formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0&modestbranding=1`;
    }
  }
  
  return null;
}

export function YouTubeVideoModal({ open, onOpenChange, videoUrl }: YouTubeVideoModalProps) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 bg-white border-2 border-[var(--color-gold)]/30">
        <div className="relative w-full bg-black rounded-lg overflow-hidden">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-900 rounded-full shadow-lg"
            aria-label="Close video"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Video container */}
          <div className="aspect-video w-full">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title="How It Works Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white p-8">
                <div className="text-center">
                  <p className="text-lg mb-2">Invalid YouTube URL</p>
                  <p className="text-sm opacity-80">Please provide a valid YouTube video URL</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

