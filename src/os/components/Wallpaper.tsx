import {
    AnimatePresence,
    motion,
    useReducedMotion
} from "framer-motion";

import { useWallpaper } from "../hooks/useWallpaper";

export default function Wallpaper() {

    const wallpaper = useWallpaper();
    const reducedMotion = useReducedMotion();

    return (
        <AnimatePresence initial={false}>

            <motion.div
                key={wallpaper}
                className="os-wallpaper"

                style={{
                    backgroundImage: `url("${wallpaper}")`
                }}

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}

                transition={{
                    duration: reducedMotion ? 0 : 2
                }}
            />

        </AnimatePresence>
    );
}