import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  mode: 'cinema' | 'interactive';
  currentTime?: number;
  activeSection?: string;
  cameraOverride?: { x: number; y: number; z: number; targetY?: number };
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  mode,
  currentTime = 0,
  activeSection = 'hero',
  cameraOverride
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const coreGroupRef = useRef<THREE.Group | null>(null);
  const ring1Ref = useRef<THREE.Mesh | null>(null);
  const ring2Ref = useRef<THREE.Mesh | null>(null);
  const ring3Ref = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animFrameIdRef = useRef<number | null>(null);
  const cyanLightRef = useRef<THREE.PointLight | null>(null);
  const violetLightRef = useRef<THREE.PointLight | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05060a, 0.022);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 30);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x0a0f1d, 1.2);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x3eeaf4, 4, 50, 1.5);
    cyanLight.position.set(6, 4, 8);
    scene.add(cyanLight);
    cyanLightRef.current = cyanLight;

    const violetLight = new THREE.PointLight(0x8a5cff, 3.5, 50, 1.5);
    violetLight.position.set(-8, -4, 6);
    scene.add(violetLight);
    violetLightRef.current = violetLight;

    // 3D Particles Field (Deep Digital Void)
    const particleCount = 1400;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    const colorCyan = new THREE.Color(0x3eeaf4);
    const colorViolet = new THREE.Color(0x8a5cff);
    const colorWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 80;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 70;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 60;

      const mixedColor = Math.random() > 0.5 ? colorCyan : (Math.random() > 0.4 ? colorViolet : colorWhite);
      particleColors[i3] = mixedColor.r;
      particleColors[i3 + 1] = mixedColor.g;
      particleColors[i3 + 2] = mixedColor.b;

      particleScales[i] = Math.random() * 0.8 + 0.3;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Custom glowing particle texture
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const pCtx = particleCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(62, 234, 244, 0.8)');
      grad.addColorStop(0.8, 'rgba(138, 92, 255, 0.2)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.4,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.75
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // 3D Quantum Cyber Security Core Group
    const coreGroup = new THREE.Group();
    coreGroup.position.set(6.5, 0.5, 0);
    scene.add(coreGroup);
    coreGroupRef.current = coreGroup;

    // Core Icosahedron Crystal
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x05060a,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: true,
      emissive: 0x3eeaf4,
      emissiveIntensity: 0.6
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Inner Glowing Sphere
    const innerGeo = new THREE.SphereGeometry(0.8, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x3eeaf4,
      transparent: true,
      opacity: 0.4
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerSphere);

    // Outer Torus Ring 1 (Cyan Orbit)
    const ring1Geo = new THREE.TorusGeometry(2.3, 0.03, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x3eeaf4,
      emissive: 0x3eeaf4,
      emissiveIntensity: 1.2,
      roughness: 0.2
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);
    ring1Ref.current = ring1;

    // Outer Torus Ring 2 (Violet Orbit)
    const ring2Geo = new THREE.TorusGeometry(2.8, 0.025, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x8a5cff,
      emissive: 0x8a5cff,
      emissiveIntensity: 1.0,
      roughness: 0.2
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = Math.PI / 6;
    coreGroup.add(ring2);
    ring2Ref.current = ring2;

    // Outer Torus Ring 3 (Hexagonal Nodes)
    const ring3Geo = new THREE.TorusGeometry(3.3, 0.02, 16, 100);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0x3eeaf4,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 5;
    coreGroup.add(ring3);
    ring3Ref.current = ring3;

    // Network Node Beacons on Rings
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const nodeGeo = new THREE.SphereGeometry(0.12, 12, 12);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0x3eeaf4 });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(Math.cos(angle) * 2.3, Math.sin(angle) * 2.3, 0);
      ring1.add(node);
    }

    // Cyber Floor Grid Plane
    const gridHelper = new THREE.GridHelper(90, 45, 0x3eeaf4, 0x151f33);
    gridHelper.position.y = -14;
    scene.add(gridHelper);

    // Mouse listener for parallax in interactive mode
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize listener
    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      const w = mountRef.current.clientWidth || window.innerWidth;
      const h = mountRef.current.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Render loop
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Rotate Cyber Core
      if (coreGroupRef.current) {
        coreGroupRef.current.rotation.y = elapsed * 0.25;
        coreGroupRef.current.position.y = Math.sin(elapsed * 1.2) * 0.25;
      }
      if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.6;
      if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.45;
      if (ring3Ref.current) ring3Ref.current.rotation.y += delta * 0.3;

      // Rotate Particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsed * 0.02;
        particlesRef.current.rotation.x = Math.sin(elapsed * 0.03) * 0.05;
      }

      // Lights dynamic pulse
      if (cyanLightRef.current) {
        cyanLightRef.current.intensity = 3.5 + Math.sin(elapsed * 2.5) * 0.8;
      }
      if (violetLightRef.current) {
        violetLightRef.current.intensity = 3.0 + Math.cos(elapsed * 2.0) * 0.6;
      }

      renderer.render(scene, camera);
      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Update Camera in Cinema / Interactive Mode
  useEffect(() => {
    if (!cameraRef.current || !coreGroupRef.current) return;
    const camera = cameraRef.current;
    const core = coreGroupRef.current;

    if (cameraOverride) {
      camera.position.x = cameraOverride.x;
      camera.position.y = cameraOverride.y;
      camera.position.z = cameraOverride.z;
      camera.lookAt(0, cameraOverride.targetY ?? cameraOverride.y, 0);
      return;
    }

    if (mode === 'cinema') {
      // Direct keyframed camera based on currentTime
      if (currentTime < 7) {
        // Prologue (0 - 7s): Camera dolly in from deep void (z: 45 -> 24)
        const progress = currentTime / 7;
        const z = 45 - progress * 21;
        camera.position.set(0, 0, z);
        camera.lookAt(0, 0, 0);
        core.position.set(0, 0, -5 + progress * 5);
      } else if (currentTime < 18) {
        // Hero Section (7 - 18s): Approaching Hero, portrait on left, core on right
        const progress = (currentTime - 7) / 11;
        const z = 24 - progress * 7;
        const y = 0.5 + Math.sin(progress * Math.PI) * 0.4;
        camera.position.set(Math.sin(progress * 1.5) * 1.2, y, z);
        camera.lookAt(0, 0.2, 0);
        core.position.set(6.2, 0.4, 0);
      } else if (currentTime < 30) {
        // Projects Section (18 - 30s): Smooth dolly down through project cards
        const progress = (currentTime - 18) / 12;
        const y = -1 - progress * 6;
        camera.position.set(Math.cos(progress * 2) * 1.5, y, 18);
        camera.lookAt(0, y - 0.5, 0);
        core.position.set(8, y + 2, -2);
      } else if (currentTime < 40) {
        // Skills Section (30 - 40s): Downward transition into holographic skills
        const progress = (currentTime - 30) / 10;
        const y = -7 - progress * 5;
        camera.position.set(0, y, 20);
        camera.lookAt(0, y, 0);
        core.position.set(-7, y + 1, -1);
      } else if (currentTime < 49) {
        // Contact Section (40 - 49s): Moving downward to "LET'S BUILD SOMETHING SECURE"
        const progress = (currentTime - 40) / 9;
        const y = -12 - progress * 5;
        camera.position.set(Math.sin(progress * 2) * 2, y, 17);
        camera.lookAt(0, y, 0);
        core.position.set(7, y + 1, 0);
      } else {
        // Final Shot (49 - 56s): Majestic slow zoom out showing entire 3D ecosystem
        const progress = Math.min((currentTime - 49) / 7, 1);
        const z = 17 + progress * 24;
        const y = -17 + progress * 10;
        camera.position.set(0, y, z);
        camera.lookAt(0, -6, 0);
        core.position.set(0, -6, 0);
      }
    } else {
      // Interactive Mode: Position camera based on active section
      let targetY = 0;
      let targetZ = 22;
      let corePos = { x: 6.5, y: 0.5, z: 0 };

      if (activeSection === 'hero') {
        targetY = 0;
        targetZ = 22;
        corePos = { x: 6.5, y: 0.5, z: 0 };
      } else if (activeSection === 'about') {
        targetY = -5;
        targetZ = 22;
        corePos = { x: -6.5, y: -4.5, z: -1 };
      } else if (activeSection === 'projects' || activeSection === 'work') {
        targetY = -11;
        targetZ = 24;
        corePos = { x: 8.5, y: -10, z: -2 };
      } else if (activeSection === 'timeline' || activeSection === 'skills') {
        targetY = -17;
        targetZ = 24;
        corePos = { x: -8, y: -16, z: -1 };
      } else if (activeSection === 'contact') {
        targetY = -23;
        targetZ = 22;
        corePos = { x: 0, y: -22, z: 0 };
      }

      // Parallax mouse tilt
      const mx = mouseRef.current.x * 1.5;
      const my = mouseRef.current.y * 1.0;
      camera.position.set(mx, targetY + my, targetZ);
      camera.lookAt(0, targetY, 0);
      core.position.set(corePos.x, corePos.y, corePos.z);
    }
  }, [mode, currentTime, activeSection, cameraOverride]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
    />
  );
};
