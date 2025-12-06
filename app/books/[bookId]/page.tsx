import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import path from "path";
import fs from "fs";
import Link from "next/link";
import BookReader from "../../../components/BookReader";

// Explicit mapping to ensure URLs match filenames
const BOOK_FILES: Record<string, string[]> = {
    "bukhari": ["bukhari.json", "ara-bukhari.json"],
    "muslim": ["muslim.json", "ara-muslim.json"],
    "malik": ["malik.json", "ara-malik.json"],
    "nawawi": ["nawawi.json", "ara-nawawi.json"]
};

// Generate static params for SSG
export function generateStaticParams() {
    return Object.keys(BOOK_FILES).map((bookId) => ({
        bookId,
    }));
}

async function getBookData(bookId: string) {
    const validId = bookId.toLowerCase();
    const possibleFilenames = BOOK_FILES[validId];

    if (!possibleFilenames) return null;

    const dataDir = path.join(process.cwd(), "data", "books");

    // Try to find the file
    let filePath = "";
    for (const filename of possibleFilenames) {
        const p = path.join(dataDir, filename);
        if (fs.existsSync(p)) {
            filePath = p;
            break;
        }
    }

    if (!filePath) {
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
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="text-2xl font-bold text-red-500 mb-4">Data Not Found</h1>
                <p className="text-zinc-600 mb-6">
                    Book data not found for ID: <code>{params.bookId}</code><br />
                    Please run the download script:
                    <br />
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
