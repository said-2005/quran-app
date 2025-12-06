import React from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "البحث في السنة | Islamic Library",
    description: "Search and verify Hadiths offline.",
};

interface SearchProps {
    searchParams: { q?: string };
}

// Helper to read data
function searchBooks(query: string): any[] {
    const books = ['bukhari', 'muslim', 'malik', 'nawawi'];
    const results: any[] = [];
    const limit = 20;

    if (!query || query.length < 2) return [];

    const normalizedQuery = query.trim(); // Arabic regex could be added here

    for (const bookId of books) {
        if (results.length >= limit) break;

        try {
            const filePath = path.join(process.cwd(), 'data/books', `${bookId}.json`);
            if (fs.existsSync(filePath)) {
                const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                const matches = content.hadiths.filter((h: any) => h.text.includes(normalizedQuery));

                for (const m of matches) {
                    if (results.length >= limit) break;
                    // Add verification data
                    const isSahih = bookId === 'bukhari' || bookId === 'muslim' || (m.grades && m.grades.some((g: any) => g.grade.toLowerCase().includes('sahih')));

                    results.push({
                        bookId,
                        bookName: content.metadata.name,
                        bookArabicName: content.metadata.arabicName,
                        isSahih,
                        hadith: m
                    });
                }
            }
        } catch (e) {
            console.error(`Error searching ${bookId}`, e);
        }
    }

    return results;
}

export default function LibraryPage({ searchParams }: SearchProps) {
    const query = searchParams.q || "";
    const results = searchBooks(query);

    return (
        <div className="container mx-auto px-4 py-8 pb-20 min-h-screen bg-zinc-50 dark:bg-zinc-950">

            {/* Header & Search */}
            <div className="text-center space-y-6 mb-12">
                <h1 className="text-4xl font-amiri font-bold text-emerald-900 dark:text-emerald-100">
                    المكتبة والبحث
                </h1>

                {/* Search Form */}
                <form className="max-w-2xl mx-auto relative group">
                    <input
                        name="q"
                        defaultValue={query}
                        placeholder="ابحث عن حديث... (مثال: إنما الأعمال بالنيات)"
                        className="w-full py-4 px-6 pr-12 rounded-full border-2 border-emerald-100 dark:border-emerald-900/30 bg-white dark:bg-zinc-900 focus:outline-none focus:border-emerald-500 transition-all shadow-sm group-hover:shadow-md"
                    />
                    <button type="submit" className="absolute left-2 top-2 bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 transition">
                        🔍
                    </button>
                </form>
            </div>

            {/* Results or Default Grid */}
            {query ? (
                <div className="max-w-3xl mx-auto space-y-4">
                    <div className="flex items-center justify-between text-sm text-zinc-500 mb-4">
                        <span>نتائج البحث عن: "{query}"</span>
                        <span>{results.length} نتيجة</span>
                    </div>

                    {results.length === 0 && (
                        <div className="text-center py-12 text-zinc-400">
                            لا توجد نتائج مطابقة. حاول بكلمات مختلفة.
                        </div>
                    )}

                    {results.map((item, idx) => (
                        <Link
                            key={`${item.bookId}-${item.hadith.id}-${idx}`}
                            href={`/library/${item.bookId}/${item.hadith.id}`}
                            className="block bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-emerald-500 transition-colors group"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                        {item.bookName}
                                    </span>
                                    {/* Verification Badge */}
                                    {item.isSahih ? (
                                        <span className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                            ✅ حديث صحيح
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                            📜 حديث موثق
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs bg-zinc-50 dark:bg-zinc-800 px-2 py-1 rounded-md text-zinc-500">
                                    #{item.hadith.id}
                                </span>
                            </div>

                            <p className="text-right font-amiri text-xl leading-loose text-zinc-800 dark:text-zinc-200 line-clamp-3 group-hover:text-emerald-900 dark:group-hover:text-emerald-100 transition-colors">
                                {item.hadith.text}
                            </p>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mt-12">
                    {[
                        { id: 'bukhari', title: 'صحيح البخاري', color: 'bg-emerald-50 text-emerald-700' },
                        { id: 'muslim', title: 'صحيح مسلم', color: 'bg-blue-50 text-blue-700' },
                        { id: 'malik', title: 'موطأ مالك', color: 'bg-amber-50 text-amber-700' },
                        { id: 'nawawi', title: 'الأربعين النووية', color: 'bg-teal-50 text-teal-700' },
                    ].map(b => (
                        <Link key={b.id} href={`/library/${b.id}`} className={`${b.color} p-6 rounded-2xl text-center font-bold font-amiri text-xl hover:opacity-80 transition`}>
                            {b.title}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
