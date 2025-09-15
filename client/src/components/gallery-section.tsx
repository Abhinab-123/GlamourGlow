import { GALLERY_IMAGES } from "@/lib/constants";

export default function GallerySection() {
  return (
    <section id="gallery" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-serif font-bold text-foreground mb-4" data-testid="gallery-title">
            Our Work
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="gallery-description">
            See the transformations and beautiful results from our expert stylists and beauty professionals
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((image, index) => (
            <div
              key={index}
              className="gallery-item aspect-square overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer"
              data-testid={`gallery-item-${index}`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
                data-testid={`gallery-image-${index}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
