"use client";

import { useState, useEffect } from "react";

export default function Sibha() {
    // Initialize with 0 or value from localStorage
    const [count, setCount] = useState(0);

    // Load saved count on mount
    useEffect(() => {
        const saved = localStorage.getItem("sibha-count");
        if (saved) {
            setCount(parseInt(saved, 10));
        }
    }, []);

    // Save count whenever it changes
    useEffect(() => {
        localStorage.setItem("sibha-count", count.toString());
    }, [count]);

    const increment = () => {
        setCount((prev) => prev + 1);
    };

    const reset = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent increment when clicking reset
        setCount(0);
    };

    return (
        <div className="w-full max-w-sm mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-emerald-100 dark:border-emerald-900/30">
            <h2 className="text-2xl font-bold text-center text-emerald-800 dark:text-emerald-400 mb-6 font-amiri">
                المسبحة الإلكترونية
            </h2>

            <div className="relative flex justify-center items-center mb-6">
                {/* Main Counter Button */}
                <button
                    onClick={increment}
                    className="w-48 h-48 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg flex flex-col items-center justify-center text-white active:scale-95 transition-transform duration-150 relative ring-4 ring-emerald-100 dark:ring-emerald-900 group"
                    aria-label="Increment counter"
                >
                    <span className="text-6xl font-bold font-mono tracking-wider tabular-nums drop-shadow-md">
                        {count}
                    </span>
                    <span className="text-xs mt-2 text-emerald-100 opacity-80 font-amiri">
                        اضغط للتسبيح
                    </span>

                    {/* Decorative border effect */}
                    <div className="absolute inset-2 rounded-full border-2 border-dashed border-white/30 animate-[spin_10s_linear_infinite]" />
                </button>

                {/* Reset Button (Absolute positioned or separate) - Placing it separately for better UX on mobile */}
            </div>

            <div className="flex justify-center">
                <button
                    onClick={reset}
                    className="px-6 py-2 rounded-full text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 transition-colors border border-emerald-200 dark:border-emerald-800/50"
                >
                    تصفير العداد ↺
                </button>
            </div>
        </div>
    );
}
