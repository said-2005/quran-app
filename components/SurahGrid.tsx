'use client';

import React, { useState } from 'react';
import SurahCard, { Surah } from './SurahCard';

interface SurahGridProps {
    surahs: Surah[];
}

export default function SurahGrid({ surahs }: SurahGridProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSurahs = surahs.filter((surah) => {
        const query = searchQuery.toLowerCase();
        return (
            surah.name_simple.toLowerCase().includes(query) ||
            surah.name_arabic.includes(query)
        );
    });

    return (
        <div>
            <div className="mb-8 max-w-md mx-auto">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search Surah (English or Arabic)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all shadow-sm"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredSurahs.map((surah) => (
                    <SurahCard key={surah.id} surah={surah} />
                ))}
                {filteredSurahs.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
                        No Surahs found matching "{searchQuery}"
                    </div>
                )}
            </div>
        </div>
    );
}
