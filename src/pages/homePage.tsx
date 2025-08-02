import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import AdBanner from "../components/Adbanner";
import Bubbles from "../components/Bubbles";
import { ArrowDown } from "lucide-react";

const HomePage = () => {
  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-300 via-[#8B5CF6] to-[#A3FF12] text-white px-6 py-4 overflow-hidden">
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
          <HowItWorks />
          <Testimonials />
          <div className="mt-12 flex justify-center">
            <AdBanner />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;