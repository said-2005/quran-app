import Link from "next/link";
import adhkarData from "@/data/adhkar.json";

export default function AdhkarPage() {
    return (
        <div className="container mx-auto px-4 py-8 pb-32">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-amiri text-amber-800 dark:text-amber-400 mb-4">
                    الأذكار
                </h1>
                {/* Back Button */}
                <div className="flex justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-amiri text-lg px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 hover:bg-amber-50 dark:hover:bg-amber-900/20"
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
                {(adhkarData as any[]).map((item: any, index: number) => (
                    <Link
                        href={`/adhkar/${item.id}`}
                        key={item.id}
                    >
                        <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700 hover:border-amber-500 dark:hover:border-amber-500 transition-all hover:shadow-md group h-full flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold font-amiri group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                    {item.category}
                                </h2>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                    {item.array ? item.array.length : 0} ذكر
                                </p>
                            </div>
                            <span className="text-3xl opacity-20 group-hover:opacity-100 transition-opacity">📿</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
