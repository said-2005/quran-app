import Header from "@/components/Header";
import SurahGrid from "@/components/SurahGrid";
import { Surah } from "@/types";
import { API_BASE_URL } from "@/lib/constants";
import Link from 'next/link';

async function getSurahs(): Promise<Surah[]> {
    const res = await fetch(`${API_BASE_URL}/chapters`);
    if (!res.ok) {
        throw new Error("Failed to fetch surahs");
    }
    const data = await res.json();
    return data.chapters;
}

export default async function QuranPage() {
    const surahs = await getSurahs();

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
