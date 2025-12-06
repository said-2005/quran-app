"use client";

import React, { useState, useEffect } from "react";

interface Hadith {
    hadithnumber: number | string;
    arabicnumber: number | string;
    text: string;
    grades: any[];
    reference: any;
}

const PAGE_SIZE = 50;

export default function BookReader({ hadiths }: { hadiths: Hadith[] }) {
    const [displayedHadiths, setDisplayedHadiths] = useState<Hadith[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate initial load
        const loadInitial = () => {
            setDisplayedHadiths(hadiths.slice(0, PAGE_SIZE));
            setLoading(false);
        };
        loadInitial();
    }, [hadiths]);

    const loadMore = () => {
        const nextPage = page + 1;
        const start = (nextPage - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        const newBatch = hadiths.slice(start, end);

        if (newBatch.length > 0) {
            setDisplayedHadiths(prev => [...prev, ...newBatch]);
            setPage(nextPage);
        }
    };

    const hasMore = displayedHadiths.length < hadiths.length;

    if (loading) {
        return <div className="text-center py-12 text-zinc-400">Loading hadiths...</div>;
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {displayedHadiths.map((hadith, idx) => (
                <div
                    key={`${hadith.hadithnumber}-${idx}`}
                    className="bg-white dark:bg-zinc-800 rounded-2xl p-6 md:p-8 shadow-sm border border-emerald-50 dark:border-emerald-900/20"
                >
                    <div className="flex justify-between items-start mb-6 border-b border-zinc-100 dark:border-zinc-700 pb-4">
                        <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-mono font-bold">
                            #{hadith.hadithnumber}
                        </span>

                        {hadith.reference && (
                            <div className="text-xs text-zinc-400">
                                {Object.entries(hadith.reference).map(([key, val]) => (
                                    <span key={key} className="ml-2 capitalize">{key}: {String(val)}</span>
                                ))}
                            </div>
                        )}
                    </div>

                    <p className="text-xl md:text-2xl font-amiri leading-[2.2] text-right text-zinc-800 dark:text-zinc-200">
                        {hadith.text}
                    </p>
                </div>
            ))}

            {hasMore && (
                <div className="flex justify-center pt-8 pb-12">
                    <button
                        onClick={loadMore}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-emerald-500/25 transition-all active:scale-95 font-bold"
                    >
                        Load More ({hadiths.length - displayedHadiths.length} remaining)
                    </button>
                </div>
            )}
        </div>
    );
}
