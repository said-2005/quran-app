'use client';

import React, { useEffect, useState } from 'react';

interface TafsirDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    verseKey: string | null;
}

interface TafsirResponse {
    tafsir: {
        text: string;
        resource_name: string;
    };
}

const TafsirDrawer: React.FC<TafsirDrawerProps> = ({ isOpen, onClose, verseKey }) => {
    const [tafsir, setTafsir] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen && verseKey) {
            setLoading(true);
            setError(null);
            fetch(`https://api.quran.com/api/v4/tafsirs/16/by_ayah/${verseKey}`)
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
                        <h2 className="text-xl font-bold text-gray-900">Tafsir (Al-Muyassar)</h2>
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
