'use client';

import React, { useState } from 'react';
import TafsirDrawer from './TafsirDrawer';

interface Verse {
  id: number;
  verse_key: string;
  text_uthmani: string;
}

interface VerseListProps {
  verses: Verse[];
}

const VerseList: React.FC<VerseListProps> = ({ verses }) => {
  const [selectedVerseKey, setSelectedVerseKey] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenTafsir = (verseKey: string) => {
    setSelectedVerseKey(verseKey);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-8 p-4 max-w-3xl mx-auto">
        {verses.map((verse) => (
          <div key={verse.id} className="text-right border-b border-gray-100 pb-6 last:border-0 group">
            <div className="flex items-start justify-between flex-row-reverse mb-4">
              <div className="flex-1">
                <p className="font-amiri text-3xl md:text-4xl leading-[2.5] text-gray-800">
                  {verse.text_uthmani}
                  <span className="inline-flex items-center justify-center w-10 h-10 mr-2 text-lg border border-gray-400 rounded-full font-sans text-gray-600 align-middle">
                    {verse.id}
                  </span>
                </p>
              </div>
              <button
                onClick={() => handleOpenTafsir(verse.verse_key)}
                className="mt-2 p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                title="Read Tafsir"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <TafsirDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        verseKey={selectedVerseKey}
      />
    </>
  );
};

export default VerseList;

