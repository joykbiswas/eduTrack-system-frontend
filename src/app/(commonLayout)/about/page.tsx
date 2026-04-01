import Navbar from "@/components/modules/Home/Navbar";
import Footer from "@/components/modules/Home/Footer";
import AboutHero from "@/components/modules/About/AboutHero";
import OurStory from "@/components/modules/About/OurStory";
import MissionVision from "@/components/modules/About/MissionVision";
import WhyEduTrack from "@/components/modules/About/WhyEduTrack";
import CoreValues from "@/components/modules/About/CoreValues";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <AboutHero />
        <OurStory />
        <MissionVision />
        <WhyEduTrack />
        <CoreValues />
        {/* <Team /> */}
      </main>

      <Footer />
    </div>
  );
}