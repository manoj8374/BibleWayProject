import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Video {
  id: string;
  character: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl?: string;
}

const videos: Video[] = [
  {
    id: "david",
    character: "David",
    title: "The Courage to Believe",
    description: "A story of strength and faith through every challenge.",
    thumbnailUrl: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&q=80",
    videoUrl: "https://youtu.be/fw9v0TQ-JBE?si=9x1XRdnnZHp840p1",
  },
  {
    id: "moses",
    character: "Moses",
    title: "The Journey of Liberation",
    description: "Leading with faith, courage, and divine guidance.",
    thumbnailUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80",
    videoUrl: "https://youtu.be/fw9v0TQ-JBE?si=9x1XRdnnZHp840p1",
  },
  {
    id: "esther",
    character: "Esther",
    title: "Bravery in the Face of Fear",
    description: "Standing for truth with grace and unwavering faith.",
    thumbnailUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&q=80",
    videoUrl: "https://youtu.be/fw9v0TQ-JBE?si=9x1XRdnnZHp840p1",
  },
  {
    id: "paul",
    character: "Paul",
    title: "Transformation Through Grace",
    description: "From persecution to preaching — a divine calling.",
    thumbnailUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80",
    videoUrl: "https://youtu.be/fw9v0TQ-JBE?si=9x1XRdnnZHp840p1",
  },
];

