import React from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="bg-emerald-600 dark:bg-emerald-800 text-white p-4 shadow-md transition-colors">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quran App</h1>
        <ThemeToggle />
      </div>
    </header>
  );
}
