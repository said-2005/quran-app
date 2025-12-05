'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AudioResponse } from '@/types';
import { API_BASE_URL, RECITER_OPTIONS } from '@/lib/constants';

interface AudioPlayerProps {
    chapterId: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ chapterId }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [selectedReciterId, setSelectedReciterId] = useState(RECITER_OPTIONS[0].id);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch audio URL
        console.log(`Fetching audio for chapter ${chapterId} with reciter ${selectedReciterId}`);
        setError(null);
        fetch(`${API_BASE_URL}/chapter_recitations/${selectedReciterId}/${chapterId}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch audio');
                return res.json();
            })
            .then((data: AudioResponse) => {
                setAudioUrl(data.audio_file.audio_url);
            })
            .catch((err) => {
                console.error('Failed to fetch audio', err);
                setError('Failed to load audio. Please try another reciter.');
            });
    }, [chapterId, selectedReciterId]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const newTime = audioRef.current.currentTime;
            // Only update state if the second has changed to reduce re-renders
            if (Math.floor(newTime) !== Math.floor(currentTime)) {
                setCurrentTime(newTime);
            }
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (!audioUrl) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg p-4 z-30">
            <div className="container mx-auto max-w-3xl flex flex-col gap-2">
                {error && (
                    <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-2 rounded">
                        {error}
                    </div>
                )}
                <div className="flex items-center gap-4">
                    <select
                        value={selectedReciterId}
                        onChange={(e) => setSelectedReciterId(Number(e.target.value))}
                        className="text-sm border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none max-w-[150px]"
                    >
                        {RECITER_OPTIONS.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={togglePlay}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-md"
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                            </svg>
                        )}
                    </button>

                    <div className="flex-1 flex flex-col">
                        <input
                            type="range"
                            min="0"
                            max={duration}
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1 font-mono">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    <audio
                        ref={audioRef}
                        src={audioUrl || ''}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={() => setIsPlaying(false)}
                    />
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
