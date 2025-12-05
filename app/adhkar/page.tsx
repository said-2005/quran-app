import Link from 'next/link';

interface AdhkarCategory {
    id: number;
    category: string;
    audio: string;
    filename: string;
    array: any[];
}

async function getAdhkarCategories(): Promise<AdhkarCategory[]> {
    const res = await fetch('https://raw.githubusercontent.com/rn0x/Adhkar-json/main/adhkar.json');
    if (!res.ok) {
        throw new Error('Failed to fetch Adhkar data');
    }
    return res.json();
}

export default async function AdhkarListPage() {
    const categories = await getAdhkarCategories();

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            <div className="bg-emerald-600 dark:bg-emerald-800 text-white p-4 shadow-md sticky top-0 z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold font-amiri">الأذكار</h1>
                    <Link href="/" className="text-emerald-100 hover:text-white transition-colors text-sm font-bold flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        الرئيسية
                    </Link>
                </div>
            </div>

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/adhkar/${cat.id}`}
                            className="block group"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-700 transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between">
                                <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 font-amiri mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                                        {cat.category}
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {cat.array.length} ذكر
                                    </p>
                                </div>

                                <div className="mt-4 flex justify-end">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
