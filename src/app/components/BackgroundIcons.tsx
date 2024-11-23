"use client";

import { useEffect, useState } from 'react';

export default function BackgroundIcons() {
  const [mounted, setMounted] = useState(false);
  const [positions, setPositions] = useState<Array<{ 
    x: number; 
    y: number;
    speedX: number;
    speedY: number;
  }>>([]);
  
  const floatingIcons = [
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
    "bi-diagram-3",
    "bi-bug",
    "bi-command",
    "bi-keyboard",
    "bi-mouse",
    "bi-router",
    "bi-server",
    "bi-gpu-card",
    "bi-motherboard",
    "bi-pc-display",
    "bi-phone",
    "bi-tablet"
  ];

  useEffect(() => {
    setMounted(true);
    // Initialize random positions and speeds
    setPositions(floatingIcons.map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      speedX: (Math.random() - 0.5) * 0.2, // Random speed between -0.1 and 0.1
      speedY: (Math.random() - 0.5) * 0.2
    })));

    // Continuous animation
    const animate = () => {
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
    };

    const animationInterval = setInterval(animate, 50);

    return () => clearInterval(animationInterval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingIcons.map((icon, index) => (
        <i key={index} 
           className={`bi ${icon} absolute text-blue-100/10 text-3xl`}
           style={{
             left: `${positions[index]?.x}%`,
             top: `${positions[index]?.y}%`,
             transition: 'all 0.5s linear'
           }}
        ></i>
      ))}
    </div>
  );
} 