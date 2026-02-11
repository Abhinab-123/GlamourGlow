import { Facebook, Instagram, Phone } from "lucide-react";

export default function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div data-testid="footer-brand">
            <h4 className="text-xl font-serif font-semibold mb-4">Trends Parlour & Spa</h4>
            <p className="text-primary-foreground/80">
              Your premier destination for beauty, wellness, and style. Experience luxury treatments with expert professionals.
            </p>
          </div>

          <div data-testid="footer-quick-links">
            <h5 className="font-semibold mb-4">Quick Links</h5>
            <div className="space-y-2 text-primary-foreground/80">
              <button
                onClick={() => scrollToSection("#services")}
                className="block hover:text-white transition-colors text-left"
                data-testid="footer-link-services"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("#gallery")}
                className="block hover:text-white transition-colors text-left"
                data-testid="footer-link-gallery"
              >
                Gallery
              </button>
              <a
                href="https://maps.app.goo.gl/287YWsoAkKG7AdU3A"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white transition-colors text-left"
                data-testid="footer-link-location"
              >
                Location
              </a>
              <button
                onClick={() => scrollToSection("#contact")}
                className="block hover:text-white transition-colors text-left"
                data-testid="footer-link-contact"
              >
                Contact
              </button>
            </div>
          </div>

          <div data-testid="footer-services-list">
            <h5 className="font-semibold mb-4">Services</h5>
            <div className="space-y-2 text-primary-foreground/80">
              <span className="block">Hair Care & Styling</span>
              <span className="block">Facial Treatments</span>
              <span className="block">Spa & Massage</span>
              <span className="block">Beauty Treatments</span>
            </div>
          </div>

          <div data-testid="footer-social">
            <h5 className="font-semibold mb-4">Follow Us</h5>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-primary-foreground/80 hover:text-white transition-colors"
                data-testid="social-facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-primary-foreground/80 hover:text-white transition-colors"
                data-testid="social-instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-primary-foreground/80 hover:text-white transition-colors"
                data-testid="social-whatsapp"
              >
                <Phone className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60" data-testid="footer-copyright">
          <p>&copy; 2026 Trends Parlour & Spa. All rights reserved. | Modern Beauty & Wellness Center</p>
        </div>
      </div>
    </footer>
  );
}
