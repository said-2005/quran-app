import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import VerseList from '@/components/VerseList';
import AudioPlayer from '@/components/AudioPlayer';
import { API_BASE_URL } from '@/lib/constants';

// Generate params for all 114 Surahs to pre-render them at build time
export async function generateStaticParams() {
    console.log('[Build] Generating static params for 114 Surahs...');
    return Array.from({ length: 114 }, (_, i) => {
        const id = (i + 1).toString();
        // Log progress every 10 Surahs to avoid spamming
        if ((i + 1) % 10 === 0 || i === 0 || i === 113) {
            console.log(`[Build] Prepared param for Surah ${id}/114`);
        }
        return { id };
    });
}

interface PageProps {
    params: Promise<{ id: string }>;
}

async function getSurah(id: string) {
    const res = await fetch(`${API_BASE_URL}/chapters/${id}`);
    if (!res.ok) throw new Error('Failed to fetch surah');
    return res.json();
}

async function getVerses(id: string) {
    // Fetch all verses for the chapter. 286 is the max number of verses in a surah (Al-Baqarah)
    const res = await fetch(`${API_BASE_URL}/verses/by_chapter/${id}?fields=text_uthmani&translations=131&per_page=286`);
    if (!res.ok) throw new Error('Failed to fetch verses');
    return res.json();
}

export default async function SurahPage({ params }: PageProps) {
    const { id } = await params;

    // Log build progress
    const percentage = Math.round((parseInt(id) / 114) * 100);
    console.log(`[Build] Processing Surah ${id}/114 - ${percentage}%`);

    const [surahData, versesData] = await Promise.all([
        getSurah(id),
        getVerses(id)
    ]);

    const surah = surahData.chapter;
    const verses = versesData.verses;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 pb-32">
                <Link href="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white mb-6 w-fit transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                    <span>العودة للقائمة</span>
                </Link>
                <div className="text-center mb-10">
                    <h1 className="font-amiri text-5xl mb-2 text-gray-800 dark:text-gray-100">{surah.name_arabic}</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">{surah.name_simple} - {surah.translated_name.name}</p>
                    <div className="flex justify-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>{surah.verses_count} Verses</span>
                        <span>•</span>
                        <span>{surah.revelation_place}</span>
                    </div>
                </div>

                <VerseList verses={verses} />
            </main>
            <AudioPlayer chapterId={id} />
        </div>
    );
}
