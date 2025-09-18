import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import Bubbles from "../components/Bubbles";
import { ArrowDown } from "lucide-react";
import { useEffect } from "react"; // Added this import

const HomePage = () => {
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor;
    if (ua.includes('Instagram') && /iPhone|iPad|iPod/.test(ua)) {
      alert('Para melhor visualização, abra este link no Safari.');
    }
  }, []);

  return (
    <div className="relative flex flex-col items-center min-h-screen galactic-background text-foreground px-6 py-4">
      <Bubbles />
      <div className="relative z-10 w-full flex flex-col items-center overflow-y-auto">
        <Header />
        <main className="w-full flex flex-col items-center">
          <Hero />
          <div className="flex flex-col items-center animate-bounce mt-[-4rem] mb-8"> {/* Adjusted margin */} 
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
