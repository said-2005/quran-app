import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import path from "path";
import fs from "fs";
import Link from "next/link";
import BookReader from "../../../components/BookReader"; // We'll create this client component

// Generate static params for SSG
export function generateStaticParams() {
    return [
        { bookId: "bukhari" },
        { bookId: "muslim" },
        { bookId: "malik" },
        { bookId: "nawawi" },
    ];
}

async function getBookData(bookId: string) {
    const filePath = path.join(process.cwd(), "data", "books", `${bookId}.json`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Error reading book data:", error);
        return null;
    }
}

export default async function BookPage({ params }: { params: { bookId: string } }) {
    const data = await getBookData(params.bookId);

    if (!data) {
        // If data not found (script didn't run), show helpful message or 404
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="text-2xl font-bold text-red-500 mb-4">Data Not Found</h1>
                <p className="text-zinc-600 mb-6">
                    Please run the download script to populate the library.<br />
                    <code>node scripts/download-books.js</code>
                </p>
                <Link href="/books" className="text-emerald-600 hover:underline">← Back to Library</Link>
            </div>
        );
    }

    const { metadata, hadiths } = data;

    return (
        <div className="container mx-auto px-4 py-8 pb-20">
            <div className="flex items-center justify-between mb-8">
                <Link
                    href="/books"
                    className="flex items-center gap-2 text-zinc-500 hover:text-emerald-600 transition-colors"
                >
                    <span>←</span>
                    <span>المكتبة</span>
                </Link>
                <h1 className="text-2xl md:text-3xl font-amiri font-bold text-center text-emerald-900 dark:text-emerald-100">
                    {metadata?.name || params.bookId}
                </h1>
                <div className="w-8" /> {/* Spacer */}
            </div>

            <Suspense fallback={<div className="text-center py-20">Loading Viewer...</div>}>
                <BookReader hadiths={hadiths} />
            </Suspense>
        </div>
    );
}
