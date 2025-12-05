'use client';

import React, { useEffect, useState } from 'react';
import { TafsirResponse } from '@/types';
import { API_BASE_URL } from '@/lib/constants';

interface TafsirDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    verseKey: string | null;
}

const TafsirDrawer: React.FC<TafsirDrawerProps> = ({ isOpen, onClose, verseKey }) => {
    const [tafsir, setTafsir] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen && verseKey) {
            setLoading(true);
            setError(null);
            fetch(`${API_BASE_URL}/tafsirs/16/by_ayah/${verseKey}`)
                .then((res) => {
                    if (!res.ok) throw new Error('Failed to fetch Tafsir');
                    return res.json();
                })
                .then((data: TafsirResponse) => {
                    setTafsir(data.tafsir.text);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setError('Failed to load Tafsir. Please try again.');
                    setLoading(false);
                });
        }
    }, [isOpen, verseKey]);

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Tafsir</h2>
                            <select
                                value={selectedTafsirId}
                                onChange={(e) => setSelectedTafsirId(Number(e.target.value))}
                                className="text-sm border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                            >
                                {TAFSIR_OPTIONS.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {loading && (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                        </div>
                    )}

                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                            {error}
                        </div>
                    )}

                    {tafsir && !loading && (
                        <div className="prose prose-lg max-w-none font-amiri leading-loose text-gray-800">
                            <div dangerouslySetInnerHTML={{ __html: tafsir }} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default TafsirDrawer;
