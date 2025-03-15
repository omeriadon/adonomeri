"use client";

import { useEffect, useState, useCallback, useMemo } from 'react';

export default function BackgroundIcons() {
  const [mounted, setMounted] = useState(false);
  const [positions, setPositions] = useState<Array<{ 
    x: number; 
    y: number;
    speedX: number;
    speedY: number;
  }>>([]);
  
  // Memoize icons array to prevent recreation on every render
  const floatingIcons = useMemo(() => [
    "bi-code-slash",
    "bi-braces",
    "bi-terminal",
    "bi-cpu",
    "bi-git",
    "bi-github",
    "bi-database",
    "bi-cloud",
    "bi-laptop",
    "bi-code-square",
    "bi-window",
    "bi-file-earmark-code",
    // Additional technology-related icons
    "bi-hdd",
    "bi-display",
    "bi-server",
    "bi-wifi",
    "bi-memory",
    "bi-motherboard",
    "bi-keyboard",
    "bi-diagram-3"
  ], []);

  // Optimize animation function with useCallback
  const updatePositions = useCallback(() => {
    setPositions(prev => prev.map(pos => {
      let newX = pos.x + pos.speedX;
      let newY = pos.y + pos.speedY;
      let newSpeedX = pos.speedX;
      let newSpeedY = pos.speedY;

      // Bounce off edges
      if (newX <= 0 || newX >= 100) {
        newSpeedX = -newSpeedX;
        newX = Math.max(0, Math.min(100, newX));
      }
      if (newY <= 0 || newY >= 100) {
        newSpeedY = -newSpeedY;
        newY = Math.max(0, Math.min(100, newY));
      }

      return {
        x: newX,
        y: newY,
        speedX: newSpeedX,
        speedY: newSpeedY
      };
    }));
  }, []);

  useEffect(() => {
    setMounted(true);
    // Initialize random positions and speeds
    setPositions(floatingIcons.map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      speedX: (Math.random() - 0.3) * 0.3, // Reduced speed for better performance
      speedY: (Math.random() - 0.3) * 0.3
    })));

    // Increase animation frame rate to 30ms for smoother motion
    const animationInterval = setInterval(updatePositions, 30);
    return () => clearInterval(animationInterval);
  }, [floatingIcons, updatePositions]);

  // Don't render anything on server or if not mounted
  if (!mounted) return null;

  // Limit the number of rendered icons based on screen size
  const renderedIcons = floatingIcons.slice(0, Math.min(floatingIcons.length, 10));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {renderedIcons.map((icon, index) => (
        <i key={index} 
           className={`bi ${icon} absolute text-blue-100/10 text-3xl`}
           style={{
             left: `${positions[index]?.x}%`,
             top: `${positions[index]?.y}%`,
             transform: 'translateZ(0)', // Hardware acceleration
             willChange: 'left, top', // Hint for browser optimization
           }}
        ></i>
      ))}
    </div>
  );
}