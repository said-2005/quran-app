'use client';

import React from 'react';
import { useSettings } from '@/context/SettingsContext';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const { fontSize, setFontSize, showTranslation, setShowTranslation } = useSettings();

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 z-50 w-full max-w-sm mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Display Settings</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Font Size Control */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Arabic Font Size
                        </label>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">A</span>
                            <input
                                type="range"
                                min="24"
                                max="60"
                                step="2"
                                value={fontSize}
                                onChange={(e) => setFontSize(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                            />
                            <span className="text-xl text-gray-900 dark:text-white">A</span>
                        </div>
                        <div className="text-center mt-1 text-sm text-gray-500">{fontSize}px</div>
                    </div>

                    {/* Font Family Control */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Arabic Font Style
                        </label>
                        <select
                            value={useSettings().fontFamily}
                            onChange={(e) => useSettings().setFontFamily(e.target.value)}
                            className="w-full text-sm border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                        >
                            <option value="amiri">Amiri (Naskh)</option>
                            <option value="sans">System (Sans)</option>
                            {/* Add more fonts here as they are added to the project */}
                        </select>
                    </div>

                    {/* Translation Toggle */}
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Show Translation
                        </label>
                        <button
                            onClick={() => setShowTranslation(!showTranslation)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${showTranslation ? 'bg-emerald-600' : 'bg-gray-200'
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showTranslation ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
