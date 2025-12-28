import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface WhiteHeroProps {
  onPrimaryCTA: () => void;
  onSecondaryCTA: () => void;
  heroImageUrl: string;
}

export function WhiteHero({ onPrimaryCTA, onSecondaryCTA, heroImageUrl }: WhiteHeroProps) {
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !hasBeenVisible) {
            console.log("Analytics: event.hero.impression", {
              variant: "white-luxury",
              timestamp: new Date().toISOString()
            });
            setHasBeenVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, [hasBeenVisible]);

  const handlePrimaryClick = () => {
    console.log("Analytics: event.hero.primary_click", {
      cta: "step_into_way_of_god",
      variant: "white-luxury",
      timestamp: new Date().toISOString()
    });
    onPrimaryCTA();
  };

  const handleSecondaryClick = () => {
    console.log("Analytics: event.hero.secondary_click", {
      cta: "watch_how_it_works",
      variant: "white-luxury",
      timestamp: new Date().toISOString()
    });
    onSecondaryCTA();
  };

  return (
    <section
      ref={heroRef}
      id="F:Landing-Hero-WhiteLuxury"
      className="relative overflow-hidden bg-[var(--color-bg)]"
      style={{
        background: "linear-gradient(135deg, rgba(201, 163, 79, 0.08) 0%, rgba(255, 255, 255, 0) 50%)",
      }}
    >
      {/* Golden accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-50" />

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16 xl:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left column - Content */}
          <motion.div
            className="space-y-6 text-left order-2 lg:order-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Headline */}
            <motion.h1 
              className="font-serif text-5xl lg:text-6xl leading-[1.1] tracking-tight text-[var(--text-primary)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Step Into the{" "}
              <span className="text-[var(--color-maroon)] relative inline-block">
                Way of God
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-gold)]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  style={{ transformOrigin: "left" }}
                />
              </span>.
            </motion.h1>

            {/* Subheadline */}
            <motion.h2 
              className="text-lg text-[var(--color-gray-700)] max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A peaceful path to explore Scripture through reflection, audio, and guided study — with a community built in faith.
            </motion.h2>

            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                id="Hero.PrimaryCTA"
                size="default"
                onClick={handlePrimaryClick}
                className="relative overflow-hidden group w-fit"
                aria-label="Step into the Way of GOD"
              >
                <span className="relative z-10">Step into the Way of GOD</span>
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Button>

              <Button
                id="Hero.SecondaryCTA"
                size="default"
                variant="outline"
                onClick={handleSecondaryClick}
                className="group w-fit"
                aria-label="Watch how Bible Way works"
              >
                <Play className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                Watch How It Works
              </Button>
            </motion.div>

            {/* Microcopy */}
            <motion.div 
              className="space-y-1.5 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-sm text-[var(--color-gray-700)]">
                No subscription needed — begin your journey today.
              </p>
              <p className="text-sm italic text-[var(--color-maroon)] font-serif">
                "Let the Word be a light to your path." — Psalm 119:105
              </p>
            </motion.div>
          </motion.div>

          {/* Right column - Hero Image */}
          <motion.div
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-card-hover)] border border-[var(--color-gray-300)]"
              style={{
                boxShadow: "0 20px 50px rgba(120, 28, 46, 0.12), 0 0 0 1px rgba(201, 163, 79, 0.2)",
              }}
            >
              {/* Golden accent corner */}
              <div className="absolute top-4 right-4 w-16 h-16 z-10">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M32 0C32 8.837 24.837 16 16 16C24.837 16 32 23.163 32 32C32 23.163 39.163 16 48 16C39.163 16 32 8.837 32 0Z"
                    fill="var(--color-gold)"
                    opacity="0.6"
                  />
                </svg>
              </div>

              {/* Image */}
              <ImageWithFallback
                src={heroImageUrl}
                alt="Open Bible on white marble with golden sunbeams"
                className="w-full h-auto aspect-[4/3] object-cover"
              />

              {/* Subtle overlay gradient */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(201, 163, 79, 0.1) 0%, transparent 50%)",
                }}
              />
            </div>

            {/* Decorative golden glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[var(--color-gold)] opacity-10 blur-3xl -z-10" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-[var(--color-maroon)] opacity-5 blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-30" />
    </section>
  );
}
