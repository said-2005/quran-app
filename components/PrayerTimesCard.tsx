"use client";

import React, { useEffect, useState } from "react";
import { Coordinates, CalculationMethod, PrayerTimes, Prayer } from "adhan";

export default function PrayerTimesCard() {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [nextPrayer, setNextPrayer] = useState<string>(Prayer.None);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                try {
                    const coordinates = new Coordinates(
                        position.coords.latitude,
                        position.coords.longitude
                    );
                    const date = new Date();
                    const params = CalculationMethod.MuslimWorldLeague();

                    const times = new PrayerTimes(coordinates, date, params);
                    setPrayerTimes(times);

                    const next = times.nextPrayer();
                    setNextPrayer(next);

                    setLoading(false);
                } catch (err) {
                    console.error(err);
                    setError("Error calculating prayer times.");
                    setLoading(false);
                }
            },
            (err) => {
                console.error(err);
                setError("Location access denied or unavailable.");
                setLoading(false);
            }
        );
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    const prayers = [
        { name: "Fajr", key: Prayer.Fajr, arabic: "الفجر" },
        { name: "Dhuhr", key: Prayer.Dhuhr, arabic: "الظهر" },
        { name: "Asr", key: Prayer.Asr, arabic: "العصر" },
        { name: "Maghrib", key: Prayer.Maghrib, arabic: "المغرب" },
        { name: "Isha", key: Prayer.Isha, arabic: "العشاء" },
    ];

    if (loading) {
        return (
            <div className="bg-white dark:bg-zinc-800 rounded-3xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-700 h-full flex items-center justify-center min-h-[200px]">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    <div className="text-zinc-400 text-sm animate-pulse">Requesting location...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white dark:bg-zinc-800 rounded-3xl p-6 shadow-sm border border-red-50 dark:border-red-900/10 h-full flex flex-col items-center justify-center min-h-[200px] text-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500">
                    ⚠️
                </div>
                <p className="text-sm text-zinc-500 max-w-[200px]">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="text-xs text-emerald-600 hover:text-emerald-700 underline"
                >
                    Retry Permission
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-zinc-800 rounded-3xl p-6 shadow-sm border border-emerald-100 dark:border-emerald-900/30 overflow-hidden relative">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

            <div className="flex items-center justify-between mb-6 relative z-10">
                <div>
                    <h2 className="text-2xl font-bold font-amiri text-emerald-900 dark:text-emerald-100">
                        أوقات الصلاة
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                        Based on your location
                    </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-lg">
                    🕌
                </div>
            </div>

            <div className="space-y-3 relative z-10">
                {prayerTimes && prayers.map((p) => {
                    const isNext = nextPrayer === p.key;
                    // Access the time safely
                    const time = prayerTimes[p.key as keyof PrayerTimes] as Date;

                    return (
                        <div
                            key={p.key}
                            className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${isNext
                                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 scale-102 ring-2 ring-emerald-500/20"
                                : "hover:bg-zinc-50 dark:hover:bg-zinc-700/50 text-zinc-700 dark:text-zinc-300 bg-zinc-50/50 dark:bg-zinc-800/50"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={`text-lg font-amiri ${isNext ? "text-white" : "text-zinc-800 dark:text-zinc-200"}`}>
                                    {p.arabic}
                                </span>
                                <span className={`text-[10px] uppercase tracking-wider font-semibold ${isNext ? "text-emerald-100" : "text-zinc-400"}`}>
                                    {p.name}
                                </span>
                            </div>
                            <div className={`font-medium font-mono text-sm ${isNext ? "text-white" : "text-zinc-600 dark:text-zinc-400"}`}>
                                {formatTime(time)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
