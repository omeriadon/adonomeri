"use client";

import { useEffect, useRef } from 'react';

interface IconRendererProps {
  iconName: string;
  color: string;
  size: number;
  onRenderAction: (dataUrl: string) => void;
}

export default function IconRenderer({ iconName, color, size, onRenderAction }: IconRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create the icon element
    containerRef.current.innerHTML = '';
    const iconEl = document.createElement('i');
    iconEl.className = iconName;
    iconEl.style.color = color;
    iconEl.style.fontSize = `${size}px`;
    containerRef.current.appendChild(iconEl);

    // Convert to image data URL
    // For a real implementation, you would use html2canvas or similar library
    // This is a simplified placeholder
    onRenderAction('');
  }, [iconName, color, size, onRenderAction]);

  return <div ref={containerRef} className="hidden" />;
}
