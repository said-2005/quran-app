'use client';

import React, { useState } from 'react';
import TafsirDrawer from './TafsirDrawer';
import { Verse } from '@/types';

interface VerseListProps {
  verses: Verse[];
}

import { useSettings } from '@/context/SettingsContext';
import { useUserData } from '@/context/UserDataContext';

const VerseList: React.FC<VerseListProps> = ({ verses }) => {
  const [selectedVerseKey, setSelectedVerseKey] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [noteInput, setNoteInput] = useState<{ [key: string]: string }>({});
  const [showNoteInput, setShowNoteInput] = useState<{ [key: string]: boolean }>({});

  const { fontSize, showTranslation, fontFamily } = useSettings();
  const { bookmarks, toggleBookmark, notes, saveNote, deleteNote } = useUserData();

  const handleOpenTafsir = (verseKey: string) => {
    setSelectedVerseKey(verseKey);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-8 p-4 md:px-8 max-w-3xl mx-auto">
        {verses.map((verse) => (
          <div key={verse.id} className="text-right border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0 group">
            <div className="flex items-start justify-between flex-row-reverse mb-4">
              <div className="flex-1">
                <p
                  className={`leading-[2.5] md:leading-[2.5] text-gray-800 dark:text-gray-100 transition-all duration-300 ${fontFamily === 'amiri' ? 'font-amiri' : 'font-sans'}`}
                  style={{ fontSize: `${fontSize}px`, fontFamily: fontFamily === 'amiri' ? 'var(--font-amiri)' : undefined }}
                >
                  {verse.text_uthmani}
                  <span className="inline-flex items-center justify-center w-10 h-10 mr-2 text-lg border border-gray-400 rounded-full font-sans text-gray-600 dark:text-gray-400 align-middle">
                    {verse.id}
                  </span>
                </p>
                {showTranslation && verse.translations && verse.translations[0] && (
                  <div className="mt-4 text-left text-lg text-gray-600 dark:text-gray-300 font-sans leading-relaxed" dir="ltr">
                    <div dangerouslySetInnerHTML={{ __html: verse.translations[0].text }} />
                  </div>
                )}

                {/* Notes Display */}
                {notes[verse.verse_key] && (
                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-sans">{notes[verse.verse_key]}</p>
                    <button
                      onClick={() => deleteNote(verse.verse_key)}
                      className="text-xs text-red-500 hover:text-red-700 mt-2"
                    >
                      Delete Note
                    </button>
                  </div>
                )}

                {/* Note Input */}
                {showNoteInput[verse.verse_key] && (
                  <div className="mt-4">
                    <textarea
                      value={noteInput[verse.verse_key] || notes[verse.verse_key] || ''}
                      onChange={(e) => setNoteInput({ ...noteInput, [verse.verse_key]: e.target.value })}
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="Add your note here..."
                      rows={3}
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => {
                          saveNote(verse.verse_key, noteInput[verse.verse_key]);
                          setShowNoteInput({ ...showNoteInput, [verse.verse_key]: false });
                        }}
                        className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setShowNoteInput({ ...showNoteInput, [verse.verse_key]: false })}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <button
                  onClick={() => toggleBookmark(verse.verse_key)}
                  className={`p-2 rounded-full transition-colors ${bookmarks.includes(verse.verse_key) ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' : 'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'}`}
                  title={bookmarks.includes(verse.verse_key) ? "Remove Bookmark" : "Add Bookmark"}
                  aria-label={bookmarks.includes(verse.verse_key) ? "Remove Bookmark" : "Add Bookmark"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill={bookmarks.includes(verse.verse_key) ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                  </svg>
                </button>
                <button
                  onClick={() => setShowNoteInput({ ...showNoteInput, [verse.verse_key]: !showNoteInput[verse.verse_key] })}
                  className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full transition-colors"
                  title="Add Note"
                  aria-label="Add Note"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </button>
                <button
                  onClick={() => handleOpenTafsir(verse.verse_key)}
                  className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full transition-colors"
                  title="Read Tafsir"
                  aria-label="Read Tafsir"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </button>
              </div>
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

