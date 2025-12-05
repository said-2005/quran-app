"use client";

import Link from 'next/link';

const ADHKAR_CATEGORIES = [
    { id: 'morning', title: 'أذكار الصباح', icon: '🌅', color: 'bg-amber-100 text-amber-800' },
    { id: 'evening', title: 'أذكار المساء', icon: '🌃', color: 'bg-indigo-100 text-indigo-800' },
    { id: 'sleep', title: 'أذكار النوم', icon: '💤', color: 'bg-blue-100 text-blue-800' },
    { id: 'prayer', title: 'بعد الصلاة', icon: '🤲', color: 'bg-emerald-100 text-emerald-800' },
];

export default function Adhkar() {
    return (
        <div className="w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8 font-amiri">
                الأذكار اليومية
            </h2>

            <div className="grid grid-cols-2 gap-4">
                {ADHKAR_CATEGORIES.map((cat) => (
                    <Link
                        key={cat.id}
                        href={`/adhkar/${cat.id}`}
                        className="block group"
                    >
                        <div className={`
              h-32 rounded-xl flex flex-col items-center justify-center gap-3 p-4
              transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-lg
              border border-transparent group-hover:border-gray-100 dark:group-hover:border-gray-600
              ${cat.color} bg-opacity-50 dark:bg-opacity-20
            `}>
                            <span className="text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform">{cat.icon}</span>
                            <span className="font-bold font-amiri text-lg text-center dark:text-gray-200">{cat.title}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
