"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    // Force component to remount and replay animation
    setKey(prev => prev + 1);
  }, [pathname]);
  
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, // Reduced from 0.5 to 0.3
        ease: "easeInOut" 
      }}
      style={{
        willChange: "opacity, transform",  // Hint for browser optimization
        // Hardware acceleration
        transform: "translateZ(0)"
      }}
    >
      {children}
    </motion.div>
  );
}