import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useId, useState, type KeyboardEvent } from "react";
import type { ProjectImage } from "../../types";
import { Modal } from "../ui/Modal";

interface ProjectCarouselProps {
  images: ProjectImage[];
  projectTitle: string;
  eager?: boolean;
}

const fallbackImage = `${import.meta.env.BASE_URL}project-fallback.svg`;

export const ProjectCarousel = ({ images, projectTitle, eager = false }: ProjectCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const titleId = useId();
  const hasMultipleImages = images.length > 1;
  const activeImage = images[activeIndex] ?? images[0];
  if (!activeImage) return null;

  const previous = () => setActiveIndex((current) => (current - 1 + images.length) % images.length);
  const next = () => setActiveIndex((current) => (current + 1) % images.length);
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!hasMultipleImages) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      event.key === "ArrowLeft" ? previous() : next();
    }
  };

  return (
    <figure className="project-gallery" tabIndex={hasMultipleImages ? 0 : undefined}
      onKeyDown={handleKeyDown} aria-label={`Captures du projet ${projectTitle}`}>
      <div className="project-image-wrap">
        <img key={activeImage.src} src={activeImage.src} srcSet={activeImage.srcSet}
          sizes="(min-width: 1024px) calc((100vw - 396px) * 0.55), (min-width: 768px) 50vw, 100vw"
          width={activeImage.width} height={activeImage.height} alt={activeImage.alt}
          className="project-image" loading={eager ? "eager" : "lazy"} decoding="async"
          fetchPriority={eager ? "high" : "auto"}
          onError={(event) => {
            const image = event.currentTarget;
            if (image.src.endsWith("project-fallback.svg")) return;
            image.removeAttribute("srcset");
            image.src = fallbackImage;
          }} />
      </div>
      <figcaption className="gallery-caption">
        <span className="gallery-label" aria-live="polite">{activeImage.label}</span>
        {hasMultipleImages ? (
          <div className="gallery-paging">
            <button type="button" className="gallery-button" onClick={previous}
              aria-label={`Image précédente de ${projectTitle}`}><ChevronLeft size={18} aria-hidden="true" /></button>
            <span className="gallery-count" aria-live="polite" aria-atomic="true">{activeIndex + 1} / {images.length}</span>
            <button type="button" className="gallery-button" onClick={next}
              aria-label={`Image suivante de ${projectTitle}`}><ChevronRight size={18} aria-hidden="true" /></button>
          </div>
        ) : null}
        <button type="button" className="gallery-expand" onClick={() => setExpanded(true)}
          aria-label={`Agrandir la capture de ${projectTitle}`}><Expand size={15} aria-hidden="true" />Agrandir</button>
      </figcaption>
      {expanded ? (
        <Modal titleId={titleId} className="image-modal" onClose={() => setExpanded(false)}>
          <div className="image-modal-content">
            <div className="image-modal-header">
              <h2 id={titleId}>{projectTitle} · {activeImage.label}</h2>
              <button type="button" className="icon-button" onClick={() => setExpanded(false)}
                aria-label="Fermer la capture"><X size={20} aria-hidden="true" /></button>
            </div>
            <img src={activeImage.src} width={activeImage.width} height={activeImage.height} alt={activeImage.alt} />
            {hasMultipleImages ? (
              <div className="image-modal-navigation">
                <button type="button" className="secondary-action" onClick={previous}><ChevronLeft size={18} aria-hidden="true" />Précédente</button>
                <span aria-live="polite">{activeIndex + 1} / {images.length}</span>
                <button type="button" className="secondary-action" onClick={next}>Suivante<ChevronRight size={18} aria-hidden="true" /></button>
              </div>
            ) : null}
          </div>
        </Modal>
      ) : null}
    </figure>
  );
};
