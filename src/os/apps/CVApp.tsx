import { Download } from "lucide-react";
import { profile } from "../data/profile";

export default function CVApp() {
    const base = import.meta.env.BASE_URL;

    return (
        <article className="os-cv-app">
            <img
                src={`${base}cv.png`}
                alt="Curriculum vitae de Lylian Michel"
                className="os-cv-image"
            />

            <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="os-cv-download"
            >
                <Download size={18} />
                Télécharger mon CV
            </a>
        </article>
    );
}
