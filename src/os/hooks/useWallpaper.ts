import { useState, useEffect } from "react";
import { getWallpaper } from "../config/wallpapers";

export function useWallpaper() {

    const [wallpaper, setWallpaper] = useState(
        getWallpaper(12)
    );

    useEffect(() => {

        function updateWallpaper() {

            const hour = new Date().getHours();

            setWallpaper(getWallpaper(hour));
        }

        updateWallpaper();

        const interval = window.setInterval(
            updateWallpaper,
            1000
        );

        return () => window.clearInterval(interval);

    }, []);

    return wallpaper;
}