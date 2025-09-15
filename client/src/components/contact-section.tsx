import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

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

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingForm) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Submitted",
        description: "We'll contact you soon to confirm your appointment.",
      });
      setFormData({
        name: "",
        phone: "",
        service: "",
        date: "",
        time: "",
      });
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.service) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    bookingMutation.mutate(formData);
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-serif font-bold text-foreground mb-4" data-testid="contact-title">
            Visit Us
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="contact-description">
            Book your appointment today and experience professional grooming services designed exclusively for men.
          </p>
          <div className="bg-accent text-white px-6 py-2 rounded-full inline-block mt-4 font-semibold">
            EXCLUSIVELY FOR MEN
          </div>
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
                    <span>7008544493</span>
                  </div>
                  <div className="flex items-center space-x-3" data-testid="contact-phone-2">
                    <Phone className="text-primary h-5 w-5" />
                    <span>9008544493</span>
                  </div>
                  <div className="flex items-center space-x-3" data-testid="contact-email">
                    <Mail className="text-primary h-5 w-5" />
                    <span>info@trendsparlour.com</span>
                  </div>
                  <div className="flex items-start space-x-3" data-testid="contact-address">
                    <MapPin className="text-primary h-5 w-5 mt-1" />
                    <span>
                      Trends Men's Grooming Lounge<br />
                      Professional Barbershop & Spa<br />
                      Your Location Here
                    </span>
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
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  disabled={bookingMutation.isPending}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  data-testid="button-submit-booking"
                >
                  {bookingMutation.isPending ? "Submitting..." : "Book Appointment"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
