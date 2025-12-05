import Link from "next/link";
import InstallPWA from "@/components/InstallPWA";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, gray 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="z-10 w-full max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 to-teal-800 dark:from-emerald-400 dark:to-teal-200 font-amiri mb-4 drop-shadow-sm">
            القرآن الكريم
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-amiri">
            وَقُرْآنًا فَرَقْنَاهُ لِتَقْرَأَهُ عَلَى النَّاسِ عَلَىٰ مُكْثٍ
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Quran Card */}
          <Link href="/quran" className="group">
            <div className="h-64 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-emerald-100 dark:border-gray-700 p-6 flex flex-col items-center justify-center gap-6 hover:-translate-y-2 hover:shadow-2xl hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-6xl group-hover:scale-110 transition-transform duration-300 filter drop-shadow-md">📖</span>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 font-amiri">القرآن الكريم</h2>
            </div>
          </Link>

          {/* Adhkar Card */}
          <Link href="/adhkar" className="group">
            <div className="h-64 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-amber-100 dark:border-gray-700 p-6 flex flex-col items-center justify-center gap-6 hover:-translate-y-2 hover:shadow-2xl hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-6xl group-hover:scale-110 transition-transform duration-300 filter drop-shadow-md">📚</span>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 font-amiri">الأذكار</h2>
            </div>
          </Link>

          {/* Sibha Card */}
          <Link href="/sibha" className="group">
            <div className="h-64 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-teal-100 dark:border-gray-700 p-6 flex flex-col items-center justify-center gap-6 hover:-translate-y-2 hover:shadow-2xl hover:border-teal-300 dark:hover:border-teal-700 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <span className="text-6xl group-hover:scale-110 transition-transform duration-300 filter drop-shadow-md">📿</span>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 font-amiri">السبحة</h2>
            </div>
          </Link>
        </div>
      </div>

      <InstallPWA />
    </div>
  );
}
