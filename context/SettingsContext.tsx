'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface SettingsContextType {
    fontSize: number;
    setFontSize: (size: number) => void;
    showTranslation: boolean;
    setShowTranslation: (show: boolean) => void;
    fontFamily: string;
    setFontFamily: (font: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [fontSize, setFontSize] = useState(36);
    const [showTranslation, setShowTranslation] = useState(false);
    const [fontFamily, setFontFamily] = useState('amiri');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedFontSize = localStorage.getItem('quran-font-size');
        const savedShowTranslation = localStorage.getItem('quran-show-translation');
        const savedFontFamily = localStorage.getItem('quran-font-family');

        if (savedFontSize) setFontSize(parseInt(savedFontSize));
        if (savedShowTranslation) setShowTranslation(savedShowTranslation === 'true');
        if (savedFontFamily) setFontFamily(savedFontFamily);
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('quran-font-size', fontSize.toString());
            localStorage.setItem('quran-show-translation', showTranslation.toString());
            localStorage.setItem('quran-font-family', fontFamily);
        }
    }, [fontSize, showTranslation, fontFamily, mounted]);



    return (
        <SettingsContext.Provider value={{ fontSize, setFontSize, showTranslation, setShowTranslation, fontFamily, setFontFamily }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
