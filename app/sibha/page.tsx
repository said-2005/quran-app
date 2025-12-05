import Sibha from "@/components/Sibha";
import Link from 'next/link';

export default function SibhaPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 items-center justify-center p-4 relative">
            {/* Back Button */}
            <Link href="/" className="absolute top-6 right-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors z-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="font-bold font-amiri text-lg">الرئيسية</span>
            </Link>

            <div className="w-full max-w-md">
                <Sibha />
            </div>
        </div>
    );
}
