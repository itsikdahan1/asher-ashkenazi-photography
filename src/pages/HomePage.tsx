import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Services from '../components/Services';
import Packaging from '../components/Packaging';
import Packages from '../components/Packages';
import GalleryTeaser from '../components/GalleryTeaser';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      <Header />
      <Hero />
      <div id="about">
        <Features />
      </div>
      <Services />
      <Packaging />
      <GalleryTeaser />
      <Testimonials />
      <Packages />
      <Footer />
    </main>
  );
}
