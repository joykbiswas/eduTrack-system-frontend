import Image from "next/image";

export default function DashboardPreview() {
  return (
    <section className="relative min-h-[60vh] overflow-hidden bg-background pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-10 text-center">
          
          {/* Dashboard Container */}
          <div className="relative mt-10 w-full max-w-5xl overflow-hidden rounded-xl border bg-card shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(var(--primary),0.15)]">
            
            {/* Browser Header Bar */}
            <div className="flex h-10 items-center justify-between border-b bg-muted/50 px-4">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400/80" />
                <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
              </div>
              {/* URL Bar Mockup */}
              <div className="hidden sm:block h-5 w-64 rounded bg-background/50 border px-2 text-[10px] text-muted-foreground flex items-center justify-center">
                edutrack-management.com/dashboard
              </div>
              <div className="w-10" /> {/* Spacer */}
            </div>

            {/* Image Preview Area */}
            <div className="relative aspect-[16/9] w-full bg-muted/20">
              <Image
                src="/images/dashboard.jpg" // আপনার ইমেজের পাথ (public/images ফোল্ডারে রাখুন)
                alt="EduTrack Dashboard Preview"
                fill
                priority
                className="object-cover object-top"
              />
              
              {/* Overlay Gradient: ইমেজটি যেন নিচের দিকে মিশে যায় (ঐচ্ছিক) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}