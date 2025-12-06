"use client";

import React, { useState } from "react";

interface HadithActionsProps {
    text: string;
}

export default function HadithActions({ text }: HadithActionsProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text:", err);
        }
    };

    const handleExplanation = () => {
        // Open Dorar.net or Google with the hadith text for explanation
        const query = encodeURIComponent(text.substring(0, 100)); // Limit length for URL safety
        window.open(`https://dorar.net/hadith/search?q=${query}`, '_blank');
    };

    return (
        <div className="mt-8 grid grid-cols-2 gap-4">
            <button
                onClick={handleCopy}
                className={`
                    py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2
                    ${copied
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }
                `}
            >
                {copied ? (
                    <>✅ تم النسخ (Copied)</>
                ) : (
                    <>📋 نسخة الحديث (Copy)</>
                )}
            </button>

            <button
                onClick={handleExplanation}
                className="bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-400 py-4 rounded-xl font-bold text-center border border-amber-100 dark:border-amber-800/30 flex items-center justify-center gap-2 hover:bg-amber-100 dark:hover:bg-amber-900/20 transition-colors"
            >
                <span>📚 الشرح (Dorar.net)</span>
                <span className="text-xs opacity-60">↗</span>
            </button>
        </div>
    );
}
