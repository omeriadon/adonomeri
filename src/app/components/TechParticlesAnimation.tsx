"use client";

import { useEffect, useRef } from 'react';
// Import Bootstrap Icons font
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function TechParticlesAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Handle high-DPI displays to prevent warping
    const devicePixelRatio = window.devicePixelRatio || 1;
    
    // Set canvas dimensions with pixel ratio adjustment
    const setCanvasDimensions = () => {
      if (canvas) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Set display size
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        
        // Set actual size scaled by pixel ratio
        canvas.width = width * devicePixelRatio;
        canvas.height = height * devicePixelRatio;
        
        // Scale all drawing operations by pixel ratio
        ctx.scale(devicePixelRatio, devicePixelRatio);
      }
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Function to detect mobile device
    const isMobileDevice = () => {
      return window.innerWidth <= 768 || 
             /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    
    const isMobile = isMobileDevice();

    // Function to generate random colors
    const getRandomColor = (opacity = 0.6) => {
      // Use low red values, and higher green/blue values for blue-green palette
      const r = Math.floor(Math.random() * 30); // Keep red very low
      const g = Math.floor(Math.random() * 156) + 100; // Medium to high green (100-255)
      const b = Math.floor(Math.random() * 156) + 100; // Medium to high blue (100-255)
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    // Bootstrap icon mappings (class to unicode)
    const bootstrapIconsMap: Record<string, string> = {
        'app': '\uF3B0',
        'app-indicator': '\uF3B1',
        'apple': '\uF3B2',
        'arrow-left-right': '\uF3B3',
        'at': '\uF3B4',
        'badge-4k': '\uF3B5',
        'badge-8k': '\uF3B6',
        'badge-hd': '\uF3B7',
        'bluetooth': '\uF3B8',
        'broadcast': '\uF3B9',
        'browser-chrome': '\uF3BA',
        'browser-edge': '\uF3BB',
        'browser-firefox': '\uF3BC',
        'browser-safari': '\uF3BD',
        'cast': '\uF3BE',
        'chat-dots': '\uF3BF',
        'chat-left-text': '\uF3C0',
        'cloud-arrow-down': '\uF3C1',
        'cloud-arrow-up': '\uF3C2',
        'code-slash': '\uF3C3',
        'command': '\uF3C4',
        'cpu': '\uF3C5',
        'cpu-fill': '\uF3C6',
        'device-hdd': '\uF3C7',
        'device-ssd': '\uF3C8',
        'diagram-3': '\uF3C9',
        'display': '\uF3CA',
        'download': '\uF3CB',
        'ethernet': '\uF3CC',
        'file-binary': '\uF3CD',
        'file-code': '\uF3CE',
        'file-earmark-code': '\uF3CF',
        'folder-symlink': '\uF3D0',
        'gear-wide-connected': '\uF3D1',
        'github': '\uF3D2',
        'globe': '\uF3D3',
        'globe2': '\uF3D4',
        'hdd-network': '\uF3D5',
        'hdd-rack': '\uF3D6',
        'headset': '\uF3D7',
        'keyboard': '\uF3D8',
        'laptop': '\uF3D9',
        'modem': '\uF3DA',
        'motherboard': '\uF3DB',
        'mouse': '\uF3DC',
        'pc-display': '\uF3DD',
        'router': '\uF3DE',
        'server': '\uF3DF',
        'sim': '\uF3E0',
        'speaker': '\uF3E1',
        'terminal': '\uF3E2',
        'usb-drive': '\uF3E3',
        'wifi': '\uF3E4',
        'window': '\uF3E5'

    };

    // Function to get a random Bootstrap icon unicode
    function getRandomBootstrapIcon() {
      const iconKeys = Object.keys(bootstrapIconsMap);
      const randomKey = iconKeys[Math.floor(Math.random() * iconKeys.length)];
      return {
        key: randomKey,
        unicode: bootstrapIconsMap[randomKey]
      };
    }


    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      text: string;
      isBootstrapIcon: boolean;
      unicodeIcon: string;
      category: string;
      baseSize: number; // Store the original base size

      constructor() {
        this.x = Math.random() * (window.innerWidth);
        this.y = Math.random() * (window.innerHeight);
        
        // Apply fixed font sizes with smaller sizes for mobile
        if (isMobile) {
          // Even smaller icons for mobile
          this.size = Math.random() * 6 + 4; // 4-10px for regular text on mobile
        } else {
          // Normal sizes for desktop
          this.size = Math.random() * 12 + 8; // 8-20px for regular text on desktop
        }
        
        this.baseSize = this.size; // Store the base size for reference
        this.speedX = (Math.random() - 0.5) * 2; // Increased speed for better bounce
        this.speedY = (Math.random() - 0.5) * 2; // Increased speed for better bounce
        this.isBootstrapIcon = false;
        this.unicodeIcon = '';

        // Randomly select a category
        const categories = ["swiftui", "cisco", "bootstrap", "apple", "tech", "bootstrap-icons"];
        this.category = categories[Math.floor(Math.random() * categories.length)];

        // Set random color for each particle
        this.color = getRandomColor();
        
        // Make Bootstrap icons larger but still consider device type
        if (this.category === "bootstrap-icons") {
          if (isMobile) {
            this.size = Math.random() * 7 + 6; // 6-13px for icons on mobile - smaller than before
          } else {
            this.size = Math.random() * 16 + 12; // 12-28px for icons on desktop
          }
          this.baseSize = this.size;
        }

        // Set text based on category
        switch (this.category) {
          case "swiftui":
            this.text = getRandomSwiftUISnippet();
            break;
          case "cisco":
            this.text = getRandomCiscoSnippet();
            break;
          case "apple":
            this.text = getRandomAppleSnippet();
            break;
          case "tech":
            this.text = getRandomTechSnippet();
            break;
          case "bootstrap-icons":
            const icon = getRandomBootstrapIcon();
            this.text = icon.key; // For reference only
            this.unicodeIcon = icon.unicode;
            this.isBootstrapIcon = true;
            break;
          default:
            this.text = getRandomTechSnippet();
        }
      }

      update() {
        if (!canvas || !ctx) return;
        
        this.x += this.speedX;
        this.y += this.speedY;

        // Calculate text width for better bounce physics
        if (this.isBootstrapIcon) {
          // Use a more precise rendering for Bootstrap icons
          ctx.font = `${this.size}px "bootstrap-icons"`;
        } else {
          ctx.font = `${this.size}px monospace`;
        }
          
        const displayText = this.isBootstrapIcon ? this.unicodeIcon : this.text;
        const textMetrics = ctx.measureText(displayText);
        
        // For x-axis, we need the full text width since text is drawn from left to right
        const textWidth = textMetrics.width;
        
        // For y-axis, text is drawn from baseline up, so we need font height
        // This is an approximation since Canvas doesn't provide exact height
        const fontHeight = this.size;
        
        // Right edge - bounce when the full text width would exceed the canvas
        if (this.x + textWidth > window.innerWidth) {
          this.speedX = -Math.abs(this.speedX); // Force negative (leftward) speed
          this.x = window.innerWidth - textWidth; // Place text fully on screen
        }
        
        // Left edge - bounce when text position is negative
        if (this.x < 0) {
          this.speedX = Math.abs(this.speedX); // Force positive (rightward) speed
          this.x = 0; // Place at left edge
        }
        
        // Bottom edge - text is drawn above baseline, so check if baseline exceeds canvas height
        if (this.y > canvas.height) {
          this.speedY = -Math.abs(this.speedY); // Force negative (upward) speed
          this.y = canvas.height; // Place at bottom edge
        }
        
        // Top edge - bounce when top of text (baseline - font height) goes above canvas
        if (this.y - fontHeight < 0) {
          this.speedY = Math.abs(this.speedY); // Force positive (downward) speed
          this.y = fontHeight; // Place so that text is fully visible
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        
        if (this.isBootstrapIcon) {
          // Precise font specification for Bootstrap Icons
          ctx.font = `${this.size}px "bootstrap-icons"`;
          ctx.textBaseline = 'middle';
          ctx.fillText(this.unicodeIcon, this.x, this.y);
        } else {
          // Regular text rendering
          ctx.font = `${this.size}px monospace`;
          ctx.textBaseline = 'alphabetic';
          ctx.fillText(this.text, this.x, this.y);
        }
      }
    }

    // Helper functions for different categories
    function getRandomSwiftUISnippet() {
      const snippets = [
        "VStack", "HStack", "ZStack", "List", "ForEach", "@State", "@Binding", "@ObservedObject",
        "@EnvironmentObject", "NavigationView", "TabView", "ScrollView", "LazyVGrid", "Text", "Image", 
        "Button", "Toggle", "Slider", "Color.blue", "Font.system", "Spacer()", ".padding()", 
        ".frame()", ".background()", ".cornerRadius()", ".shadow()", "SwiftUI", "View", 
        "some View", "PreviewProvider"
      ];
      return snippets[Math.floor(Math.random() * snippets.length)];
    }

    function getRandomCiscoSnippet() {
const snippets = [
  // Cisco IOS
  "show ip route",
  "conf t",
  "interface g0/0",
  "router ospf",
  "switchport mode trunk",
  "ip address",
  "no shutdown",
  
  // General Networking
  "subnet mask",
  "default gateway",
  "DHCP",
  "DNS",
  "firewall",
  "NAT",
  "VPN",
  "VLAN",
  
  // Routing Protocols
  "TCP",
  "IP",
  "IPv6",
  "IPv4",
  "IS-IS",
  
  // Network Tools
  "ping",
  "traceroute",
  "nslookup",
  "ipconfig",
  "ifconfig",
  "netstat",
  "tcpdump",
  "wireshark",
  
  // Network Security
  "ACL",
  "port security",
  "SSH",
  "TLS/SSL",
  "certificate",
  "encryption",
  
  // Network Types
  "LAN",
  "WAN",
  "MAN",
  "WLAN",
  
  // Network Hardware
  "router",
  "switch",
  "hub",
  "bridge",
  "access point",
  "firewall",
  "modem",
  
  // Miscellaneous
  "QoS",
  "MPLS",
  "IPsec",
  "MTU",
  "latency",
  "throughput",
  "jitter",
  "packet loss"
];
      return snippets[Math.floor(Math.random() * snippets.length)];
    }


    function getRandomAppleSnippet() {
      const snippets = [
        "macOS",
        "iOS",
        "iPadOS",
        "watchOS",
        "tvOS",
        "iPhone",
        "iPad",
        "Mac",
        "Apple Watch",
        "AirPods",
        "MacBook Pro",
        "iMac",
        "Mac mini",
        "Mac Studio",
        "Swift",
        "Objective-C",
        "Xcode",
        "App Store",
        "iCloud",
        "Apple ID",
        "FaceTime",
        "iMessage",
        "Apple Music",
        "Apple TV+",
        "Apple Arcade",
        "HomeKit",
        "HealthKit",
        "ARKit",
        "CoreML"
      ];
      return snippets[Math.floor(Math.random() * snippets.length)];
    }

    function getRandomTechSnippet() {
      const snippets = [
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "Python",
        "Java",
        "C++",
        "Rust",
        "Docker",
        "Kubernetes",
        "AWS",
        "Azure",
        "GCP",
        "Git",
        "GitHub",
        "CI/CD",
        "DevOps",
        "Agile",
        "REST API",
        "GraphQL",
        "MongoDB",
        "PostgreSQL",
        "TensorFlow",
        "Machine Learning",
        "Blockchain",
        "IoT",
        "AR/VR",
        "5G",
        "Cloud Computing",
        "Quantum Computing",
        "Cybersecurity",
        "Artificial Intelligence",
        "Deep Learning",
        "Data Science",
        "Big Data",
        "Hadoop",
        "Spark",
        "Serverless",
        "Microservices",
        "Progressive Web Apps",
        "WebAssembly",
        "Edge Computing",
        "Neural Networks",
        "Computer Vision",
        "Natural Language Processing",
        "Robotics",
        "Bioinformatics",
        "3D Printing",
        "Digital Twin",
        "Web3",
        "NFT",
        "Cryptocurrency",
        "Smart Contracts",
        "Augmented Reality",
        "Virtual Reality",
        "Mixed Reality",
        "LiDAR",
        "RFID",
        "Biometrics",
        "Metaverse",
        "Zero Trust Security",
      ];
      return snippets[Math.floor(Math.random() * snippets.length)];
    }

    // Create particles
    const particles: Particle[] = [];
    
    // Adjust particle count for mobile
    let particleCount;
    if (isMobile) {
      particleCount = Math.min(20, Math.floor((canvas.width * canvas.height) / 25000));
    } else {
      particleCount = Math.min(40, Math.floor((canvas.width * canvas.height) / 15000));
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Optimized animation loop for better frame rate
    let lastTime = 0;
    const fps = 60; // Target frames per second
    const frameInterval = 1000 / fps;

    function animate(currentTime: number) {
      if (!ctx || !canvas) return;
      
      const deltaTime = currentTime - lastTime;
      
      // Only update if enough time has passed for the next frame
      if (deltaTime >= frameInterval) {
        // Update lastTime, accounting for the extra time that has passed
        lastTime = currentTime - (deltaTime % frameInterval);
        
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        // Update and draw particles
        particles.forEach((particle) => {
          particle.update();
          particle.draw();
        });

        // Draw connections with more contrast
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Adjusted connection distance for mobile
            const maxDistance = isMobile ? 120 : 180;

            if (distance < maxDistance) {
              ctx.beginPath();
              // Higher opacity and thicker lines for more contrast
              ctx.strokeStyle = `rgba(100, 200, 255, ${0.4 * (1 - distance / maxDistance)})`;
              ctx.lineWidth = isMobile ? 0.8 : 1.2;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full blur-[1px] h-full"
      style={{ 
        margin: 0, 
        padding: 0,
        fontSmooth: 'always',
        WebkitFontSmoothing: 'antialiased',
      }}
    />
  );
}
