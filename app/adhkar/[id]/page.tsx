import Link from 'next/link';
import { notFound } from 'next/navigation';

interface DhikrItem {
    id: number;
    text: string;
    count: number;
    audio: string;
    filename: string;
}

interface AdhkarCategory {
    id: number;
    category: string;
    audio: string;
    filename: string;
    array: DhikrItem[];
}

async function getAdhkarData(): Promise<AdhkarCategory[]> {
    const res = await fetch('https://raw.githubusercontent.com/rn0x/Adhkar-json/main/adhkar.json');
    if (!res.ok) {
        throw new Error('Failed to fetch Adhkar data');
    }
    return res.json();
}

// 1. Generate Static Paths (SSG) with Progress Logging
export async function generateStaticParams() {
    console.log('[Build] Fetching Adhkar categories for SSG...');
    const categories = await getAdhkarData();

    return categories.map((category, index) => {
        console.log(`[Build] Generating static params for Adhkar Category: ${category.category} (${index + 1}/${categories.length})`);
        return {
            id: category.id.toString(),
        };
    });
}

interface PageProps {
    params: Promise<{ id: string }>;
}

// 2. Page Component
export default async function AdhkarDetailPage({ params }: PageProps) {
    const { id } = await params;
    const categories = await getAdhkarData();
    const category = categories.find((c) => c.id.toString() === id);

    if (!category) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            <div className="bg-emerald-600 dark:bg-emerald-800 text-white p-4 shadow-md sticky top-0 z-10">
                <div className="container mx-auto flex justify-between items-center max-w-3xl">
                    <Link href="/adhkar" className="flex items-center gap-1 text-emerald-100 hover:text-white transition-colors font-bold">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <span className="hidden sm:inline">القائمة</span>
                    </Link>
                    <h1 className="text-xl md:text-2xl font-bold font-amiri text-center flex-grow truncate px-4">
                        {category.category}
                    </h1>
                    <div className="w-16"></div> {/* Spacer for centering title */}
                </div>
            </div>

            <main className="flex-grow container mx-auto px-4 py-8 max-w-3xl">
                <div className="space-y-6">
                    {category.array.map((item, index) => (
                        <div
                            key={item.id}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-emerald-50 dark:border-gray-700 hover:shadow-md transition-shadow relative overflow-hidden group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="inline-flex items-center justify-center min-w-[2.5rem] h-10 px-4 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-base font-bold border border-emerald-200 dark:border-emerald-800">
                                    {item.count} {item.count === 1 ? 'مرة' : 'مرات'}
                                </span>
                                <span className="text-xs text-gray-400 font-mono">#{index + 1}</span>
                            </div>

                            <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-amiri leading-loose text-right" style={{ lineHeight: '2.2' }}>
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
