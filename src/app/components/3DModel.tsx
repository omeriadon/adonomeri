"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function ThreeDModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number | null>(null);
  // Store icon rotation angles
  const iconRotations = useRef<number[]>([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear container
    container.innerHTML = '';

    // Initialize scene
    const scene = new THREE.Scene();
    
    // Setup camera with wider field of view and further back position
    const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 40; // Move camera even further back
    camera.position.y = 8;  // Lower the camera slightly
    camera.lookAt(0, 0, 0);

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Add CSS blur filter to the renderer's canvas
    renderer.domElement.style.filter = 'blur(3px)';
    
    // Create a container for the actual content (without blur)
    const contentContainer = document.createElement('div');
    contentContainer.style.position = 'absolute';
    contentContainer.style.top = '0';
    contentContainer.style.left = '0';
    contentContainer.style.width = '100%';
    contentContainer.style.height = '100%';
    contentContainer.style.pointerEvents = 'none';
    container.appendChild(contentContainer);
    
    // Create a new renderer for the sharp content
    const sharpRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    sharpRenderer.setSize(container.clientWidth, container.clientHeight);
    sharpRenderer.setClearColor(0x000000, 0);
    contentContainer.appendChild(sharpRenderer.domElement);

    // Setup controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false; // Disable dragging completely
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.enableZoom = false; // Disable zooming completely
    controls.minDistance = 20; // These settings won't matter since zoom is disabled
    controls.maxDistance = 60; // These settings won't matter since zoom is disabled
    
    // Create a group for the cube to enable rotation of the entire cube
    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Calculate cube dimensions with larger margin - TRIPLED SIZE
    const planeSize = 12; // Slightly reduce plane size from 13.5
    const pixelToUnitRatio = 512 / planeSize; // Assuming canvas is 512px
    const marginInUnits = 150 / pixelToUnitRatio; // Increased from 50px to 150px margin to keep proportions
    const facePosition = (planeSize / 2) + (marginInUnits / 2); // Position with margin

    // Store references to the planes for updating textures
    const planes: THREE.Mesh[] = [];
    const textures: THREE.CanvasTexture[] = [];

    // Function to create a plane with an icon texture
    const createPlaneWithIcon = (iconClass: string, position: THREE.Vector3, rotation: THREE.Euler, index: number) => {
      // Create a canvas for the icon
      const canvas = document.createElement('canvas');
      canvas.width = 1024; // Doubled canvas size for better quality
      canvas.height = 1024;
      
      // Create the texture now but we'll update it in animation loop
      const texture = new THREE.CanvasTexture(canvas);
      textures.push(texture);
      
      // Draw initial icon
      updateIconCanvas(canvas, iconClass, 0, index);
      
      const material = new THREE.MeshBasicMaterial({ 
        map: texture, 
        transparent: true,
        side: THREE.DoubleSide
      });
      
      const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
      const plane = new THREE.Mesh(planeGeometry, material);
      plane.name = `plane-${iconClass}`;
      
      plane.position.copy(position);
      plane.rotation.copy(rotation);
      
      // Add to planes array
      planes.push(plane);
      
      return plane;
    };
    
    // Function to update the canvas with rotating icons
    const updateIconCanvas = (canvas: HTMLCanvasElement, iconClass: string, rotationAngle: number, index: number) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background - medium green with 15% opacity
      ctx.fillStyle = 'rgba(75, 180, 75, 0.15)';
      ctx.beginPath();
      ctx.roundRect(0, 0, canvas.width, canvas.height, 40); // Larger rounded corners
      ctx.fill();
      
      // Save context before rotation
      ctx.save();
      
      // Move to center of canvas for rotation
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rotationAngle);
      
      // Draw icon with rotation
      ctx.fillStyle = '#ffffff'; // White icon
      
      // SVG path data for Bootstrap icons - these are the actual Bootstrap icon paths
      const svgPaths: {[key: string]: {path: string, viewBox?: string, scale?: number}} = {
        'bi-braces-asterisk': {
          path: 'M1.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C2.25 2 1.49 2.759 1.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6M14.886 7.9v.164c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456v-1.3c-1.114 0-1.49-.362-1.49-1.456V4.352C14.51 2.759 13.75 2 12.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6M7.5 11.5V9.207l-1.621 1.621-.707-.707L6.792 8.5H4.5v-1h2.293L5.172 5.879l.707-.707L7.5 6.792V4.5h1v2.293l1.621-1.621.707.707L9.208 7.5H11.5v1H9.207l1.621 1.621-.707.707L8.5 9.208V11.5z',
          viewBox: '0 0 16 16',
          scale: 30
        },
        'bi-wifi': {
          // Updated with the correct WiFi icon paths combinedly formatted with no spaces in the middle of commands
          path: 'M15.384 6.115a.485.485 0 0 0-.047-.736A12.44 12.44 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.52.52 0 0 0 .668.05A11.45 11.45 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164.205.148.49.13.668-.049 M13.229 8.271a.482.482 0 0 0-.063-.745A9.46 9.46 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.576 1.336c.206.132.48.108.653-.065 M11.046 10.454c.226-.226.185-.605-.1-.75A6.5 6.5 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09A5.5 5.5 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.61-.091z M9.06 12.44c.196-.196.198-.52-.04-.66A2 2 0 0 0 8 11.5a2 2 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .707 0l.707-.707z',
          viewBox: '0 0 16 16',
          scale: 28
        },
        'bi-cpu': {
          path: 'M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z',
          viewBox: '0 0 16 16',
          scale: 30
        },
        'bi-robot': {
          path: 'M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z',
          viewBox: '0 0 16 16',
          scale: 30
        },
        'bi-apple': {
          path: 'M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43z',
          viewBox: '0 0 16 16',
          scale: 35
        },
        'bi-code-square': {
          path: 'M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z M6.854 4.646a.5.5 0 0 1 0 .708L4.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0zm2.292 0a.5.5 0 0 0 0 .708L11.793 8l-2.647 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708 0z',
          viewBox: '0 0 16 16',
          scale: 30
        }
      };
      
      // Helper function to draw SVG path on canvas
      const drawSvgPath = (path: string, viewBox: string = '0 0 16 16', scale: number = 30) => {
        const [minX, minY, width, height] = viewBox.split(' ').map(Number);
        
        // Calculate scale to fit within a reasonable portion of the canvas
        const size = Math.min(canvas.width, canvas.height) / scale;
        
        ctx.save();
        
        // Scale and center the path
        ctx.scale(size, size);
        ctx.translate(-minX - width/2, -minY - height/2);
        
        // Create path from SVG path data
        const path2D = new Path2D(path);
        ctx.fill(path2D);
        
        ctx.restore();
      };
      
      // Draw the appropriate icon
      const iconData = svgPaths[iconClass];
      if (iconData) {
        drawSvgPath(iconData.path, iconData.viewBox, iconData.scale);
      } else {
        // Fallback for any missing icons
        ctx.font = 'bold 280px Arial';
        ctx.fillText(iconClass.replace('bi-', ''), 0, 0);
      }
      
      // Restore context
      ctx.restore();
    };

    // Define icons and positions with the adjusted positions
