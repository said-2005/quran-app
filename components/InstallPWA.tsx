"use client";
import { useEffect, useState } from "react";

export default function InstallPWA({ children }: { children?: React.ReactNode }) {
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState<any>(null);

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault();
            console.log("we are being triggered :D");
            setSupportsPWA(true);
            setPromptInstall(e);
        };
        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const onClick = (evt: any) => {
        evt.preventDefault();
        if (!promptInstall) {
            return;
        }
        promptInstall.prompt();
    };

    if (!supportsPWA) {
        return null;
    }

    if (children) {
        return (
            <div onClick={onClick} className="pointer-events-auto cursor-pointer">
                {children}
            </div>
        );
    }

    return (
        <button
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-2xl z-50 font-bold animate-bounce hover:bg-blue-700 transition pointer-events-auto"
            id="setup_button"
            aria-label="Install app"
            title="Install app"
            onClick={onClick}
        >
            📥 تثبيت التطبيق
        </button>
    );
}
