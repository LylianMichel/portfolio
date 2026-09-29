import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { ProjectImage } from "../../types";

interface ProjectCarouselProps {
  images: ProjectImage[];
  projectTitle: string;
  eager?: boolean;
}

const fallbackImage = `${import.meta.env.BASE_URL}project-fallback.svg`;

export const ProjectCarousel = ({
  images,
  projectTitle,
  eager = false,
}: ProjectCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleImages = images.length > 1;
  const activeImage = images[activeIndex] ?? images[0];

  if (!activeImage) {
    return null;
  }

  const previous = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const next = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!hasMultipleImages) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
  };

  return (
    <div
      className="project-carousel"
      tabIndex={hasMultipleImages ? 0 : -1}
      onKeyDown={handleKeyDown}
      aria-label={`Galerie du projet ${projectTitle}`}
    >
      <img
        key={activeImage.src}
        src={activeImage.src}
        alt={activeImage.alt}
        className="project-image"
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = fallbackImage;
          event.currentTarget.classList.add("project-image-fallback");
        }}
      />

      <div className="project-carousel-top">
        <span className="project-carousel-label">{activeImage.label}</span>
        <span className="project-carousel-count" aria-live="polite">
          {activeIndex + 1} / {images.length}
        </span>
      </div>

      {hasMultipleImages ? (
        <>
          <button
            type="button"
            className="project-carousel-arrow project-carousel-arrow-left"
            onClick={previous}
            aria-label={`Image précédente de ${projectTitle}`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="project-carousel-arrow project-carousel-arrow-right"
            onClick={next}
            aria-label={`Image suivante de ${projectTitle}`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="project-carousel-dots" aria-label="Choisir une image">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className={`project-carousel-dot ${index === activeIndex ? "project-carousel-dot-active" : ""}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Afficher l'image ${index + 1} : ${image.label}`}
                aria-pressed={index === activeIndex}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};
