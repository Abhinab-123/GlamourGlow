import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICES } from "@/lib/constants";

export default function ServicesSection() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-serif font-bold text-foreground mb-4" data-testid="services-title">
            Our Services
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="services-description">
            Professional grooming services crafted exclusively for the modern man. Expert techniques, premium products, exceptional results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((category) => (
            <Card
              key={category.id}
              className="service-card bg-card rounded-lg shadow-lg overflow-hidden"
              data-testid={`service-card-${category.id}`}
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-48 object-cover"
                data-testid={`service-image-${category.id}`}
              />
              <CardContent className="p-6">
                <h4 className="text-xl font-serif font-semibold text-foreground mb-4" data-testid={`service-title-${category.id}`}>
                  {category.title}
                </h4>
                <div className="space-y-3 text-sm">
                  {category.services.map((service, index) => (
                    <div key={index} className="flex justify-between items-center" data-testid={`service-item-${category.id}-${index}`}>
                      <span>{service.name}</span>
                      <span className="font-semibold text-primary">₹{service.price}</span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={scrollToContact}
                  className="w-full mt-6 bg-primary text-primary-foreground py-3 rounded-full hover:bg-primary/90 transition-colors"
                  data-testid={`button-book-service-${category.id}`}
                >
                  Book Service
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
