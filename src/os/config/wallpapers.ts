const base = import.meta.env.BASE_URL;

export function getWallpaper(hour: number): string {

    if (hour >= 6 && hour < 10) {
        return `${base}wallpapers/alpine-sunrise.webp`;
    }

    if (hour >= 10 && hour < 17) {
        return `${base}wallpapers/alpine-day.webp`;
    }

    if (hour >= 17 && hour < 21) {
        return `${base}wallpapers/alpine-sunset.webp`;
    }

    return `${base}wallpapers/alpine-night.webp`;
}