import React from 'react';
import Link from 'next/link';
import { Surah } from '@/types';

interface SurahCardProps {
    surah: Surah;
}

export default function SurahCard({ surah }: SurahCardProps) {
    return (
        <Link href={`/surah/${surah.id}`}>
            <div className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow p-6 flex flex-col items-center text-center cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mb-4">
                    {surah.id}
                </div>
                <h2 className="text-xl font-bold mb-1 font-amiri">{surah.name_arabic}</h2>
                <p className="text-gray-600 font-medium">{surah.name_simple}</p>
                <p className="text-sm text-gray-400 mt-2">{surah.verses_count} Ayahs</p>
            </div>
        </Link>
    );
}
