import React, { Suspense } from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import HadithActions from "@/components/HadithActions";

// Reuse the book data fetcher helper logic strictly for this page
async function getHadith(bookId: string, hadithId: string) {
    const filePath = path.join(process.cwd(), 'data/books', `${bookId}.json`);
    if (!fs.existsSync(filePath)) return null;

    try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        // Flexible ID matching (string vs number)
        const hadith = content.hadiths.find((h: any) => String(h.id) === hadithId);
        return {
            metadata: content.metadata,
            hadith
        };
    } catch (e) {
        return null;
    }
}

export default async function HadithPage({ params }: { params: { bookId: string, hadithId: string } }) {
    const data = await getHadith(params.bookId, params.hadithId);

    if (!data || !data.hadith) {
        return notFound();
    }

    const { metadata, hadith } = data;
    const isSahih = metadata.id === 'bukhari' || metadata.id === 'muslim';

    return (
        <div className="container mx-auto px-4 py-8 pb-20 max-w-4xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
                <Link href="/library" className="hover:text-emerald-600">المكتبة</Link>
                <span>/</span>
                <span className="text-zinc-800 dark:text-zinc-300 font-bold">{metadata.arabicName}</span>
                <span>/</span>
                <span>حديث #{hadith.id}</span>
            </div>

            {/* Main Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-xl border border-emerald-50 dark:border-emerald-900/20 relative overflow-hidden">

                {/* Verification Badge */}
                <div className={`absolute top-0 left-0 px-6 py-2 rounded-br-3xl font-bold text-sm flex items-center gap-2 ${isSahih ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                    }`}>
                    <span>{isSahih ? '✅ Verified Sahih' : '📜 Documented'}</span>
                </div>

                <div className="mt-8 mb-12">
                    <p className="text-3xl md:text-4xl font-amiri leading-[2.4] text-right text-zinc-800 dark:text-zinc-100">
                        {hadith.text}
                    </p>
                </div>

                {/* Metadata Footer */}
                <div className="border-t border-zinc-100 dark:border-zinc-800 pt-6 flex flex-wrap justify-between items-center gap-4">
                    <div className="space-y-1">
                        <div className="text-sm text-zinc-400 font-semibold uppercase tracking-wider">Source</div>
                        <div className="text-lg font-bold text-emerald-800 dark:text-emerald-400">
                            {metadata.name}
                        </div>
                    </div>

                    {hadith.grades && hadith.grades.length > 0 && (
                        <div className="text-right">
                            <div className="text-sm text-zinc-400 font-semibold uppercase tracking-wider mb-1">Grade (Hukm)</div>
                            <div className="flex flex-wrap gap-2 justify-end">
                                {hadith.grades.map((g: any, i: number) => (
                                    <span key={i} className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-xs text-zinc-600 dark:text-zinc-400">
                                        {g.grade}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Tabs / Actions */}
            <HadithActions text={hadith.text} />
        </div>
    );
}