export function VideoShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    console.log("Analytics: event.video.play", {
      character: video.character,
      videoId: video.id,
    });
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
    console.log("Analytics: event.video.close");
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 400; // Width of each card (w-[400px])
      const gap = 24; // gap-6 = 1.5rem = 24px
      const scrollPosition = index * (cardWidth + gap);
      
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 400;
      const gap = 24;
      const scrollLeft = container.scrollLeft;
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentIndex(Math.max(0, Math.min(newIndex, videos.length - 1)));
    }
  };

  return (
    <section
      id="F:Landing-AnimatedVideos"
      className="py-16 lg:py-24 bg-[var(--color-gray-100)] relative overflow-hidden"
    >
      {/* Decorative golden line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />

      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl lg:text-5xl text-[var(--text-primary)]">
            Experience Scripture in{" "}
            <span className="text-[var(--color-maroon)] relative inline-block">
              Motion
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--color-gold)]" />
            </span>
            .
          </h2>
          <p className="text-lg lg:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            Discover our animated Bible Way stories — where timeless characters come alive to guide you on your faith journey.
          </p>
        </motion.div>

        {/* Video Grid - Desktop: Horizontal Scroll, Mobile: Stacked */}
        <div className="relative">
          {/* Navigation Buttons - Desktop */}
          <div className="hidden lg:block">
            {/* Left Button */}
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border-2 border-[var(--color-gold)] flex items-center justify-center transition-all duration-300 group ${
                currentIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[var(--color-gold)] hover:scale-110 active:scale-105"
              }`}
              aria-label="Previous video"
            >
              <ChevronLeft className={`h-6 w-6 transition-colors duration-300 ${
                currentIndex === 0
                  ? "text-[var(--color-maroon)]/50"
                  : "text-[var(--color-maroon)] group-hover:text-white"
              }`} />
            </button>

            {/* Right Button */}
            <button
              onClick={handleNext}
              disabled={currentIndex === videos.length - 1}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border-2 border-[var(--color-gold)] flex items-center justify-center transition-all duration-300 group ${
                currentIndex === videos.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[var(--color-gold)] hover:scale-110 active:scale-105"
              }`}
              aria-label="Next video"
            >
              <ChevronRight className={`h-6 w-6 transition-colors duration-300 ${
                currentIndex === videos.length - 1
                  ? "text-[var(--color-maroon)]/50"
                  : "text-[var(--color-maroon)] group-hover:text-white"
              }`} />
            </button>
          </div>

          {/* Desktop: Scrollable carousel */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="hidden lg:flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-4"
          >
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                className="flex-shrink-0 w-[400px] snap-start"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <VideoCard
                  video={video}
                  isHovered={hoveredId === video.id}
                  onHover={() => setHoveredId(video.id)}
                  onLeave={() => setHoveredId(null)}
                  onClick={() => handleVideoClick(video)}
                />
              </motion.div>
            ))}
          </div>

          {/* Desktop Indicator Dots */}
          <div className="hidden lg:flex justify-center items-center gap-2 mt-6">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[var(--color-gold)] w-8"
                    : "bg-[var(--color-gold)]/30 w-2 hover:bg-[var(--color-gold)]/50"
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile: Stacked grid with navigation */}
          <div className="relative lg:hidden">
            {/* Mobile Navigation Buttons */}
            <div className="flex justify-center items-center gap-4 mb-6">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`w-10 h-10 rounded-full bg-white shadow-md border-2 border-[var(--color-gold)] flex items-center justify-center transition-all duration-300 group ${
                  currentIndex === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "active:scale-95 hover:bg-[var(--color-gold)]"
                }`}
                aria-label="Previous video"
              >
                <ChevronLeft className={`h-5 w-5 transition-colors duration-300 ${
                  currentIndex === 0
                    ? "text-[var(--color-maroon)]/50"
                    : "text-[var(--color-maroon)] group-hover:text-white"
                }`} />
              </button>

              {/* Mobile Indicator Dots */}
              <div className="flex items-center gap-2">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-[var(--color-gold)] w-6"
                        : "bg-[var(--color-gold)]/30 w-2"
                    }`}
                    aria-label={`Go to video ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={currentIndex === videos.length - 1}
                className={`w-10 h-10 rounded-full bg-white shadow-md border-2 border-[var(--color-gold)] flex items-center justify-center transition-all duration-300 group ${
                  currentIndex === videos.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : "active:scale-95 hover:bg-[var(--color-gold)]"
                }`}
                aria-label="Next video"
              >
                <ChevronRight className={`h-5 w-5 transition-colors duration-300 ${
                  currentIndex === videos.length - 1
                    ? "text-[var(--color-maroon)]/50"
                    : "text-[var(--color-maroon)] group-hover:text-white"
                }`} />
              </button>
            </div>

            {/* Mobile: Show one video at a time */}
            <div className="overflow-hidden">
              <motion.div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {videos.map((video, index) => (
                  <div key={video.id} className="w-full flex-shrink-0 px-2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <VideoCard
                        video={video}
                        isHovered={hoveredId === video.id}
                        onHover={() => setHoveredId(video.id)}
                        onLeave={() => setHoveredId(null)}
                        onClick={() => handleVideoClick(video)}
                      />
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* CTA Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="#all-stories"
            className="text-lg text-[var(--color-maroon)] hover:text-[var(--color-gold)] transition-colors duration-300 font-semibold inline-flex items-center gap-2 group"
          >
            Explore All Animated Stories
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={handleCloseModal} />
      )}

      {/* Decorative golden line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />
    </section>
  );
}

// Video Card Component
function VideoCard({
  video,
  isHovered,
  onHover,
  onLeave,
  onClick,
}: {
  video: Video;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  return (
    <Card
      className="group cursor-pointer overflow-hidden h-full hover:scale-[1.02] transition-transform duration-300"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        boxShadow: isHovered
          ? "0 12px 40px rgba(120, 28, 46, 0.2), 0 0 0 2px var(--color-gold)"
          : "0 8px 32px rgba(120, 28, 46, 0.15)",
      }}
    >
      <CardContent className="p-0">
        {/* Thumbnail with overlay */}
        <div className="relative aspect-video overflow-hidden">
          <ImageWithFallback
            src={video.thumbnailUrl}
            alt={`${video.character} - ${video.title}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-blue)]/80 via-[var(--color-dark-blue)]/40 to-transparent"
          />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-16 h-16 rounded-full bg-white/95 border-2 border-[var(--color-gold)] flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
              animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
            >
              <Play className="h-7 w-7 text-[var(--color-maroon)] ml-1" fill="currentColor" />
            </motion.div>
          </div>

          {/* Golden glow effect on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                boxShadow: "inset 0 0 40px rgba(201, 163, 79, 0.3)",
              }}
            />
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-3 bg-white">
          <h3 className="font-serif text-xl text-[var(--text-primary)] group-hover:text-[var(--color-maroon)] transition-colors">
            {video.character} — {video.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
            {video.description}
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="text-[var(--color-maroon)] hover:text-[var(--color-gold)] p-0 h-auto"
          >
            Watch Now →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
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
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
    }
  }
  
  return null;
}

// Video Modal Component
function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  const embedUrl = video.videoUrl ? getYouTubeEmbedUrl(video.videoUrl) : null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "var(--overlay-video)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          border: "2px solid var(--color-gold)",
        }}
      >
        {/* Golden accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--color-gold)]" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-[var(--color-maroon)] text-[var(--color-maroon)] hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg"
          aria-label="Close video"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Video container */}
        <div className="aspect-video bg-[var(--color-dark-blue)] flex items-center justify-center">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={`${video.character} - ${video.title}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="text-center text-white p-8">
              <h3 className="font-serif text-2xl mb-4">{video.character}</h3>
              <p className="text-lg mb-6">{video.title}</p>
              <p className="text-sm opacity-80 mb-8">{video.description}</p>
              <p className="text-sm italic opacity-60">
                Video player would be embedded here in production.
              </p>
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className="p-6 bg-[var(--color-gray-100)] border-t border-[var(--border-default)]">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-serif text-lg text-[var(--text-primary)]">{video.character}</h4>
              <p className="text-sm text-[var(--text-secondary)]">{video.description}</p>
            </div>
            <Button variant="outline" size="sm">
              Share
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Hide scrollbar for horizontal scroll
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}
