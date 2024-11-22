'use client';

import { useEffect } from 'react';
import BackgroundIcons from '../components/BackgroundIcons';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <BackgroundIcons />
      <div className="text-center relative z-10">
        <h2 className="text-2xl font-bold text-red-400 mb-4">
          Something went wrong!
        </h2>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg
                   hover:bg-blue-500/20 transition-all duration-200"
        >
          Try again
        </button>
      </div>
    </div>
  );
}