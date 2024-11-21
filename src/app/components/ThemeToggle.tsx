'use client';

import { useThemeStore } from '../stores/themeStore';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative flex items-center gap-2">
      <div className="relative w-[120px] h-8 bg-gray-800 rounded-full p-1">
        <div
          className={`absolute top-1 transition-transform duration-200 ease-out ${
            theme === 'light' ? 'translate-x-0' :
            theme === 'dark' ? 'translate-x-[40px]' :
            'translate-x-[80px]'
          }`}
        >
          <div className="w-6 h-6 bg-blue-400 rounded-full" />
        </div>
        <div className="relative flex justify-between px-1.5 text-xs">
          <button
            onClick={() => setTheme('light')}
            className={`z-10 ${theme === 'light' ? 'text-white' : 'text-gray-400'}`}
          >
            🌞
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`z-10 ${theme === 'dark' ? 'text-white' : 'text-gray-400'}`}
          >
            🌙
          </button>
          <button
            onClick={() => setTheme('system')}
            className={`z-10 ${theme === 'system' ? 'text-white' : 'text-gray-400'}`}
          >
            💻
          </button>
        </div>
      </div>
    </div>
  );
} 