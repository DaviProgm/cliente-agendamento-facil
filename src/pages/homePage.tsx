import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import Bubbles from "../components/Bubbles";
import { ArrowDown } from "lucide-react";

const HomePage = () => {
  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-br from-galactic-dark via-galactic-blue to-galactic-dark text-foreground px-6 py-4 overflow-hidden">
      <Bubbles />
      <div className="relative z-10 w-full flex flex-col items-center">
        <Header />
        <main className="w-full flex flex-col items-center">
          <Hero />
          <div className="flex flex-col items-center animate-bounce mt-[-4rem] mb-8">
            <span className="text-sm ">Role para baixo</span>
            <ArrowDown className="w-6 h-6" />
          </div>
          <Features />
          <Pricing />
          <HowItWorks />
          <Testimonials />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;