import { ArrowLeft } from "lucide-react";
import { ActionButton } from "../components/ui/ActionButton";
export const NotFound=()=><section className="lm-shell lm-404" aria-labelledby="notfound-title"><span className="lm-kicker">ERREUR / ROUTE INTROUVABLE</span><h1 id="notfound-title" aria-label="Erreur 404"><span>4</span><span className="lm-error-zero" aria-label="0">0</span><span>4</span></h1><p>Cette page n'existe pas. Même les meilleurs niveaux ont des limites.</p><ActionButton primary href="/">Retour à l'accueil <ArrowLeft size={17} aria-hidden/></ActionButton></section>;
