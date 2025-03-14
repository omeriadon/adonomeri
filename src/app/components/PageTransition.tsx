"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [key, setKey] = useState(0);
  
  // Use useCallback to prevent recreation of this function
  const updateKey = useCallback(() => {
    setKey(prev => prev + 1);
  }, []);

  useEffect(() => {
    // Use RAF to avoid layout thrashing
    let frame = requestAnimationFrame(() => {
      updateKey();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, updateKey]);
  
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 10 }} // Reduced y distance
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, // Reduced duration
        ease: "easeOut" // Simpler easing function
      }}
      style={{
        willChange: "opacity, transform", 
        transform: "translateZ(0)"
      }}
    >
      {children}
    </motion.div>
  );
}