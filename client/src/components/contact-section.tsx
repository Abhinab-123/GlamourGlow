import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin } from "lucide-react";

interface BookingForm {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
}

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<BookingForm>({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
  });

  const getServiceTitle = (serviceValue: string) => {
    const services: Record<string, string> = {
      "hair-care": "Haircuts & Styling",
      "beard-grooming": "Beard & Shave Services", 
      "facial-treatments": "Men's Facials",
      "spa-services": "Spa & Treatments",
      "color-treatments": "Color & Grey Coverage",
      "grooming-extras": "Additional Grooming"
    };
    return services[serviceValue] || serviceValue;
  };

  const handleWhatsAppContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.service) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const whatsappNumber = "919040239357"; // WhatsApp number for Trends Parlour
    const serviceTitle = getServiceTitle(formData.service);
    
    let message = `Hi! I'd like to book an appointment.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${serviceTitle}`;
    
    if (formData.date) {
      message += `\nPreferred Date: ${formData.date}`;
    }
    if (formData.time) {
      message += `\nPreferred Time: ${formData.time}`;
    }
    
    message += `\n\nPlease confirm availability. Thank you!`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Opening WhatsApp",
      description: "Redirecting you to WhatsApp to complete your booking.",
    });
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-serif font-bold text-foreground mb-4" data-testid="contact-title">
            Book Appointment
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="contact-description">
            Book your appointment today and experience professional grooming services designed exclusively for men.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Card className="bg-card p-8 rounded-lg shadow-lg">
              <CardContent className="p-0">
                <h4 className="text-xl font-serif font-semibold text-foreground mb-6" data-testid="contact-info-title">
                  Contact Information
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3" data-testid="contact-phone-1">
                    <Phone className="text-primary h-5 w-5" />
                    <span>+91 90402 39357</span>
                  </div>
                  <div className="flex items-start space-x-3" data-testid="contact-address">
                    <MapPin className="text-primary h-5 w-5 mt-1" />
                    <a 
                      href="https://maps.app.goo.gl/287YWsoAkKG7AdU3A" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      Trends Men's Grooming Lounge<br />
                      Plot:763 S/3, Niladri Vihar Rd, Sailashree Vihar, Chandrasekharpur, Bhubaneswar, Odisha 751021
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card p-8 rounded-lg shadow-lg">
              <CardContent className="p-0">
                <h4 className="text-xl font-serif font-semibold text-foreground mb-6" data-testid="opening-hours-title">
                  Opening Hours
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between" data-testid="hours-weekdays">
                    <span>Monday - Saturday</span>
                    <span className="font-semibold">10:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between" data-testid="hours-sunday">
                    <span>Sunday</span>
                    <span className="font-semibold">11:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card p-8 rounded-lg shadow-lg">
            <CardContent className="p-0">
              <h4 className="text-xl font-serif font-semibold text-foreground mb-6" data-testid="booking-form-title">
                Book Appointment
              </h4>
              <form onSubmit={handleWhatsAppContact} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full"
                  data-testid="input-name"
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full"
                  data-testid="input-phone"
                />
                <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                  <SelectTrigger className="w-full" data-testid="select-service-trigger">
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                  <SelectContent data-testid="select-service-content">
                    <SelectItem value="hair-care" data-testid="select-service-hair">Haircuts & Styling</SelectItem>
                    <SelectItem value="beard-grooming" data-testid="select-service-beard">Beard & Shave Services</SelectItem>
                    <SelectItem value="facial-treatments" data-testid="select-service-facial">Men's Facials</SelectItem>
                    <SelectItem value="spa-services" data-testid="select-service-spa">Spa & Treatments</SelectItem>
                    <SelectItem value="color-treatments" data-testid="select-service-color">Color & Grey Coverage</SelectItem>
                    <SelectItem value="grooming-extras" data-testid="select-service-extras">Additional Grooming</SelectItem>
                  </SelectContent>
                </Select>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full"
                    data-testid="input-date"
                  />
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full"
                    data-testid="input-time"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  data-testid="button-whatsapp-contact"
                >
                  Contact via WhatsApp
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
