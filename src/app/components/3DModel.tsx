"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function ThreeDModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Track all critical elements for proper cleanup
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Thorough cleanup of previous instance
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }

    if (controlsRef.current) {
      controlsRef.current.dispose();
      controlsRef.current = null;
    }

    if (rendererRef.current && rendererRef.current.domElement) {
      rendererRef.current.dispose();
      if (container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current = null;
    }

    // Clear container completely
    container.innerHTML = '';

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 8;
    camera.position.y = 2;
    camera.lookAt(0, 0, 0);

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Setup controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 3;
    controls.maxDistance = 15;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create the cube - ONLY ONE CUBE
    const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
    const cubeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x0055aa,
      metalness: 0.3,
      roughness: 0.4,
    });
    
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.name = 'mainCube';
    scene.add(cube);

    // Function to create a plane with an icon texture using DOM elements
    const createPlaneWithIcon = (iconClass: string, position: THREE.Vector3, rotation: THREE.Euler) => {
      // Create a canvas for the icon
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      
      // Draw background
      ctx.fillStyle = 'rgba(173, 216, 230, 0.7)';
      ctx.beginPath();
      ctx.roundRect(0, 0, canvas.width, canvas.height, 20);
      ctx.fill();
      
      // Draw text instead of icon
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 120px Arial'; 
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Extract icon name from class
      const iconName = iconClass.replace('bi-', '').replace(/-/g, ' ');
      ctx.fillText(iconName, canvas.width/2, canvas.height/2);
      
      // Create texture from canvas
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshBasicMaterial({ 
        map: texture, 
        transparent: true,
        side: THREE.DoubleSide
      });
      
      const planeGeometry = new THREE.PlaneGeometry(2.5, 2.5);
      const plane = new THREE.Mesh(planeGeometry, material);
      plane.name = `plane-${iconClass}`;
      
      plane.position.copy(position);
      plane.rotation.copy(rotation);
      
      return plane;
    };

    // Define icons and positions
    const iconData = [
      { iconClass: 'bi-code-slash', position: new THREE.Vector3(0, 0, 1.51), rotation: new THREE.Euler(0, 0, 0) },
      { iconClass: 'bi-braces', position: new THREE.Vector3(0, 0, -1.51), rotation: new THREE.Euler(0, Math.PI, 0) },
      { iconClass: 'bi-database', position: new THREE.Vector3(1.51, 0, 0), rotation: new THREE.Euler(0, Math.PI/2, 0) },
      { iconClass: 'bi-server', position: new THREE.Vector3(-1.51, 0, 0), rotation: new THREE.Euler(0, -Math.PI/2, 0) },
      { iconClass: 'bi-window', position: new THREE.Vector3(0, 1.51, 0), rotation: new THREE.Euler(-Math.PI/2, 0, 0) },
      { iconClass: 'bi-terminal', position: new THREE.Vector3(0, -1.51, 0), rotation: new THREE.Euler(Math.PI/2, 0, 0) },
    ];

    // Create and add planes
    iconData.forEach(({ iconClass, position, rotation }) => {
      const plane = createPlaneWithIcon(iconClass, position, rotation);
      if (plane) {
        scene.add(plane);
      }
    });

    // Debug: log what's in the scene
    console.log('Scene contents:', scene.children.map(child => child.name || child.type));
    
    
    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Cube rotation
      cube.rotation.x += 0.003;
      cube.rotation.y += 0.004;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

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
      if (controlsRef.current) {
        controlsRef.current.dispose();
        controlsRef.current = null;
      }
      
      // Dispose scene objects
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
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
      }
      
      // Dispose renderer and remove from DOM
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (container && container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current = null;
      }
      
      // Clear scene reference
      sceneRef.current = null;
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[400px]"></div>
  );
}