"use client";

import { useState, useEffect } from "react";

export default function IosInstallPrompt() {
    const [isIos, setIsIos] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
        const isStandaloneMode =
            window.matchMedia("(display-mode: standalone)").matches ||
            (window.navigator as any).standalone;

        setIsIos(isIosDevice);
        setIsStandalone(isStandaloneMode);

        // Show prompt if on iOS and not in standalone mode
        if (isIosDevice && !isStandaloneMode) {
            // Delay slightly to not annoy immediately
            const timer = setTimeout(() => setShowPrompt(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    if (!isIos || isStandalone || !showPrompt) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-8 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-transform duration-300 transform translate-y-0">
            <div className="max-w-md mx-auto flex flex-col items-center text-center space-y-4">
                <div className="flex justify-between w-full items-start">
                    <div className="text-left rtl:text-right">
                        <h3 className="font-bold text-lg text-emerald-600 dark:text-emerald-400">Install App</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">Install this app on your home screen for quick and offline access.</p>
                    </div>
                    <button onClick={() => setShowPrompt(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/50 p-3 rounded-xl w-full">
                    <span className="text-2xl">1️⃣</span>
                    <span>Tap the <span className="font-bold">Share</span> button <svg className="inline w-5 h-5 mx-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg> below</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/50 p-3 rounded-xl w-full">
                    <span className="text-2xl">2️⃣</span>
                    <span>Select <span className="font-bold">Add to Home Screen</span> <svg className="inline w-5 h-5 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg></span>
                </div>
                <div className="w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-zinc-200 dark:border-t-zinc-800 border-r-[10px] border-r-transparent absolute -bottom-2.5 left-1/2 -translate-x-1/2"></div>
            </div>
        </div>
    );
}
