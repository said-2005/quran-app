import Link from "next/link";
import surahsData from "@/data/quran.json";

export default function QuranPage() {
    return (
        <div className="container mx-auto px-4 py-8 pb-32">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-amiri text-emerald-800 dark:text-emerald-400 mb-4">
                    فهرس السور
                </h1>
                {/* Back Button */}
                <div className="flex justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-amiri text-lg px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
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
                        العودة للقائمة الرئيسية
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {surahsData.map((surah) => (
                    <Link href={`/surah/${surah.id}`} key={surah.id}>
                        <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                        {surah.id}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold font-amiri group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                            {surah.name_arabic}
                                        </h2>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                            {surah.verses_count} آية • {surah.revelation_place === "makkah" ? "مكية" : "مدنية"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
