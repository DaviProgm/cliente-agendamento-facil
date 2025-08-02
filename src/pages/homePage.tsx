import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import AdBanner from "../components/Adbanner";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-white via-[#8B5CF6] to-[#A3FF12] text-white px-6 py-4">
      <Header />
      <main className="w-full flex flex-col items-center">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <div className="mt-12 flex justify-center">
          <AdBanner />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;