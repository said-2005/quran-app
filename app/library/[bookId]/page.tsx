import React from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

// Helper to read book data with pagination
async function getBook(bookId: string, page: number = 1, limit: number = 50) {
    const filePath = path.join(process.cwd(), 'data/books', `${bookId}.json`);
    if (!fs.existsSync(filePath)) return null;

    try {
        // Optimally we would stream this or use a database, but for JSON files we have to read it all.
        // We can optimize by caching this if needed, but Next.js data cache helps.
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        const total = content.hadiths.length;
        const start = (page - 1) * limit;
        const end = start + limit;
        const items = content.hadiths.slice(start, end);

        return {
            metadata: content.metadata,
            hadiths: items,
            pagination: {
                current: page,
                total: Math.ceil(total / limit),
                hasMore: end < total
            }
        };
    } catch (e) {
        console.error("Error reading book", e);
        return null;
    }
}

export default async function BookPage({ params, searchParams }: {
    params: { bookId: string },
    searchParams: { page?: string }
}) {
    const page = Number(searchParams.page) || 1;
    const data = await getBook(params.bookId, page);

    if (!data) {
        return notFound();
    }

    const { metadata, hadiths, pagination } = data;

    return (
        <div className="container mx-auto px-4 py-8 pb-20 min-h-screen bg-zinc-50 dark:bg-zinc-950">
            {/* Header */}
            <div className="text-center mb-12 space-y-2">
                <Link href="/library" className="text-sm text-emerald-600 hover:underline mb-4 block">
                    &larr; العودة للمكتبة
                </Link>
                <h1 className="text-4xl font-amiri font-bold text-emerald-900 dark:text-emerald-100">
                    {metadata.arabicName}
                </h1>
                <p className="text-zinc-500">{metadata.name}</p>
            </div>

            {/* List */}
            <div className="max-w-4xl mx-auto space-y-4">
                {hadiths.map((h: any) => (
                    <Link
                        key={h.id}
                        href={`/library/${params.bookId}/${h.id}`}
                        className="block bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-emerald-500 transition-colors group"
                    >
                        <div className="flex justify-between items-center mb-4 border-b border-zinc-50 dark:border-zinc-800 pb-3">
                            <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-3 py-1 rounded-full text-xs font-bold">
                                {metadata.arabicName} #{h.id}
                            </span>
                            {/* Simple grade display if available */}
                            {h.grades && h.grades[0] && (
                                <span className="text-xs text-zinc-400">
                                    {h.grades[0].grade}
                                </span>
                            )}
                        </div>

                        <p className="text-right font-amiri text-xl leading-loose text-zinc-800 dark:text-zinc-200 line-clamp-3 group-hover:text-emerald-900 dark:group-hover:text-emerald-100 transition-colors">
                            {h.text}
                        </p>
                    </Link>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-12">
                {page > 1 && (
                    <Link
                        href={`/library/${params.bookId}?page=${page - 1}`}
                        className="px-6 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-700 transition"
                    >
                        السابق
                    </Link>
                )}

                <span className="text-zinc-500 text-sm">
                    صفحة {page} من {pagination.total}
                </span>

                {pagination.hasMore && (
                    <Link
                        href={`/library/${params.bookId}?page=${page + 1}`}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/20"
                    >
                        التالي
                    </Link>
                )}
            </div>
        </div>
    );
}