const iconData = [
  { iconClass: 'bi-braces-asterisk', position: new THREE.Vector3(0, 0, facePosition), rotation: new THREE.Euler(0, 0, 0) },
  { iconClass: 'bi-wifi', position: new THREE.Vector3(0, 0, -facePosition), rotation: new THREE.Euler(0, Math.PI, 0) },
  { iconClass: 'bi-cpu', position: new THREE.Vector3(facePosition, 0, 0), rotation: new THREE.Euler(0, Math.PI/2, 0) },
  { iconClass: 'bi-robot', position: new THREE.Vector3(-facePosition, 0, 0), rotation: new THREE.Euler(0, -Math.PI/2, 0) },
  { iconClass: 'bi-apple', position: new THREE.Vector3(0, facePosition, 0), rotation: new THREE.Euler(-Math.PI/2, 0, 0) },
  { iconClass: 'bi-code-square', position: new THREE.Vector3(0, -facePosition, 0), rotation: new THREE.Euler(Math.PI/2, 0, 0) },
];

    // Create and add planes to the cube group
    iconData.forEach(({ iconClass, position, rotation }, index) => {
      const plane = createPlaneWithIcon(iconClass, position, rotation, index);
      if (plane) {
        cubeGroup.add(plane);
      }
    });

    // Debug: log what's in the scene
    console.log('Scene contents:', scene.children.map(child => child.name || child.type));
    
    // Animation loop with rotation for the cube and icons
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // 30% faster self-rotation for the entire cube
      cubeGroup.rotation.x += 0.001 * 1.3;
      cubeGroup.rotation.y += 0.002 * 1.3;
      cubeGroup.rotation.z += 0.0005 * 1.3;
      
      // Update icon rotations
      iconRotations.current = iconRotations.current.map((angle, index) => {
        // Each icon rotates at a different speed
        const newAngle = angle + (0.01 * (index % 3 + 1));
        
        // Update the canvas for this rotation
        const canvas = textures[index].source.data as HTMLCanvasElement;
        updateIconCanvas(
          canvas, 
          iconData[index].iconClass, 
          newAngle, 
          index
        );
        
        // Need to mark texture as needing update
        textures[index].needsUpdate = true;
        
        return newAngle;
      });
      
      // Add subtle pulsing effect to planes
      planes.forEach((plane, index) => {
        const scale = 1 + 0.02 * Math.sin(Date.now() * 0.001 + index);
        plane.scale.set(scale, scale, scale);
      });
      
      controls.update();
      
      // Render both the blurred background and sharp foreground
      renderer.render(scene, camera);
      sharpRenderer.render(scene, camera);
    };

    animate();

    // Handle window resize - improved resize handler to ensure proper scaling
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
      sharpRenderer.setSize(width, height);
      
      // Force re-render after resize to prevent flickering
      renderer.render(scene, camera);
      sharpRenderer.render(scene, camera);
    };

    // Initial resize to ensure proper sizing
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      console.log('Cleaning up ThreeDModel');
      window.removeEventListener('resize', handleResize);
      
      // Cancel animation
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      
      // Dispose controls
      if (controls) {
        controls.dispose();
      }
      
      // Dispose scene objects
      scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
          const mesh = object as THREE.Mesh;
          mesh.geometry.dispose();
          
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(material => material.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      });
      
      // Dispose renderers and remove from DOM
      renderer.dispose();
      sharpRenderer.dispose();
      if (container) {
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        if (container.contains(contentContainer)) {
          container.removeChild(contentContainer);
        }
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[850px] relative overflow-hidden" 
      style={{ 
        minHeight: '850px',

      }}
    ></div>
  );
}