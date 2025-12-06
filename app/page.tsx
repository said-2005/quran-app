import InstallPWA from "@/components/InstallPWA";
import IosInstallPrompt from "@/components/IosInstallPrompt";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "القرآن الكريم",
      description: "تصفح واستمع للقرآن الكريم",
      href: "/quran",
      icon: "📖",
      color: "bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800 hover:border-emerald-500",
    },
    {
      title: "الأذكار",
      description: "حصن المسلم وأذكار اليوم والليلة",
      href: "/adhkar",
      icon: "📚",
      color: "bg-amber-50 dark:bg-amber-900/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800 hover:border-amber-500",
    },
    {
      title: "السبحة",
      description: "عداد التسبيح الإلكتروني",
      href: "/sibha",
      icon: "📿",
      color: "bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800 hover:border-blue-500",
    },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-emerald-900/10 to-transparent dark:from-emerald-900/30 pt-12 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">

          {/* Featured Ayah Card */}
          <div className="relative bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-xl border border-emerald-100 dark:border-emerald-900/50 overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />

            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="islamic-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="currentColor" className="text-emerald-900" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
              </svg>
            </div>

            <div className="relative z-10 space-y-6">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
                وحي اليوم
              </span>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-amiri leading-[1.6] md:leading-[1.6] text-emerald-900 dark:text-emerald-100">
                إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ
              </h1>

              <p className="text-zinc-500 dark:text-zinc-400 text-lg font-light max-w-2xl mx-auto">
                &quot;Indeed, this Qur&apos;an guides to that which is most suitable.&quot;
              </p>
            </div>
          </div>

          {/* Integrated Install Button */}
          <div className="flex justify-center">
            <InstallPWA>
              <div className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3">
                <span className="bg-white/20 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </span>
                <div className="text-right rtl:text-right">
                  <div className="font-bold text-lg">تثبيت التطبيق</div>
                  <div className="text-xs text-emerald-50 opacity-90">للاستخدام بدون إنترنت</div>
                </div>
              </div>
            </InstallPWA>
          </div>

        </div>
      </div>

      {/* Main Features Grid */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className={`
                relative p-8 rounded-3xl border-2 bg-white dark:bg-zinc-800 
                transition-all duration-300 group hover:shadow-xl hover:-translate-y-1
                flex flex-col items-center text-center space-y-4 cursor-pointer
                ${feature.color}
              `}
            >
              <div className="text-6xl mb-2 transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-sm">
                {feature.icon}
              </div>

              <h2 className="text-2xl font-bold font-amiri text-zinc-800 dark:text-zinc-100">
                {feature.title}
              </h2>

              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[200px]">
                {feature.description}
              </p>

              <div className="absolute bottom-6 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span className="text-xs font-bold uppercase tracking-wider opacity-60">
                  فتح القسم &larr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <IosInstallPrompt />
    </div>
  );
}
