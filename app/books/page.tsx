import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "المكتبة الإسلامية | Islamic Library",
    description: "Browse authentic Hadith collections offline.",
};

const books = [
    {
        id: 'bukhari',
        name: 'Sahih al-Bukhari',
        arabicName: 'صحيح البخاري',
        description: 'The most authentic book of Hadith.',
        color: 'bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800'
    },
    {
        id: 'muslim',
        name: 'Sahih Muslim',
        arabicName: 'صحيح مسلم',
        description: 'One of the six major collections of Hadith.',
        color: 'bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800'
    },
    {
        id: 'malik',
        name: 'Al-Muwatta',
        arabicName: 'موطأ مالك',
        description: 'The first written collection of Hadith.',
        color: 'bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-800'
    },
    {
        id: 'nawawi',
        name: "Al-Nawawi's Forty Hadith",
        arabicName: 'الأربعين النووية',
        description: 'A compilation of forty hadiths by Imam al-Nawawi.',
        color: 'bg-teal-50 dark:bg-teal-900/10 text-teal-700 dark:text-teal-300 border-teal-100 dark:border-teal-800'
    }
];

export default function LibraryPage() {
    return (
        <div className="container mx-auto px-4 py-8 pb-20">
            <header className="text-center mb-12 space-y-4">
                <h1 className="text-4xl font-amiri font-bold text-emerald-900 dark:text-emerald-100">
                    المكتبة الإسلامية
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
                    مجموعة من أمهات كتب الحديث الشريف، متاحة للتصفح بدون إنترنت
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {books.map((book) => (
                    <Link
                        key={book.id}
                        href={`/books/${book.id}`}
                        className={`
              block p-8 rounded-3xl border-2 transition-all duration-300 
              hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden
              ${book.color}
            `}
                    >
                        <div className="relative z-10 flex flex-col h-full justify-between space-y-4">
                            <div>
                                <h2 className="text-3xl font-amiri font-bold mb-2">
                                    {book.arabicName}
                                </h2>
                                <h3 className="text-sm uppercase tracking-wider opacity-80 font-semibold">
                                    {book.name}
                                </h3>
                            </div>

                            <p className="text-sm opacity-70 leading-relaxed">
                                {book.description}
                            </p>

                            <div className="flex items-center gap-2 text-sm font-bold mt-4">
                                <span>تصفح الكتاب</span>
                                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                            </div>
                        </div>

                        {/* Decorative Icon Background */}
                        <div className="absolute -bottom-4 -left-4 text-9xl opacity-[0.05] pointer-events-none font-amiri">
                            📖
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
