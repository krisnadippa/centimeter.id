import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import FeaturedProperties from "@/app/components/FeaturedProperties";
import Reviews from "@/app/components/Reviews";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <FeaturedProperties />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}
