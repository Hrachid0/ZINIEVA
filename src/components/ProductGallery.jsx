import { useState } from "react";

export default function ProductGallery({ images, alt }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="overflow-hidden border border-border bg-card">
        <img
          src={images[active]}
          alt={alt}
          width={900}
          height={900}
          className="aspect-square w-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((image, index) => (
            <button
              key={image + index}
              type="button"
              onClick={() => setActive(index)}
              className={`h-20 w-20 overflow-hidden border transition-colors ${
                index === active ? "border-foreground" : "border-border hover:border-taupe"
              }`}
              aria-label={`${alt} ${index + 1}`}
            >
              <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
