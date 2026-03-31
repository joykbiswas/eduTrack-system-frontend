import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Shield, Users } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-32">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground">
            <GraduationCap className="h-4 w-4 text-primary" />
            Smart Education Management
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Streamline Your{" "}
            <span className="text-primary">Institution&apos;s</span>{" "}
            Management
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
            EduTrack is an all-in-one platform for managing students, teachers,
            courses, and administrative tasks. Empower your institution with
            modern tools for efficient education management.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* <Link href="/register">
              
            </Link> */}
            <Button size="lg" className="gap-2">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            <Link href="#features">
              <Button size="lg" variant="outline">
                Explore Features
              </Button>
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              10K+ Students
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              500+ Institutions
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              99% Satisfaction
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
