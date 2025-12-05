import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import VerseList from '@/components/VerseList';
import AudioPlayer from '@/components/AudioPlayer';
// @ts-ignore
import quranData from '@/data/quran.json';
import { Verse, Surah } from '@/types';

// Generate params from local JSON - INSTANT, no API calls
export async function generateStaticParams() {
    console.log('[Build] Generate Static Params using Local JSON');
    return (quranData as any[]).map((surah) => ({
        id: surah.id.toString(),
    }));
}

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function SurahPage({ params }: PageProps) {
    const { id } = await params;

    // Find Surah in local data
    const surahId = parseInt(id);
    const localSurah = (quranData as any[]).find((s) => s.id === surahId);

    if (!localSurah) {
        notFound();
    }

    // Log build progress (instant now, but kept for consistency)
    console.log(`[Build] Processing Surah ${id}/114 (Local Data)`);

    // Map to App Interfaces
    const surah: Surah = {
        id: localSurah.id,
        name_simple: localSurah.transliteration,
        name_arabic: localSurah.name,
        verses_count: localSurah.total_verses,
        revelation_place: localSurah.type,
        translated_name: {
            name: localSurah.transliteration,
            language_name: 'english'
        }
    };

    const verses: Verse[] = localSurah.verses.map((v: any) => ({
        id: v.id,
        verse_key: `${surah.id}:${v.id}`,
        text_uthmani: v.text,
        translations: [] // Local JSON doesn't have translations currently
    }));

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 pb-32">
                <Link href="/quran" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white mb-6 w-fit transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                    <span>العودة للقائمة</span>
                </Link>
                <div className="text-center mb-10">
                    <h1 className="font-amiri text-5xl mb-2 text-gray-800 dark:text-gray-100">{surah.name_arabic}</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">{surah.name_simple}</p>
                    <div className="flex justify-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>{surah.verses_count} Verses</span>
                        <span>•</span>
                        <span className="capitalize">{surah.revelation_place}</span>
                    </div>
                </div>

                <VerseList verses={verses} />
            </main>
            <AudioPlayer chapterId={id} />
        </div>
    );
}
