import VerseList from "@/components/VerseList";
import AudioPlayer from "@/components/AudioPlayer";
import Link from "next/link";
import quranData from "@/data/quran.json";
import { Surah, Verse } from "@/types";

// Generate all static paths at build time
export async function generateStaticParams() {
    return quranData.map((surah) => ({
        id: surah.id.toString(),
    }));
}

export default function SurahPage({ params }: { params: { id: string } }) {
    const surahId = parseInt(params.id);
    const localSurah = quranData.find((s) => s.id === surahId);

    if (!localSurah) {
        return <div className="text-center py-20">Surah not found</div>;
    }

    // Map local data to Surah interface
    const surah: Surah = {
        id: localSurah.id,
        name_simple: localSurah.transliteration, // Mapping transliteration to name_simple
        name_arabic: localSurah.name, // Mapping name to name_arabic
        verses_count: localSurah.total_verses, // Mapping total_verses to verses_count
        revelation_place: localSurah.type, // Mapping type to revelation_place
    };

    // Map local data to Verse interface
    const verses: Verse[] = localSurah.verses.map((v) => ({
        id: v.id,
        verse_key: `${surah.id}:${v.id}`,
        text_uthmani: v.text, // Mapping text to text_uthmani
        translations: [], // Local data might not have translations, providing empty array or mock
    }));

    return (
        <div className="container mx-auto px-4 pb-32">
            {/* Back Button */}
            <div className="pt-6 pb-2">
                <Link
                    href="/quran"
                    className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors font-amiri text-lg px-3 py-1 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 rtl:rotate-180"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    العودة للفهرس
                </Link>
            </div>

            <div className="bg-emerald-50 dark:bg-zinc-800/50 rounded-3xl p-8 mb-8 text-center border border-emerald-100 dark:border-zinc-700">
                <h1 className="text-4xl md:text-6xl font-amiri text-emerald-800 dark:text-emerald-400 mb-2">
                    {surah.name_arabic}
                </h1>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 font-amiri">
                    {surah.verses_count} آية • {surah.revelation_place === "makkah" ? "مكية" : "مدنية"}
                </p>
            </div>

            <div className="bg-white dark:bg-zinc-900/50 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <VerseList verses={verses} />
            </div>

            <AudioPlayer
                chapterId={surahId.toString()}
            />
        </div>
    );
}
