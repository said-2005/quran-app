import InstallPWA from "@/components/InstallPWA";
import IosInstallPrompt from "@/components/IosInstallPrompt";
import Link from "next/link";

export default function Home() {
  const cards = [
    {
      title: "القرآن الكريم",
      href: "/quran",
      icon: "📖",
      color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    },
    {
      title: "الأذكار",
      href: "/adhkar",
      icon: "📚",
      color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    },
    {
      title: "السبحة",
      href: "/sibha",
      icon: "📿",
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    },
  ];

  return (
    <div className="min-h-[85vh] flex flex-col justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full px-4">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={`
              flex flex-col items-center justify-center p-8 rounded-2xl border-2
              transition-all duration-300 transform hover:scale-105 hover:shadow-xl
              relative z-10 cursor-pointer
              ${card.color}
            `}
          >
            <span className="text-6xl mb-6 filter drop-shadow-md">{card.icon}</span>
            <h2 className="text-2xl font-bold font-amiri min-w-[120px] text-center">{card.title}</h2>
          </Link>
        ))}
      </div>

      <InstallPWA />
      <IosInstallPrompt />
    </div>
  );
}
