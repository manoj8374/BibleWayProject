import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import { WhiteHero } from "./components/WhiteHero";
import { FeatureCard } from "./components/FeatureCard";
import { TestimonialCard } from "./components/TestimonialCard";
import { AudioPlayerModal } from "./components/AudioPlayerModal";
import { FeatureModal } from "./components/FeatureModal";
import { YouTubeVideoModal } from "./components/YouTubeVideoModal";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { toast } from "sonner";
import {
  BookOpen,
  Headphones,
  FileText,
  Heart,
  Users,
  BookMarked,
  Download,
  Target,
  GraduationCap,
  HandHeart,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  Search,
  Video,
} from "lucide-react";

// YouTube video URL for "How It Works" - Update this with your unlisted YouTube URL
const HOW_IT_WORKS_VIDEO_URL = "https://youtu.be/1g2uxfe4yHY?si=v4DYwMuENKavIgzw";

export default function LandingPage() {
  const navigate = useNavigate();
  const [audioModalOpen, setAudioModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [featureModalOpen, setFeatureModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  const handleSignIn = () => {
    navigate("/login");
    console.log("Analytics: event.header.signin_click", { location: "header" });
  };

  const handleSignUp = () => {
    navigate("/signup");
    console.log("Analytics: event.header.signup_click", { location: "header" });
  };

  const handlePrimaryCTA = () => {
    navigate("/signup");
    console.log("Analytics: event.hero.primary_cta", { cta: "start_free" });
  };

  const handleListenCTA = () => {
    setAudioModalOpen(true);
    console.log("Analytics: event.hero.listen_cta");
  };

  const handleWatchHowItWorks = () => {
    setVideoModalOpen(true);
    console.log("Analytics: event.hero.watch_how_it_works");
  };

  const handleTourCTA = () => {
    toast.info("Tour feature coming soon!");
    console.log("Analytics: event.hero.tour_click", { started: true });
  };

  const handleLearnMore = (featureId: string, featureData: any) => {
    setSelectedFeature(featureData);
    setFeatureModalOpen(true);
    console.log("Analytics: event.feature.learnmore", { feature: featureId });
  };

  const features = [
    {
      id: "reader",
      icon: BookOpen,
      title: "Bible Reader",
      description: "Multi-version text, verse anchors, cross-references, night/read modes.",
      ctaId: "Feature.Reader.LearnMore",
      details: "Experience Scripture with our beautifully designed reader featuring multiple translations, instant verse lookup, cross-references, and customizable reading modes for day and night.",
    },
    {
      id: "notes",
      icon: FileText,
      title: "Notes & Highlights",
      description: "Color-coded highlights, linked notes, export & sharing.",
      ctaId: "Feature.Notes.LearnMore",
      details: "Capture insights with color-coded highlights, create linked notes, and organize your spiritual reflections. Export and share your notes with study groups or keep them private.",
    },
    {
      id: "audio",
      icon: Headphones,
      title: "Audio Bible",
      description: "Multiple narrators, speed control, chapter navigation, offline downloads.",
      ctaId: "Feature.Audio.LearnMore",
      details: "Listen to beautifully narrated Scripture with professional voice talent, adjustable playback speeds, chapter-by-chapter navigation, and offline downloads for listening anywhere.",
    },
    {
      id: "prayer",
      icon: Heart,
      title: "Prayer Requests",
      description: "Private/anonymous options, moderation, follow-ups.",
      ctaId: "Feature.Prayer.LearnMore",
      details: "Share prayer requests with the community or submit anonymously. Our moderation team ensures a safe, supportive environment. Track and follow up on prayers.",
    },
    {
      id: "testimony",
      icon: Users,
      title: "Testimonies",
      description: "Media uploads, moderation, curated testimonials.",
      ctaId: "Feature.Testimony.LearnMore",
      details: "Share your faith journey through written testimonies or media uploads. All content is moderated to maintain a respectful, encouraging community space.",
    },
    {
      id: "studyplans",
      icon: BookMarked,
      title: "Study Plans",
      description: "Age-segmented plans, daily reminders, progress tracking.",
      ctaId: "Feature.StudyPlans.LearnMore",
      details: "Choose from curated study plans designed for Children, Teens, Adults, and Seniors. Receive daily reminders and track your progress through Scripture.",
    },
    {
      id: "groups",
      icon: Users,
      title: "Community Groups",
      description: "Join moderated groups, events & RSVPs.",
      ctaId: "Feature.Groups.LearnMore",
      details: "Connect with believers through moderated community groups. Participate in events, RSVP to gatherings, and grow together in faith.",
    },
    {
      id: "downloads",
      icon: Download,
      title: "Downloads & Offline",
      description: "Audio packs, reading packs, and translation packs.",
      ctaId: "Feature.Downloads.LearnMore",
      details: "Download audio narrations, reading plans, and translations for offline access. Perfect for commutes, travel, or areas with limited connectivity.",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <Header onSignIn={handleSignIn} onSignUp={handleSignUp} />

      {/* White Luxury Hero Section */}
      <WhiteHero
        onPrimaryCTA={handlePrimaryCTA}
        onSecondaryCTA={handleWatchHowItWorks}
        heroImageUrl="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
      />

      {/* Discover BibleWay Section */}
      <section id="F:Landing-Features" className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Main Title */}
          <div className="text-center mb-12 lg:mb-16 space-y-4">
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-[var(--color-dark-blue)] leading-tight">
              Discover BibleWay — Faith, Life & Community in One Place
            </h2>
            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-[var(--color-maroon)] to-transparent opacity-60"></div>
            <p className="text-lg lg:text-xl text-[var(--text-muted)] max-w-3xl mx-auto leading-relaxed mt-6">
              More than an app. BibleWay is a living Christian ecosystem — built to guide, support, and grow believers at every stage of life.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mb-12">
            {/* Feature 1 - Community & Chat */}
            <Card className="bg-white border-2 border-[var(--color-gray-100)] hover:border-[var(--color-gold)] hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src="/Faith-Driven Community & Fellowship.jpg"
                  alt="Christian community fellowship"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-blue)]/60 to-transparent"></div>
                <div className="absolute top-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm shadow-lg">
                  <MessageCircle className="h-6 w-6 text-[var(--color-gold)]" strokeWidth={2.5} />
                </div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="font-serif text-xl lg:text-2xl text-[var(--color-dark-blue)] group-hover:text-[var(--color-maroon)] transition-colors">
                  Faith-Driven Community & Fellowship
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-[var(--text-secondary)] leading-relaxed">
                  Connect with fellow believers around the world in a safe, Christ-centered space. Chat with friends, share testimonies, post reflections, and walk together in faith through every season of life.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 2 - Prayer Requests */}
            <Card className="bg-white border-2 border-[var(--color-gray-100)] hover:border-[var(--color-gold)] hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src="/Prayer Requests & Spiritual Support.jpg"
                  alt="People praying together"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-blue)]/60 to-transparent"></div>
                <div className="absolute top-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm shadow-lg">
                  <Heart className="h-6 w-6 text-[var(--color-gold)]" strokeWidth={2.5} />
                </div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="font-serif text-xl lg:text-2xl text-[var(--color-dark-blue)] group-hover:text-[var(--color-maroon)] transition-colors">
                  Prayer Requests & Spiritual Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-[var(--text-secondary)] leading-relaxed">
                  Share your burdens, joys, and hopes with a global Christian family. Receive prayers when you need them most and strengthen your faith through collective prayer.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 3 - Smart Bible Reading */}
            <Card className="bg-white border-2 border-[var(--color-gray-100)] hover:border-[var(--color-gold)] hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src="/Smart Bible Reading Experience.jpg"
                  alt="Bible app interface"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-blue)]/60 to-transparent"></div>
                <div className="absolute top-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm shadow-lg">
                  <BookOpen className="h-6 w-6 text-[var(--color-gold)]" strokeWidth={2.5} />
                </div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="font-serif text-xl lg:text-2xl text-[var(--color-dark-blue)] group-hover:text-[var(--color-maroon)] transition-colors">
                  Smart Bible Reading Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-[var(--text-secondary)] leading-relaxed">
                  Experience Scripture like never before. Highlight meaningful verses, listen with read-aloud audio, save personal notes, and bookmark chapters that speak to your heart.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 4 - Age-Based Segregated Bible */}
            <Card className="bg-white border-2 border-[var(--color-gray-100)] hover:border-[var(--color-gold)] hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src="/Faith for Every Stage of Life.jpg"
                  alt="Life stages and age groups"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-blue)]/60 to-transparent"></div>
                <div className="absolute top-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm shadow-lg">
                  <Users className="h-6 w-6 text-[var(--color-gold)]" strokeWidth={2.5} />
                </div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="font-serif text-xl lg:text-2xl text-[var(--color-dark-blue)] group-hover:text-[var(--color-maroon)] transition-colors">
                  Faith for Every Stage of Life
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-[var(--text-secondary)] leading-relaxed mb-2">
                  BibleWay uniquely delivers Scripture tailored to your life stage. From children and teens to five stages of adulthood and seniors — receive guidance designed for your real-life challenges.
                </CardDescription>
                <p className="text-sm text-[var(--color-maroon)] font-medium italic">
                  One powerful verse, delivered for your age and your moment.
                </p>
              </CardContent>
            </Card>

            {/* Feature 5 - Powerful Bible Search */}
            <Card className="bg-white border-2 border-[var(--color-gray-100)] hover:border-[var(--color-gold)] hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden group sm:col-span-2 lg:col-span-1">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src="/Powerful Global Bible Search.jpg"
                  alt="Bible search magnifying glass"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-blue)]/60 to-transparent"></div>
                <div className="absolute top-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm shadow-lg">
                  <Search className="h-6 w-6 text-[var(--color-gold)]" strokeWidth={2.5} />
                </div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="font-serif text-xl lg:text-2xl text-[var(--color-dark-blue)] group-hover:text-[var(--color-maroon)] transition-colors">
                  Powerful Global Bible Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-[var(--text-secondary)] leading-relaxed">
                  Find exactly what you're looking for in seconds. Search by word, verse, chapter, Bible version, or language — everything under your fingertips with just one click.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 6 - Animated Segregated Bible Stories */}
            <Card className="bg-white border-2 border-[var(--color-gray-100)] hover:border-[var(--color-gold)] hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src="/Animated Segregated Bible Stories.jpg"
                  alt="Animated Bible stories visual storytelling"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-blue)]/60 to-transparent"></div>
                <div className="absolute top-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Video className="h-6 w-6 text-[var(--color-gold)]" strokeWidth={2.5} />
                </div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="font-serif text-xl lg:text-2xl text-[var(--color-dark-blue)] group-hover:text-[var(--color-maroon)] transition-colors">
                  Animated Segregated Bible Stories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-[var(--text-secondary)] leading-relaxed">
                  Bring Scripture to life through powerful visual storytelling. Explore age-wise, segregated Bible content enriched with meaningful animations and cinematic visuals—designed to help you understand God's Word more deeply, remember it clearly, and apply it confidently in everyday life.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Final CTA */}
          <div className="text-center mt-12 lg:mt-16">
            <p className="font-serif text-2xl lg:text-3xl text-[var(--color-dark-blue)]">
              One Bible. One Community. One Journey of Faith.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="F:Landing-Vision" className="py-16 lg:py-24 bg-surface">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl lg:text-4xl text-text">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Bible Way exists to make Scripture accessible, understandable, and relevant. We help you build lasting spiritual rhythms by combining faithful resources, human connection, and technology that honors your privacy and dignity.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-text mb-1">Grow Daily</h3>
                    <p className="text-sm text-muted-foreground">Encourage daily engagement with short, meaningful practices.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-text mb-1">Learn Deeply</h3>
                    <p className="text-sm text-muted-foreground">Provide trusted commentaries, study guides, and simplified explanations.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <HandHeart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-text mb-1">Serve Compassionately</h3>
                    <p className="text-sm text-muted-foreground">Enable prayer support, testimony sharing, and community care.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src="/Bible way poster.jpg"
                  alt="Bible Way Vision"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="F:Landing-HowItWorks" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl text-text mb-4">How it works — three simple steps</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-serif">
                1
              </div>
              <h3 className="font-serif text-xl text-text">Get started</h3>
              <p className="text-muted-foreground">Create your free account and choose a reading pace.</p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-serif">
                2
              </div>
              <h3 className="font-serif text-xl text-text">Engage</h3>
              <p className="text-muted-foreground">Read daily, highlight verses, and add short journal notes.</p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-serif">
                3
              </div>
              <h3 className="font-serif text-xl text-text">Connect</h3>
              <p className="text-muted-foreground">Join a study group, send prayer requests, and listen to guided devotionals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="F:Landing-Modules" className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl text-text mb-4">Features</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                {...({
                  icon: feature.icon,
                  title: feature.title,
                  description: feature.description,
                  ctaId: feature.ctaId,
                  onLearnMore: () => handleLearnMore(feature.id, feature),
                } as React.ComponentProps<typeof FeatureCard>)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="F:Landing-Testimonials" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl text-text mb-4">Stories from our community</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <TestimonialCard
              quote="I finally have a daily rhythm — the audio devotionals are beautiful."
              author="Mark"
              role="34"
              avatarUrl="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDU1NzgyOXww&ixlib=rb-4.1.0&q=80&w=1080"
            />
            <TestimonialCard
              quote="My kids love the children's study plans and the family reading prompts."
              author="Priya"
              role="Parent"
              avatarUrl="https://images.unsplash.com/photo-1545194827-db87df1649d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJtJTIwcG9ydHJhaXQlMjB3b21hbnxlbnwxfHx8fDE3NjA2MjUwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
            />
            <TestimonialCard
              quote="The prayer team responded and supported our family — it felt real."
              author="Samuel"
              role="Member"
              avatarUrl="https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYwNjI1MDA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="F:Landing-Footer" className="bg-[var(--color-dark-blue)] text-white border-t-2 border-[var(--color-gold)]/30">
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <div className="text-center text-sm text-white/70">
            <p>copyright@linchpinsoftsolutionspvtltd</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AudioPlayerModal open={audioModalOpen} onOpenChange={setAudioModalOpen} />
      <FeatureModal open={featureModalOpen} onOpenChange={setFeatureModalOpen} feature={selectedFeature} />
      <YouTubeVideoModal 
        open={videoModalOpen} 
        onOpenChange={setVideoModalOpen} 
        videoUrl={HOW_IT_WORKS_VIDEO_URL}
      />
    </div>
  );
}