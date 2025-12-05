import Header from "@/components/Header";
import SurahGrid from "@/components/SurahGrid";
import { Surah } from "@/types";
import { API_BASE_URL } from "@/lib/constants";

async function getSurahs(): Promise<Surah[]> {
  const res = await fetch(`${API_BASE_URL}/chapters`);
  if (!res.ok) {
    throw new Error("Failed to fetch surahs");
  }
  const data = await res.json();
  return data.chapters;
}

export default async function Home() {
  const surahs = await getSurahs();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <SurahGrid surahs={surahs} />
      </main>
    </div>
  );
}
