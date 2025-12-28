import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Play, Pause, Volume2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Slider } from "./ui/slider";

interface AudioPlayerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AudioPlayerModal({ open, onOpenChange }: AudioPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (open && audioRef.current) {
      // Auto-play when modal opens
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [open]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif">Verse of the Day</DialogTitle>
          <DialogDescription>
            Listen to today's scripture reading
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center justify-center p-8 bg-muted rounded-lg">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Now playing</p>
              <p className="font-serif text-text">"For God so loved the world..."</p>
              <p className="text-xs text-muted-foreground mt-2">John 3:16</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              size="icon"
              variant="outline"
              onClick={togglePlay}
              className="h-12 w-12 rounded-full"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <div className="flex-1">
              <Slider value={[progress]} max={100} className="w-full" />
            </div>
            <Volume2 className="h-5 w-5 text-muted-foreground" />
          </div>

          {/* Hidden audio element - in production, this would be a real audio file */}
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
          >
            {/* Placeholder for audio source */}
          </audio>

          <p className="text-xs text-center text-muted-foreground">
            This is a preview player. Audio narration available in the full app.
          </p>
          
          <p className="text-xs text-center text-muted-foreground italic">
            Note: Audio preview would play a 7-10 second narrated sample in production
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
