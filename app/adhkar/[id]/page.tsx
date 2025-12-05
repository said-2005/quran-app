import Link from "next/link";
import adhkarData from "@/data/adhkar.json";

// Generate all static paths at build time
// Generate all static paths at build time
export async function generateStaticParams() {
    return (adhkarData as any[]).map((item: any) => ({
        id: item.id.toString(),
    }));
}

export default function AdhkarDetailPage({ params }: { params: { id: string } }) {
    const startId = parseInt(params.id);
    const dhikrCategory = (adhkarData as any[]).find((item: any) => item.id === startId);

    if (!dhikrCategory) {
        return <div className="text-center py-20">Adhkar Category Not Found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 pb-32">
            {/* Back Button */}
            <div className="pt-6 pb-2">
                <Link
                    href="/adhkar"
                    className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors font-amiri text-lg px-3 py-1 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20"
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
                    العودة للأذكار
                </Link>
            </div>

            <div className="text-center mb-8 bg-amber-50 dark:bg-zinc-800/50 p-8 rounded-3xl border border-amber-100 dark:border-zinc-700">
                <h1 className="text-3xl md:text-5xl font-amiri text-amber-800 dark:text-amber-400">
                    {dhikrCategory.category}
                </h1>
            </div>

            <div className="space-y-6">
                {dhikrCategory.array.map((dhikr: any, index: number) => (
                    <div key={index} className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-700 relative overflow-hidden">

                        <div className="mb-4">
                            <p className="text-2xl leading-loose font-amiri text-zinc-800 dark:text-zinc-200 text-center">
                                {dhikr.text}
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-700">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {dhikr.count > 1 ? `التكرار: ${dhikr.count}` : ''}
                            </p>
                            {dhikr.audio && (
                                <audio controls className="w-full md:w-64">
                                    <source src={dhikr.audio} type="audio/mp3" />
                                    Your browser does not support the audio element.
                                </audio>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
