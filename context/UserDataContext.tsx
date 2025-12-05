'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserDataContextType {
    bookmarks: string[];
    toggleBookmark: (verseKey: string) => void;
    notes: Record<string, string>;
    saveNote: (verseKey: string, note: string) => void;
    deleteNote: (verseKey: string) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export function UserDataProvider({ children }: { children: React.ReactNode }) {
    const [bookmarks, setBookmarks] = useState<string[]>([]);
    const [notes, setNotes] = useState<Record<string, string>>({});
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedBookmarks = localStorage.getItem('quran-bookmarks');
        const savedNotes = localStorage.getItem('quran-notes');

        if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
        if (savedNotes) setNotes(JSON.parse(savedNotes));
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('quran-bookmarks', JSON.stringify(bookmarks));
            localStorage.setItem('quran-notes', JSON.stringify(notes));
        }
    }, [bookmarks, notes, mounted]);

    const toggleBookmark = (verseKey: string) => {
        setBookmarks((prev) =>
            prev.includes(verseKey)
                ? prev.filter((k) => k !== verseKey)
                : [...prev, verseKey]
        );
    };

    const saveNote = (verseKey: string, note: string) => {
        setNotes((prev) => ({ ...prev, [verseKey]: note }));
    };

    const deleteNote = (verseKey: string) => {
        setNotes((prev) => {
            const newNotes = { ...prev };
            delete newNotes[verseKey];
            return newNotes;
        });
    };

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <UserDataContext.Provider value={{ bookmarks, toggleBookmark, notes, saveNote, deleteNote }}>
            {children}
        </UserDataContext.Provider>
    );
}

export function useUserData() {
    const context = useContext(UserDataContext);
    if (context === undefined) {
        throw new Error('useUserData must be used within a UserDataProvider');
    }
    return context;
}
