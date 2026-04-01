import DashboardPreview from "@/components/modules/Home/DashboardPreview";
import Features from "@/components/modules/Home/Features";
import Footer from "@/components/modules/Home/Footer";
import Hero from "@/components/modules/Home/Hero";
import Navbar from "@/components/modules/Home/Navbar";
import Statistics from "@/components/modules/Home/Statistics";
import Testimonials from "@/components/modules/Home/Testimonials";
import WordStory from "@/components/modules/Home/wordStory";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <WordStory />
      <Features />
      <DashboardPreview />
      <Statistics />
      <Testimonials />
      <Footer />
    </div>
  );
}
