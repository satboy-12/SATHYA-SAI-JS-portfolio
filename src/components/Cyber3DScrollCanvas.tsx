import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import profileImage from '../assets/images/sathya image 2.jpeg';

interface Cyber3DScrollCanvasProps {
  scrollProgress: number; // 0 to 100
  accentColor?: string; // hex string, e.g. '#fbcfe8'
  activeSectionId?: string;
}

export const Cyber3DScrollCanvas: React.FC<Cyber3DScrollCanvasProps> = ({
  scrollProgress,
  accentColor = '#fbcfe8',
  activeSectionId = 'hero'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // References for dynamic 3D elements
  const portraitRigRef = useRef<THREE.Group | null>(null);
  const portraitMeshRef = useRef<THREE.Mesh | null>(null);
  const hudGroupRef = useRef<THREE.Group | null>(null);
  const lightTrailsGroupRef = useRef<THREE.Group | null>(null);
  const particlesPointsRef = useRef<THREE.Points | null>(null);
  const keyLightRef = useRef<THREE.PointLight | null>(null);
  const rimLightRef = useRef<THREE.PointLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);

  // Smooth lerp state
  const scrollTargetRef = useRef<number>(0);
  const scrollCurrentRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0
  });

  // Sync scroll target
  useEffect(() => {
    scrollTargetRef.current = scrollProgress / 100;
  }, [scrollProgress]);

  // Color dynamic update
  useEffect(() => {
    if (!keyLightRef.current || !rimLightRef.current) return;
    const color = new THREE.Color(accentColor);
    keyLightRef.current.color = color;
  }, [accentColor]);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. SCENE & ATMOSPHERE
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080f, 0.024);
    sceneRef.current = scene;

    // 2. CAMERA
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0, 24);
    cameraRef.current = camera;

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. LIGHTING SETUP (Cinematic Studio Rig)
    const ambientLight = new THREE.AmbientLight(0x1a1d2e, 2.2);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    // Key Light (Dynamic Accent Rim)
    const keyLight = new THREE.PointLight(new THREE.Color(accentColor), 5.5, 45, 1.2);
    keyLight.position.set(9, 6, 12);
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    // Soft Blue Fill Light
    const fillLight = new THREE.PointLight(0x38bdf8, 4.0, 40, 1.2);
    fillLight.position.set(-8, -4, 10);
    scene.add(fillLight);

    // Purple Rim Backlight
    const rimLight = new THREE.PointLight(0x818cf8, 4.5, 50, 1.2);
    rimLight.position.set(0, 8, -6);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    // 5. MASTER PORTRAIT RIG
    const portraitRig = new THREE.Group();
    scene.add(portraitRig);
    portraitRigRef.current = portraitRig;

    // Initial position on Hero right stage
    const isMobile = width < 1024;
    const heroX = isMobile ? 0 : 5.8;
    const heroY = isMobile ? 1.5 : 0.4;
    portraitRig.position.set(heroX, heroY, 0);

    // Texture Loader for Original Photo
    const textureLoader = new THREE.TextureLoader();
    const photoTexture = textureLoader.load(
      profileImage,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.generateMipmaps = true;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
      }
    );

    // A. PORTRAIT CARD (Unchanged Original Photo Plane)
    // Aspect ratio matches the vertical composition of Sathya's photo (approx 3:4)
    const cardWidth = 5.6;
    const cardHeight = 7.6;
    const cardGeo = new THREE.PlaneGeometry(cardWidth, cardHeight, 32, 32);

    // Portrait Material with subtle sheen and stability
    const portraitMat = new THREE.MeshPhysicalMaterial({
      map: photoTexture,
      transparent: true,
      roughness: 0.35,
      metalness: 0.1,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2,
      reflectivity: 0.5,
      side: THREE.FrontSide
    });

    const portraitMesh = new THREE.Mesh(cardGeo, portraitMat);
    portraitMesh.position.set(0, 0, 0.1);
    portraitRig.add(portraitMesh);
    portraitMeshRef.current = portraitMesh;

    // B. FROSTED OBSIDIAN GLASS BACKING PLATE
    const backPlateGeo = new THREE.PlaneGeometry(cardWidth + 0.35, cardHeight + 0.35);
    const backPlateMat = new THREE.MeshPhysicalMaterial({
      color: 0x090a12,
      roughness: 0.15,
      metalness: 0.9,
      transmission: 0.6,
      opacity: 0.92,
      transparent: true,
      reflectivity: 0.9
    });
    const backPlate = new THREE.Mesh(backPlateGeo, backPlateMat);
    backPlate.position.set(0, 0, -0.05);
    portraitRig.add(backPlate);

    // C. LUMINOUS SLENDER FRAME BORDER
    const borderGeo = new THREE.EdgesGeometry(backPlateGeo);
    const borderMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0.65,
      linewidth: 2
    });
    const borderLine = new THREE.LineSegments(borderGeo, borderMat);
    borderLine.position.set(0, 0, 0.02);
    portraitRig.add(borderLine);

    // 6. FUTURISTIC CIRCULAR HUD SYSTEM (Positioned Behind Portrait)
    const hudGroup = new THREE.Group();
    hudGroup.position.set(0, 0, -0.8);
    portraitRig.add(hudGroup);
    hudGroupRef.current = hudGroup;

    // HUD Outer Dash Ring
    const hudOuterRadius = 5.2;
    const hudOuterGeo = new THREE.RingGeometry(hudOuterRadius, hudOuterRadius + 0.08, 96);
    const hudOuterMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x818cf8),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45
    });
    const hudOuterMesh = new THREE.Mesh(hudOuterGeo, hudOuterMat);
    hudGroup.add(hudOuterMesh);

    // HUD Precision Dial Ring with Tick Marks
    const hudMidRadius = 4.2;
    const hudMidGeo = new THREE.RingGeometry(hudMidRadius, hudMidRadius + 0.05, 64);
    const hudMidMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35
    });
    const hudMidMesh = new THREE.Mesh(hudMidGeo, hudMidMat);
    hudGroup.add(hudMidMesh);

    // HUD Segmented Arcs
    const arcCount = 4;
    for (let a = 0; a < arcCount; a++) {
      const startAngle = (a * Math.PI) / 2 + 0.2;
      const arcGeo = new THREE.RingGeometry(4.7, 4.82, 32, 1, startAngle, 0.8);
      const arcMat = new THREE.MeshBasicMaterial({
        color: a % 2 === 0 ? new THREE.Color(0x38bdf8) : new THREE.Color(accentColor),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
      });
      const arcMesh = new THREE.Mesh(arcGeo, arcMat);
      hudGroup.add(arcMesh);
    }

    // Radial Holographic Glow Disc
    const glowGeo = new THREE.CircleGeometry(5.8, 48);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x1e1b4b,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    glowMesh.position.set(0, 0, -0.1);
    hudGroup.add(glowMesh);

    // 7. SOFT PURPLE-BLUE LIGHT TRAILS (Cinematic Depth Ribbons)
    const lightTrailsGroup = new THREE.Group();
    scene.add(lightTrailsGroup);
    lightTrailsGroupRef.current = lightTrailsGroup;

    const trailCount = 6;
    const trailMeshes: THREE.Mesh[] = [];

    for (let t = 0; t < trailCount; t++) {
      const curvePoints: THREE.Vector3[] = [];
      const segmentCount = 40;
      const angleOffset = (t / trailCount) * Math.PI * 2;
      const spreadX = 8 + (t % 3) * 3;
      const spreadY = 6 + (t % 2) * 4;

      for (let s = 0; s < segmentCount; s++) {
        const u = s / segmentCount;
        const x = Math.sin(u * Math.PI * 3 + angleOffset) * spreadX;
        const y = (u - 0.5) * 28 + Math.cos(u * Math.PI * 2) * spreadY;
        const z = -12 + Math.sin(u * Math.PI * 2 + angleOffset) * 10;
        curvePoints.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(curvePoints);
      const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.07, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: t % 2 === 0 ? 0x818cf8 : (t % 3 === 0 ? 0x38bdf8 : new THREE.Color(accentColor)),
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      lightTrailsGroup.add(tubeMesh);
      trailMeshes.push(tubeMesh);
    }

    // 8. FLOATING AMBIENT PARTICLES (Bokeh & Star Dust)
    const particleCount = 750;
    const particleGeo = new THREE.BufferGeometry();
    const posArr = new Float32Array(particleCount * 3);
    const colorArr = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x38bdf8); // Sky Blue
    const c2 = new THREE.Color(0x818cf8); // Indigo / Purple
    const c3 = new THREE.Color(accentColor); // Accent

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      posArr[i3] = (Math.random() - 0.5) * 45;
      posArr[i3 + 1] = (Math.random() - 0.5) * 40;
      posArr[i3 + 2] = (Math.random() - 0.5) * 35;

      const col = i % 3 === 0 ? c1 : (i % 3 === 1 ? c2 : c3);
      colorArr[i3] = col.r;
      colorArr[i3 + 1] = col.g;
      colorArr[i3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colorArr, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesPointsRef.current = particles;

    // 9. MOUSE PARALLAX LISTENER
    const handlePointerMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = normX;
      mouseRef.current.targetY = normY;
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // 10. RESIZE LISTENER
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth || window.innerWidth;
      const h = mountRef.current.clientHeight || window.innerHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 11. 60FPS SMOOTH RENDER LOOP WITH CINEMATIC TRAJECTORY
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Spring Scroll Interpolation
      scrollCurrentRef.current += (scrollTargetRef.current - scrollCurrentRef.current) * 0.065;
      const p = scrollCurrentRef.current; // 0.0 to 1.0

      // Smooth Mouse Inertia
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const isNarrow = window.innerWidth < 1024;

      // CINEMATIC SECTION TRAJECTORY FOR PORTRAIT:
      // Hero (0.0 -> 0.20): Right stage, elegant posture, gazing forward
      // About (0.20 -> 0.45): Glides across to Left stage behind the bio card, smooth rotation
      // Toolkit (0.45 -> 0.65): Floats slightly up-center in depth, illuminated by skills matrix
      // Projects (0.65 -> 0.85): Glides to upper right with depth perspective
      // Transmission (0.85 -> 1.0): Rests in center background with expanding HUD horizon

      let targetX = 0;
      let targetY = 0;
      let targetZ = 0;
      let targetScale = 1.0;
      let targetRotY = 0;
      let targetRotX = 0;
      let opacityTarget = 0.95;

      if (isNarrow) {
        // Mobile / Small Screen Centered Choreography
        targetX = 0;
        targetY = 2 - p * 3;
        targetZ = -p * 10;
        targetScale = Math.max(0.7, 1.0 - p * 0.3);
        targetRotY = mx * 0.1;
        targetRotX = -my * 0.08;
      } else {
        // Desktop Multi-Section 3D Flight
        if (p < 0.22) {
          // Hero Stage (Right Column Anchor)
          const localP = p / 0.22;
          targetX = 5.8 - localP * 2.0;
          targetY = 0.4 - localP * 0.6;
          targetZ = 0 - localP * 2.0;
          targetScale = 1.0 - localP * 0.05;
          targetRotY = -0.08 + mx * 0.08 - localP * 0.05;
          targetRotX = 0.02 - my * 0.06;
          opacityTarget = 0.96;
        } else if (p < 0.50) {
          // Transition to About Stage (Left Stage Anchor)
          const localP = (p - 0.22) / 0.28;
          targetX = 3.8 - localP * 9.6; // Moves smoothly to -5.8 (Left column)
          targetY = -0.2 + Math.sin(localP * Math.PI) * 0.8;
          targetZ = -2.0 - Math.sin(localP * Math.PI) * 1.5;
          targetScale = 0.95 + Math.sin(localP * Math.PI) * 0.05;
          targetRotY = 0.08 + mx * 0.08;
          targetRotX = -my * 0.06;
          opacityTarget = 0.92;
        } else if (p < 0.75) {
          // Toolkit & Mastery Stage (Center Deep Floating Anchor)
          const localP = (p - 0.50) / 0.25;
          targetX = -5.8 + localP * 11.6; // Glides from left to right (+5.8)
          targetY = 0.5 + Math.cos(localP * Math.PI) * 0.5;
          targetZ = -3.5 - Math.sin(localP * Math.PI) * 2.5;
          targetScale = 0.92;
          targetRotY = (localP - 0.5) * 0.15 + mx * 0.08;
          targetRotX = -my * 0.06;
          opacityTarget = 0.88;
        } else {
          // Projects & Contact Transmission (Horizon Depth Anchor)
          const localP = (p - 0.75) / 0.25;
          targetX = 5.8 - localP * 5.8; // Centers toward 0
          targetY = -0.5 - localP * 0.8;
          targetZ = -6.0 - localP * 4.0;
          targetScale = 0.85 - localP * 0.1;
          targetRotY = mx * 0.08;
          targetRotX = -my * 0.06;
          opacityTarget = Math.max(0.4, 0.85 - localP * 0.4);
        }
      }

      // Smooth Lerp of Portrait Rig Transform
      if (portraitRigRef.current) {
        const rig = portraitRigRef.current;
        rig.position.x += (targetX - rig.position.x) * 0.065;
        rig.position.y += (targetY - rig.position.y) * 0.065;
        rig.position.z += (targetZ - rig.position.z) * 0.065;

        // Subtle, stable rotation (Strict bounds to keep facial likeness pristine)
        const boundedRotY = THREE.MathUtils.clamp(targetRotY + Math.sin(elapsedTime * 0.6) * 0.015, -0.2, 0.2);
        const boundedRotX = THREE.MathUtils.clamp(targetRotX + Math.cos(elapsedTime * 0.5) * 0.01, -0.15, 0.15);
        rig.rotation.y += (boundedRotY - rig.rotation.y) * 0.06;
        rig.rotation.x += (boundedRotX - rig.rotation.x) * 0.06;
        rig.rotation.z = Math.sin(elapsedTime * 0.4) * 0.01;

        const currentScale = rig.scale.x;
        const newScale = currentScale + (targetScale - currentScale) * 0.065;
        rig.scale.set(newScale, newScale, newScale);
      }

      // Animated Circular HUD Rotation
      if (hudGroupRef.current) {
        hudGroupRef.current.rotation.z = elapsedTime * 0.18 + p * 1.5;
      }

      // Dynamic Studio Key Lighting Drift
      if (keyLightRef.current && portraitRigRef.current) {
        const px = portraitRigRef.current.position.x;
        const py = portraitRigRef.current.position.y;
        keyLightRef.current.position.set(px + 4 + Math.sin(elapsedTime) * 1.5, py + 3 + Math.cos(elapsedTime * 0.8) * 1.5, 9);
      }

      // Animated Light Trails Flow
      if (lightTrailsGroupRef.current) {
        lightTrailsGroupRef.current.rotation.y = elapsedTime * 0.05 + p * 0.6;
        lightTrailsGroupRef.current.position.y = Math.sin(elapsedTime * 0.3) * 1.2;
      }

      // Particle Drift
      if (particlesPointsRef.current) {
        particlesPointsRef.current.rotation.y = elapsedTime * 0.02 + mx * 0.03;
        particlesPointsRef.current.rotation.x = elapsedTime * 0.01 + my * 0.03;
      }

      // Camera Gentle Breathing
      if (cameraRef.current) {
        cameraRef.current.position.x = mx * 0.8;
        cameraRef.current.position.y = my * 0.6;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // 12. CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && rendererRef.current.domElement && mountRef.current) {
        mountRef.current.innerHTML = '';
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
      aria-hidden="true"
    />
  );
};
