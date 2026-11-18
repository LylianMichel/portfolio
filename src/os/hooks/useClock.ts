import { useEffect, useState } from "react";

export function useClock() {

    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {

        setDate(new Date());

        const interval = window.setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => {
            window.clearInterval(interval);
        };

    }, []);

    return date;
}