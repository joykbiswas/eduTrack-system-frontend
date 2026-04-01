"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  GraduationCap,
  Shield,
  Users,
  Star,
  PlayCircle,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const carouselData = [
  {
    badge: "Next-Gen Education Platform",
    title: "Empower Your Educational Ecosystem",
    description:
      "The ultimate all-in-one management suite designed for modern schools and universities.",
    buttonText: "Get Started Free",
  },
  {
    badge: "Automated Workflows",
    title: "Streamline Your Administration Tasks",
    description:
      "Reduce manual paperwork and focus more on student success with our automation tools.",
    buttonText: "Explore Features",
  },
  {
    badge: "Trusted Worldwide",
    title: "The Choice of Leading Institutions",
    description:
      "Join over 500+ institutions already scaling their growth with EduTrack's smart analytics.",
    buttonText: "View Case Studies",
  },
];

const Hero = () => {
  // অটো-প্লে প্লাগিন সেটআপ
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  );

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-background pt-12 pb-10">
      {/* 🌌 Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 w-full">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {carouselData.map((item, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col items-center gap-8 text-center py-4">
                  {/* 🏷️ Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                    </span>
                    {item.badge}
                  </div>

                  {/* 🚀 Main Title */}
                  <h1 className="max-w-5xl text-4xl font-black tracking-tight sm:text-6xl md:text-7xl lg:leading-[1.1]">
                    {item.title.split(" ").map((word, i) =>
                      word === "Educational" ||
                      word === "Administration" ||
                      word === "Leading" ? (
                        <span
                          key={i}
                          className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
                        >
                          {" "}
                          {word}{" "}
                        </span>
                      ) : (
                        ` ${word} `
                      ),
                    )}
                    <br className="hidden md:block" />
                    with EduTrack
                  </h1>

                  {/* 📝 Description */}
                  <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                    {item.description}
                  </p>

                  {/* 🖱️ CTA Buttons */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <Button
                      size="lg"
                      className="h-12 px-8 text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95"
                    >
                      {item.buttonText}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button
                      size="lg"
                      variant="ghost"
                      className="h-12 px-8 text-base font-semibold gap-2"
                    >
                      <PlayCircle className="h-5 w-5 text-primary" />
                      Watch Demo
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* 📊 Static Stats Section (ক্যারোজেলের বাইরে রাখা হয়েছে যাতে এটি পরিবর্তন না হয়) */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          <StatItem icon={<Users />} label="10K+ Students" />
          <StatItem icon={<Shield />} label="500+ Institutions" />
          <StatItem
            icon={<Star className="fill-primary" />}
            label="4.9/5 Rating"
          />
        </div>
      </div>
    </section>
  );
};

const StatItem = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className="flex items-center gap-2.5 font-semibold text-muted-foreground transition-colors hover:text-foreground">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
      {icon}
    </div>
    {label}
  </div>
);

export default Hero;
