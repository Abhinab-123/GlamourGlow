import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export default function HeroSection() {
  const scrollToServices = () => {
    const element = document.querySelector("#services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`,
        }}
      />
      <div className="absolute inset-0 hero-gradient opacity-75" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto animate-fadeIn">
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6" data-testid="hero-title">
            Men's Grooming.
            <span className="block text-accent">Elevated.</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light" data-testid="hero-description">
            Expert grooming services exclusively for men. Professional barbers, premium products, modern techniques.
          </p>
          <div className="bg-accent text-white px-4 py-2 rounded-full inline-block mb-6 font-semibold">
            EXCLUSIVELY FOR MEN
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={scrollToServices}
              size="lg"
              className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-colors"
              data-testid="button-view-services"
            >
              View Services
            </Button>
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-colors"
              data-testid="button-call-now"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
