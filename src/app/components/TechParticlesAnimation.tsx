"use client";

import { useEffect, useRef } from 'react';

export default function TechParticlesAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      text: string;
      category: string;

      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.size = Math.random() * 15 + 5;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;

        // Randomly select a category
        const categories = ["swiftui", "cisco", "bootstrap", "apple", "tech"];
        this.category = categories[Math.floor(Math.random() * categories.length)];

        // Set color and text based on category
        switch (this.category) {
          case "swiftui":
            this.color = "rgba(59, 130, 246, 0.3)"; // Light blue matching your theme
            this.text = getRandomSwiftUISnippet();
            break;
          case "cisco":
            this.color = "rgba(59, 130, 246, 0.3)"; // Blue matching your theme
            this.text = getRandomCiscoSnippet();
            break;
          case "bootstrap":
            this.color = "rgba(59, 130, 246, 0.3)"; // Darker blue matching your theme
            this.text = getRandomBootstrapSnippet();
            break;
          case "apple":
            this.color = "rgba(59, 130, 246, 0.3)"; // Very light blue matching your theme
            this.text = getRandomAppleSnippet();
            break;
          case "tech":
            this.color = "rgba(59, 130, 246, 0.3)"; // Pale blue matching your theme
            this.text = getRandomTechSnippet();
            break;
          default:
            this.color = "rgba(59, 130, 246, 0.3)";
            this.text = getRandomTechSnippet();
        }
      }

      update() {
        if (!canvas) return;
        
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }

        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.font = `${this.size}px monospace`;
        ctx.fillText(this.text, this.x, this.y);
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
        "show ip route", "conf t", "interface g0/0", "router ospf", "switchport mode trunk",
        "ip address", "no shutdown", "vlan 10", "spanning-tree", "access-list", "route-map",
        "bgp neighbor", "eigrp", "mpls", "qos", "acl", "router(config)#", "enable", 
        "copy run start", "show vlan", "show cdp neighbor", "show version", "ping", "traceroute",
        "telnet", "ssh", "console"
      ];
      return snippets[Math.floor(Math.random() * snippets.length)];
    }

    function getRandomBootstrapSnippet() {
      const snippets = [
        "container", "row", "col", "btn", "card", "navbar", "modal", "form-control", "table",
        "alert", "badge", "carousel", "dropdown", "jumbotron", "list-group", "pagination",
        "text-primary", "bg-dark", "border", "d-flex", "justify-content-center", 
        "align-items-center", "mt-3", "p-2", "shadow", "rounded"
      ];
      return snippets[Math.floor(Math.random() * snippets.length)];
    }

    function getRandomAppleSnippet() {
      const snippets = [
        "macOS", "iOS", "iPadOS", "watchOS", "tvOS", "iPhone", "iPad", "Mac", "Apple Watch",
        "AirPods", "MacBook Pro", "iMac", "Mac mini", "Mac Studio", "Swift", "Objective-C",
        "Xcode", "App Store", "iCloud", "Apple ID", "FaceTime", "iMessage", "Apple Music",
        "Apple TV+", "Apple Arcade", "HomeKit", "HealthKit", "ARKit", "CoreML"
      ];
      return snippets[Math.floor(Math.random() * snippets.length)];
    }

    function getRandomTechSnippet() {
      const snippets = [
        "HTML", "CSS", "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java",
        "C++", "Rust", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Git", "GitHub", "CI/CD",
        "DevOps", "Agile", "REST API", "GraphQL", "MongoDB", "PostgreSQL", "TensorFlow",
        "Machine Learning", "Blockchain", "IoT", "AR/VR", "5G", "Cloud Computing"
      ];
      return snippets[Math.floor(Math.random() * snippets.length)];
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 18000));

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 180)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 to-gray-800"
    />
  );
}
