import {
    motion,
    useReducedMotion
} from "framer-motion";

import { useWallpaper } from "../hooks/useWallpaper";
import { useEffect, useState } from "react";

export default function Wallpaper() {

    const wallpaper = useWallpaper();
    const reducedMotion = useReducedMotion();
    const [loaded, setLoaded] = useState(wallpaper);
    const [background, setBackground] = useState(wallpaper);

    useEffect(() => {
        let cancelled = false;
        const image = new Image();
        image.src = wallpaper;
        // Garder le paysage précédent tant que le suivant n'est pas décodé.
        image.decode().then(() => {
            if (!cancelled) setLoaded(wallpaper);
        }).catch(() => {
            // En cas d'échec réseau, le paysage déjà affiché reste visible.
        });
        return () => { cancelled = true; };
    }, [wallpaper]);

    return (
        <>
            <div className="os-wallpaper" aria-hidden="true"
                style={{ backgroundImage: `url("${background}")` }} />
            <motion.div
                key={loaded}
                className="os-wallpaper"
                aria-hidden="true"

                style={{
                    backgroundImage: `url("${loaded}")`
                }}

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onAnimationComplete={() => setBackground(loaded)}

                transition={{
                    duration: reducedMotion ? 0 : 2
                }}
            />

        </>
    );
}
