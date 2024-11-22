"use client";

import { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function BackgroundIcons() {
  const [mounted, setMounted] = useState(false);
  const [positions, setPositions] = useState<Array<{x: number, y: number}>>([]);

  useEffect(() => {
    setMounted(true);
    // Initial positions
    setPositions(generatePositions());

    // Update positions every 3 seconds
    const interval = setInterval(() => {
      setPositions(generatePositions());
    }, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const floatingIcons = [
    "bi-code-square", "bi-journal-text", "bi-tools", 
    "bi-github", "bi-envelope", "bi-clock-history",
    "bi-house", "bi-twitter-x", "bi-linkedin",
    "bi-braces", "bi-bug", "bi-cpu",
    "bi-database", "bi-diagram-3", "bi-display",
    "bi-file-earmark-code", "bi-gear", "bi-graph-up",
    "bi-terminal", "bi-window-stack", "bi-boxes",
    "bi-layers", "bi-magic", "bi-puzzle",
  ];

  const generatePositions = () => {
    const gridSize = Math.ceil(Math.sqrt(floatingIcons.length));
    const cellSize = 100 / gridSize;
    
    return floatingIcons.map((_, index) => {
      const row = Math.floor(index / gridSize);
      const col = index % gridSize;
      const xOffset = (Math.random() * 0.5 + 0.25) * cellSize;
      const yOffset = (Math.random() * 0.5 + 0.25) * cellSize;
      
      return {
        x: col * cellSize + xOffset,
        y: row * cellSize + yOffset
      };
    });
  };

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingIcons.map((icon, index) => (
        <i key={index} 
           className={`bi ${icon} absolute text-blue-400/10 text-4xl transition-all duration-[3000ms]`}
           style={{
             left: `${positions[index]?.x}%`,
             top: `${positions[index]?.y}%`,
           }}
        ></i>
      ))}
    </div>
  );
} 