import Link from 'next/link';
import Header from "@/components/Header";
import SurahGrid from "@/components/SurahGrid";
import { Surah } from "@/types";
// @ts-ignore - Ensure data exists or types are ignored for the JSON import if strict
import quranData from '@/data/quran.json';

// Utility helper to map local JSON schema to app's Surah interface
const mapLocalSurahToInterface = (localSurah: any): Surah => ({
    id: localSurah.id,
    name_simple: localSurah.transliteration,
    name_arabic: localSurah.name,
    verses_count: localSurah.total_verses,
    revelation_place: localSurah.type,
    // Provide a fallback translated name since it's missing in local data
    translated_name: {
        name: localSurah.transliteration, // Fallback
        language_name: 'english'
    }
});

export default function QuranPage() {
    // Map the local data to the expected interface
    const surahs: Surah[] = (quranData as any[]).map(mapLocalSurahToInterface);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 font-amiri">
                        سور القرآن الكريم
                    </h2>
                    <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-emerald-600 transition-all">
                        <span className="font-bold text-sm">عودة للرئيسية</span>
                    </Link>
                </div>
                <SurahGrid surahs={surahs} />
            </main>
        </div>
    );
}
