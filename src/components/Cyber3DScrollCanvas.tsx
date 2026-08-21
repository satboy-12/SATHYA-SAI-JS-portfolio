import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Cyber3DScrollCanvasProps {
  scrollProgress: number; // 0 to 100
  accentColor?: string; // hex string, e.g. '#60a5fa'
  activeSectionId?: string;
  activeThemeId?: string;
}

// Helper to create high-resolution crisp 2D Canvas textures for 3D holographic cards
function createThreatBadgeTexture(text: string, type: 'threat' | 'blocked' = 'threat'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 140;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Transparent clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const isThreat = type === 'threat';
  const strokeColor = isThreat ? '#38bdf8' : '#818cf8';
  const glowColor = isThreat ? 'rgba(56, 189, 248, 0.8)' : 'rgba(129, 140, 248, 0.8)';
  const dotColor = isThreat ? '#38bdf8' : '#34d399';

  // Rounded pill background
  ctx.save();
  ctx.shadowColor = glowColor;
  ctx.shadowBlur = 24;
  ctx.fillStyle = 'rgba(6, 10, 18, 0.85)';
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 4;

  const x = 16, y = 16, w = 480, h = 108, r = 24;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Pulsing beacon circle on left
  ctx.save();
  ctx.fillStyle = dotColor;
  ctx.shadowColor = dotColor;
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.arc(64, 70, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Text
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px monospace, sans-serif';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = glowColor;
  ctx.shadowBlur = 12;
  ctx.fillText(text, 100, 70);
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createCodeCardTexture(title: string, lines: string[]): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 420;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background Box
  ctx.fillStyle = 'rgba(7, 11, 20, 0.9)';
  ctx.strokeStyle = 'rgba(96, 165, 250, 0.4)';
  ctx.lineWidth = 3;

  const x = 10, y = 10, w = 620, h = 400, r = 20;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Header Bar
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fillRect(10, 10, 620, 52);

  // Traffic Dots
  ctx.fillStyle = '#ef4444';
  ctx.beginPath(); ctx.arc(36, 36, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath(); ctx.arc(56, 36, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#10b981';
  ctx.beginPath(); ctx.arc(76, 36, 6, 0, Math.PI * 2); ctx.fill();

  // Title
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.font = 'bold 20px monospace';
  ctx.fillText(title, 105, 43);

  // Code Lines
  ctx.font = '18px monospace';
  let startY = 95;
  lines.forEach((line) => {
    if (line.includes('function') || line.includes('const') || line.includes('import') || line.includes('export')) {
      ctx.fillStyle = '#93c5fd';
    } else if (line.includes('status:') || line.includes('SUCCESS') || line.includes('OK') || line.includes('BLOCKED')) {
      ctx.fillStyle = '#34d399';
    } else if (line.includes('error') || line.includes('THREAT')) {
      ctx.fillStyle = '#f87171';
    } else if (line.includes('//')) {
      ctx.fillStyle = '#64748b';
    } else {
      ctx.fillStyle = '#e2e8f0';
    }
    ctx.fillText(line, 32, startY);
    startY += 30;
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createAnalyticsDashboardTexture(type: 'line' | 'bar' | 'gauge' | 'shield' | 'wireframe' | 'map'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Translucent Glass Container
  ctx.fillStyle = 'rgba(8, 14, 26, 0.88)';
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
  ctx.lineWidth = 3;

  const x = 10, y = 10, w = 492, h = 340, r = 18;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Header
  ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.fillRect(10, 10, 492, 45);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px monospace';

  if (type === 'line') {
    ctx.fillText('NETWORK TELEMETRY // REALTIME', 25, 38);
    // Grid Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let gy = 80; gy <= 280; gy += 40) {
      ctx.beginPath(); ctx.moveTo(35, gy); ctx.lineTo(475, gy); ctx.stroke();
    }
    // Cyan Line Chart
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(40, 240);
    ctx.lineTo(110, 190);
    ctx.lineTo(180, 210);
    ctx.lineTo(250, 130);
    ctx.lineTo(330, 160);
    ctx.lineTo(410, 95);
    ctx.lineTo(470, 120);
    ctx.stroke();

    // Orange Secondary Line Chart
    ctx.strokeStyle = '#f59e0b';
    ctx.shadowColor = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(40, 270);
    ctx.lineTo(120, 240);
    ctx.lineTo(200, 250);
    ctx.lineTo(280, 180);
    ctx.lineTo(360, 210);
    ctx.lineTo(440, 150);
    ctx.lineTo(470, 175);
    ctx.stroke();
  } else if (type === 'bar') {
    ctx.fillText('THREAT MITIGATION INDEX', 25, 38);
    const bars = [45, 80, 60, 110, 140, 95, 170, 130, 190, 160, 210, 185];
    const bw = 24;
    bars.forEach((bh, i) => {
      const bx = 45 + i * 36;
      const by = 290 - bh;
      // Gradient
      const grad = ctx.createLinearGradient(0, by, 0, 290);
      grad.addColorStop(0, '#60a5fa');
      grad.addColorStop(1, 'rgba(59, 130, 246, 0.2)');
      ctx.fillStyle = grad;
      ctx.fillRect(bx, by, bw, bh);

      // Top cap
      ctx.fillStyle = '#93c5fd';
      ctx.fillRect(bx, by, bw, 3);
    });
  } else if (type === 'gauge') {
    ctx.fillText('CLUSTER LOAD & BANDWIDTH', 25, 38);
    // Donut 1 (33%)
    const d1x = 150, d1y = 180, rad = 65;
    ctx.lineWidth = 14;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath(); ctx.arc(d1x, d1y, rad, 0, Math.PI * 2); ctx.stroke();

    ctx.strokeStyle = '#38bdf8';
    ctx.shadowColor = '#38bdf8'; ctx.shadowBlur = 12;
    ctx.beginPath(); ctx.arc(d1x, d1y, rad, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.33); ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('33%', d1x, d1y + 10);
    ctx.font = '14px monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('CPU LOAD', d1x, d1y + 36);

    // Donut 2 (66%)
    const d2x = 360, d2y = 180;
    ctx.lineWidth = 14;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.shadowBlur = 0;
    ctx.beginPath(); ctx.arc(d2x, d2y, rad, 0, Math.PI * 2); ctx.stroke();

    ctx.strokeStyle = '#818cf8';
    ctx.shadowColor = '#818cf8'; ctx.shadowBlur = 12;
    ctx.beginPath(); ctx.arc(d2x, d2y, rad, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.66); ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px monospace';
    ctx.fillText('66%', d2x, d2y + 10);
    ctx.font = '14px monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('MEMORY', d2x, d2y + 36);
    ctx.textAlign = 'left';
  } else if (type === 'shield') {
    ctx.fillText('ZERO-TRUST PERIMETER', 25, 38);
    // Draw Shield Vector
    ctx.save();
    ctx.translate(256, 175);
    ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 5;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.moveTo(0, -65);
    ctx.lineTo(55, -45);
    ctx.lineTo(55, 20);
    ctx.quadraticCurveTo(55, 65, 0, 85);
    ctx.quadraticCurveTo(-55, 65, -55, 20);
    ctx.lineTo(-55, -45);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Lock icon inside
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, -5, 14, Math.PI, 0);
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-16, -5, 32, 26);

    ctx.restore();

    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('STATUS: SECURED & ACTIVE', 256, 295);
    ctx.textAlign = 'left';
  } else if (type === 'wireframe') {
    ctx.fillText('APPLICATION PROTOTYPE UI', 25, 38);
    // Phone UI Wireframe
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 70, 160, 240);
    // Header in phone
    ctx.strokeRect(75, 85, 130, 30);
    // Image placeholder with X
    ctx.strokeRect(75, 125, 130, 80);
    ctx.beginPath(); ctx.moveTo(75, 125); ctx.lineTo(205, 205); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(205, 125); ctx.lineTo(75, 205); ctx.stroke();
    // Buttons
    ctx.strokeRect(75, 215, 130, 24);
    ctx.strokeRect(75, 245, 130, 24);

    // Desktop wireframe on right
    ctx.strokeRect(250, 70, 200, 240);
    ctx.strokeRect(265, 85, 170, 25);
    ctx.strokeRect(265, 120, 50, 170); // sidebar
    ctx.strokeRect(325, 120, 110, 80); // main
    ctx.strokeRect(325, 210, 110, 80); // bottom
  } else {
    // World map telemetry
    ctx.fillText('GLOBAL NODES REACH', 25, 38);
    ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
    // Continent dots
    for (let mx = 50; mx < 460; mx += 16) {
      for (let my = 80; my < 290; my += 16) {
        if (Math.sin(mx * 0.05) * Math.cos(my * 0.05) > -0.2) {
          ctx.beginPath(); ctx.arc(mx, my, 2.5, 0, Math.PI * 2); ctx.fill();
        }
      }
    }
    // Hotspots
    const hotspots = [[120, 140], [240, 130], [360, 170], [320, 200], [180, 220]];
    hotspots.forEach(([hx, hy]) => {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.arc(hx, hy, 6, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(hx, hy, 14, 0, Math.PI * 2); ctx.stroke();
    });
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export const Cyber3DScrollCanvas: React.FC<Cyber3DScrollCanvasProps> = ({
  scrollProgress,
  accentColor = '#60a5fa',
  activeSectionId = 'hero',
  activeThemeId = 'cyber_security'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Group references
  const worldGroupRef = useRef<THREE.Group | null>(null);
  const networkLatticeGroupRef = useRef<THREE.Group | null>(null);
  const codeWindowsGroupRef = useRef<THREE.Group | null>(null);
  const globeSystemGroupRef = useRef<THREE.Group | null>(null);
  const orbitalRingGroupRef = useRef<THREE.Group | null>(null);
  const dashboardRingGroupRef = useRef<THREE.Group | null>(null);

  // Lights
  const keySpotLightRef = useRef<THREE.SpotLight | null>(null);
  const keyPointLightRef = useRef<THREE.PointLight | null>(null);

  // Motion and Smoothing refs
  const scrollTargetRef = useRef<number>(0);
  const scrollCurrentRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0
  });

  // Pulses travelling on network edges
  const networkPulsesRef = useRef<Array<{
    lineIdx: number;
    progress: number;
    speed: number;
    mesh: THREE.Mesh;
  }>>([]);

  // Track scroll updates
  useEffect(() => {
    scrollTargetRef.current = scrollProgress / 100;
  }, [scrollProgress]);

  // Color update
  useEffect(() => {
    if (!keyPointLightRef.current || !keySpotLightRef.current) return;
    const targetColor = new THREE.Color(accentColor);
    keyPointLightRef.current.color = targetColor;
    keySpotLightRef.current.color = targetColor;
  }, [accentColor]);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. SCENE WITH SLATE FOG
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04060a, 0.015);
    sceneRef.current = scene;

    // 2. CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 24);
    cameraRef.current = camera;

    // 3. RETINA WEBGL RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. EXECUTIVE LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const specSpot = new THREE.SpotLight(0xffffff, 5.0, 50, Math.PI / 3.5, 0.4, 1.2);
    specSpot.position.set(10, 15, 20);
    scene.add(specSpot);
    keySpotLightRef.current = specSpot;

    const keyPoint = new THREE.PointLight(new THREE.Color(accentColor), 5.5, 45, 1.1);
    keyPoint.position.set(6, 6, 12);
    scene.add(keyPoint);
    keyPointLightRef.current = keyPoint;

    const fillBlue = new THREE.PointLight(0x38bdf8, 4.0, 45, 1.1);
    fillBlue.position.set(-10, -6, 12);
    scene.add(fillBlue);

    const rimIndigo = new THREE.PointLight(0x818cf8, 4.5, 50, 1.2);
    rimIndigo.position.set(0, 10, -10);
    scene.add(rimIndigo);

    // 5. MASTER WORLD RIG
    const masterWorld = new THREE.Group();
    scene.add(masterWorld);
    worldGroupRef.current = masterWorld;

    const isMobile = width < 1024;
    masterWorld.position.set(isMobile ? 0 : 4.5, 0, 0);

    // =========================================================================
    // SCENE A: CYBER SECURITY NETWORK THREAT LATTICE (Video 0:00 - 0:02)
    // =========================================================================
    const latticeGroup = new THREE.Group();
    masterWorld.add(latticeGroup);
    networkLatticeGroupRef.current = latticeGroup;

    // Generate 28 3D Constellation Nodes
    const nodeCoords: THREE.Vector3[] = [];
    const nodeMeshes: THREE.Mesh[] = [];
    const totalNodes = 26;

    for (let i = 0; i < totalNodes; i++) {
      const radius = 3.5 + Math.random() * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.85;

      const v = new THREE.Vector3(
        radius * Math.cos(phi) * Math.sin(theta),
        radius * Math.sin(phi),
        radius * Math.cos(phi) * Math.cos(theta)
      );
      nodeCoords.push(v);

      // Node Sphere (Gleaming Pearl / Cyan)
      const isSpecial = i % 4 === 0;
      const nodeColor = isSpecial ? 0x38bdf8 : (i % 3 === 0 ? 0x818cf8 : 0x93c5fd);
      const nodeGeo = new THREE.SphereGeometry(isSpecial ? 0.22 : 0.14, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: nodeColor,
        emissive: nodeColor,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.8
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(v);
      latticeGroup.add(nodeMesh);
      nodeMeshes.push(nodeMesh);

      // Outer Halo Ring for Special Nodes
      if (isSpecial) {
        const ringGeo = new THREE.RingGeometry(0.35, 0.44, 24);
        const ringMat = new THREE.MeshBasicMaterial({
          color: nodeColor,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.copy(v);
        ringMesh.lookAt(camera.position);
        latticeGroup.add(ringMesh);
      }
    }

    // Connect Nodes with Vector Lines
    const lineEdges: Array<[THREE.Vector3, THREE.Vector3]> = [];
    const linePositions: number[] = [];
    const lineColors: number[] = [];

    for (let i = 0; i < totalNodes; i++) {
      for (let j = i + 1; j < totalNodes; j++) {
        const dist = nodeCoords[i].distanceTo(nodeCoords[j]);
        if (dist < 4.2) {
          lineEdges.push([nodeCoords[i], nodeCoords[j]]);
          linePositions.push(nodeCoords[i].x, nodeCoords[i].y, nodeCoords[i].z);
          linePositions.push(nodeCoords[j].x, nodeCoords[j].y, nodeCoords[j].z);

          const col = dist < 2.8 ? new THREE.Color(0x38bdf8) : new THREE.Color(0x818cf8);
          lineColors.push(col.r, col.g, col.b);
          lineColors.push(col.r, col.g, col.b);
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      linewidth: 1.5
    });
    const networkLines = new THREE.LineSegments(lineGeo, lineMat);
    latticeGroup.add(networkLines);

    // Laser Light Pulses Travelling Along Edge Lines
    const pulseCount = 14;
    const pulseMeshes: Array<{
      lineIdx: number;
      progress: number;
      speed: number;
      mesh: THREE.Mesh;
    }> = [];

    const pulseGeo = new THREE.SphereGeometry(0.1, 8, 8);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0x67e8f9 });

    for (let p = 0; p < pulseCount && lineEdges.length > 0; p++) {
      const lineIdx = Math.floor(Math.random() * lineEdges.length);
      const pm = new THREE.Mesh(pulseGeo, pulseMat);
      latticeGroup.add(pm);
      pulseMeshes.push({
        lineIdx,
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.012,
        mesh: pm
      });
    }
    networkPulsesRef.current = pulseMeshes;

    // Floating Threat Badges ("THREAT DETECTED" & "ATTACK BLOCKED")
    const badgeThreatTex = createThreatBadgeTexture('THREAT DETECTED', 'threat');
    const badgeThreatMat = new THREE.MeshBasicMaterial({
      map: badgeThreatTex,
      transparent: true,
      side: THREE.DoubleSide
    });
    const badgeThreatGeo = new THREE.PlaneGeometry(3.6, 1.0);
    const badgeThreatMesh = new THREE.Mesh(badgeThreatGeo, badgeThreatMat);
    badgeThreatMesh.position.set(-2.8, 1.8, 2.5);
    latticeGroup.add(badgeThreatMesh);

    const badgeBlockedTex = createThreatBadgeTexture('ATTACK BLOCKED', 'blocked');
    const badgeBlockedMat = new THREE.MeshBasicMaterial({
      map: badgeBlockedTex,
      transparent: true,
      side: THREE.DoubleSide
    });
    const badgeBlockedGeo = new THREE.PlaneGeometry(3.6, 1.0);
    const badgeBlockedMesh = new THREE.Mesh(badgeBlockedGeo, badgeBlockedMat);
    badgeBlockedMesh.position.set(2.4, -1.2, 3.2);
    latticeGroup.add(badgeBlockedMesh);

    // Floating Code Dossier Card Attached to Cyber Node
    const codeTex1 = createCodeCardTexture('PROCESS_MONITOR.ts', [
      'import { ZeroTrustShield } from "@cyber/core";',
      'const node = await verifyNode(0x89FA);',
      'if (packet.anomalyDetected()) {',
      '  isolateSubnet("192.168.1.104");',
      '  status: "ATTACK BLOCKED" // 200 OK',
      '}',
      'export default ZeroTrustShield;'
    ]);
    const codePlaneGeo1 = new THREE.PlaneGeometry(4.2, 2.8);
    const codePlaneMat1 = new THREE.MeshBasicMaterial({
      map: codeTex1,
      transparent: true,
      side: THREE.DoubleSide
    });
    const codePlane1 = new THREE.Mesh(codePlaneGeo1, codePlaneMat1);
    codePlane1.position.set(-3.6, -2.2, 1.8);
    codePlane1.rotation.y = 0.25;
    codePlane1.rotation.x = -0.1;
    latticeGroup.add(codePlane1);

    // =========================================================================
    // SCENE B: SOFTWARE DEV DISTRIBUTED WINDOWS (Video 0:03 - 0:04)
    // =========================================================================
    const codeGroup = new THREE.Group();
    masterWorld.add(codeGroup);
    codeWindowsGroupRef.current = codeGroup;

    // Array of 4 Tilted 3D IDE Windows in Depth Perspective
    const codeSnippets = [
      {
        title: 'ANALYZE_STREAM.py',
        lines: [
          'def analyze_neural_stream(dataset):',
          '    matrix = np.tensor(dataset)',
          '    val = await eval_latency(matrix)',
          '    ret = run_inference(val)',
          '    return {"status": "SUCCESS", "score": 0.998}'
        ],
        pos: new THREE.Vector3(-3.2, 2.4, -1.5),
        rotY: 0.35,
        rotX: -0.12
      },
      {
        title: 'SECURE_GATEWAY.ts',
        lines: [
          'export const authPipeline = async (req) => {',
          '  const token = req.headers["x-sathya-key"];',
          '  const verified = await verifySignature(token);',
          '  return verified ? HttpStatus.OK : 403;',
          '};'
        ],
        pos: new THREE.Vector3(3.6, 2.0, -0.8),
        rotY: -0.38,
        rotX: 0.08
      },
      {
        title: 'DATA_PIPELINE.tsx',
        lines: [
          'const Dashboard = ({ telemetry }) => {',
          '  const stats = useMemo(() => aggregate(telemetry), []);',
          '  return <ExecutiveMatrix data={stats} />;',
          '};'
        ],
        pos: new THREE.Vector3(4.2, -2.4, -2.0),
        rotY: -0.42,
        rotX: -0.1
      }
    ];

    codeSnippets.forEach((snip) => {
      const tex = createCodeCardTexture(snip.title, snip.lines);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        side: THREE.DoubleSide
      });
      const geo = new THREE.PlaneGeometry(4.4, 2.9);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(snip.pos);
      mesh.rotation.y = snip.rotY;
      mesh.rotation.x = snip.rotX;
      codeGroup.add(mesh);
    });

    // =========================================================================
    // SCENE C: HOLOGRAPHIC 3D EARTH GLOBE & REVOLVING ANALYTICS ORBIT (Video 0:05 - 0:09)
    // =========================================================================
    const globeSystem = new THREE.Group();
    masterWorld.add(globeSystem);
    globeSystemGroupRef.current = globeSystem;

    // 1. Central Holographic Core Globe
    const globeGeo = new THREE.SphereGeometry(3.0, 36, 36);
    const globeMat = new THREE.MeshStandardMaterial({
      color: 0x070e1a,
      emissive: 0x030814,
      roughness: 0.2,
      metalness: 0.85,
      transparent: true,
      opacity: 0.88
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeSystem.add(globeMesh);

    // 2. Wireframe Lat/Long Meridian Shell
    const wireGeo = new THREE.WireframeGeometry(new THREE.SphereGeometry(3.05, 20, 16));
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25
    });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    globeSystem.add(wireMesh);

    // 3. Glowing Global Constellation Landmass Points
    const globePointsCount = 650;
    const gPointsGeo = new THREE.BufferGeometry();
    const gPos = new Float32Array(globePointsCount * 3);
    const gColors = new Float32Array(globePointsCount * 3);

    const cCyan = new THREE.Color(0x38bdf8);
    const cAmber = new THREE.Color(0xf59e0b);
    const cWhite = new THREE.Color(0xffffff);

    for (let k = 0; k < globePointsCount; k++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 3.08;

      const gx = r * Math.sin(phi) * Math.cos(theta);
      const gy = r * Math.sin(phi) * Math.sin(theta);
      const gz = r * Math.cos(phi);

      const k3 = k * 3;
      gPos[k3] = gx;
      gPos[k3 + 1] = gy;
      gPos[k3 + 2] = gz;

      const pick = k % 4 === 0 ? cAmber : (k % 2 === 0 ? cCyan : cWhite);
      gColors[k3] = pick.r;
      gColors[k3 + 1] = pick.g;
      gColors[k3 + 2] = pick.b;
    }

    gPointsGeo.setAttribute('position', new THREE.BufferAttribute(gPos, 3));
    gPointsGeo.setAttribute('color', new THREE.BufferAttribute(gColors, 3));

    const gPointsMat = new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const globePointsMesh = new THREE.Points(gPointsGeo, gPointsMat);
    globeSystem.add(globePointsMesh);

    // 4. Dual Gyroscopic Orbital Laser Rings (Cyan & Gold)
    const orbitalRingGroup = new THREE.Group();
    globeSystem.add(orbitalRingGroup);
    orbitalRingGroupRef.current = orbitalRingGroup;

    // Cyan Primary Ring
    const ring1Geo = new THREE.TorusGeometry(5.2, 0.04, 16, 140);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.8
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2.8;
    orbitalRingGroup.add(ring1);

    // Amber/Gold Secondary Ring
    const ring2Geo = new THREE.TorusGeometry(6.4, 0.035, 16, 160);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.7
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3.4;
    ring2.rotation.y = Math.PI / 6;
    orbitalRingGroup.add(ring2);

    // 5. Revolving Holographic Glass Dashboard Carousel Array (Video 0:08)
    const dashboardRingGroup = new THREE.Group();
    globeSystem.add(dashboardRingGroup);
    dashboardRingGroupRef.current = dashboardRingGroup;

    const cardTypes: Array<'line' | 'bar' | 'gauge' | 'shield' | 'wireframe' | 'map'> = [
      'line',
      'bar',
      'gauge',
      'shield',
      'wireframe',
      'map'
    ];

    const orbitRadius = 6.2;
    const cardMeshes: THREE.Mesh[] = [];

    cardTypes.forEach((ctype, idx) => {
      const angle = (idx / cardTypes.length) * Math.PI * 2;
      const tex = createAnalyticsDashboardTexture(ctype);
      const cardMat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        side: THREE.DoubleSide
      });
      const cardGeo = new THREE.PlaneGeometry(3.0, 2.1);
      const mesh = new THREE.Mesh(cardGeo, cardMat);

      // Position in circular carousel
      mesh.position.set(
        Math.cos(angle) * orbitRadius,
        (Math.sin(angle * 2) * 0.4) - 0.2,
        Math.sin(angle) * orbitRadius
      );
      // Face outward tangentially
      mesh.rotation.y = -angle + Math.PI / 2;
      dashboardRingGroup.add(mesh);
      cardMeshes.push(mesh);
    });

    // 6. FLOATING NEURAL STAR CLOUD DUST
    const starCount = 500;
    const starsGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let s = 0; s < starCount * 3; s += 3) {
      starPos[s] = (Math.random() - 0.5) * 55;
      starPos[s + 1] = (Math.random() - 0.5) * 45;
      starPos[s + 2] = (Math.random() - 0.5) * 35;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.07,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    const starField = new THREE.Points(starsGeo, starMat);
    scene.add(starField);

    // 7. MOUSE PARALLAX
    const onPointerMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
    };
    window.addEventListener('mousemove', onPointerMove, { passive: true });

    // 8. RESIZE
    const onResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth || window.innerWidth;
      const h = mountRef.current.clientHeight || window.innerHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // 9. 60FPS CINEMATIC RENDER LOOP
    let animId: number;
    const clock = new THREE.Clock();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const time = clock.getElapsedTime();

      // Smooth Spring Scroll Interpolation
      scrollCurrentRef.current += (scrollTargetRef.current - scrollCurrentRef.current) * 0.085;
      const p = THREE.MathUtils.clamp(scrollCurrentRef.current, 0, 1);

      // Smooth Parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const isNarrow = window.innerWidth < 1024;

      // =======================================================================
      // STAGE CHOREOGRAPHY (Coordinated with Video 0:00 -> 0:09 & User Scroll)
      // =======================================================================
      // Scroll 0.00 - 0.35: Scene A (Cyber Security Threat Lattice) in full prominence
      // Scroll 0.35 - 0.70: Scene B (Software Dev Code Windows) sweeps forward
      // Scroll 0.70 - 1.00: Scene C (Global 3D Earth & Revolving Analytics Orbit) takes center stage
      // =======================================================================

      let targetPosX = 0;
      let targetPosY = 0;
      let targetPosZ = 0;
      let targetRotY = 0;
      let targetRotX = 0;

      if (isNarrow) {
        targetPosX = 0;
        targetPosY = 1.2 - p * 3.5;
        targetPosZ = -2.0 - p * 8.0;
        targetRotY = mx * 0.15;
        targetRotX = -my * 0.1;
      } else {
        if (p < 0.30) {
          // Hero Anchor (Right Column)
          const sp = p / 0.30;
          targetPosX = 5.2 - sp * 1.5;
          targetPosY = 0.2 - sp * 0.4;
          targetPosZ = -1.0 - sp * 2.0;
          targetRotY = -0.15 + mx * 0.12 + sp * 0.1;
          targetRotX = 0.05 - my * 0.08;
        } else if (p < 0.65) {
          // Section 02 & 03 (Glides to Left Flank & Mid Stage)
          const sp = (p - 0.30) / 0.35;
          targetPosX = 3.7 - sp * 8.2;
          targetPosY = -0.2 + Math.sin(sp * Math.PI) * 0.5;
          targetPosZ = -3.0 - Math.sin(sp * Math.PI) * 1.5;
          targetRotY = 0.15 + mx * 0.12;
          targetRotX = -my * 0.08;
        } else {
          // Section 04, 05 & 06 (Centers in Depth for Global Analytics Orbit)
          const sp = (p - 0.65) / 0.35;
          targetPosX = -4.5 + sp * 7.5;
          targetPosY = 0.2 - sp * 0.4;
          targetPosZ = -4.5 - sp * 2.5;
          targetRotY = -0.1 + mx * 0.1;
          targetRotX = -my * 0.06;
        }
      }

      // Smooth Position & Rotation of Master World
      if (worldGroupRef.current) {
        const wg = worldGroupRef.current;
        wg.position.x += (targetPosX - wg.position.x) * 0.08;
        wg.position.y += (targetPosY - wg.position.y) * 0.08;
        wg.position.z += (targetPosZ - wg.position.z) * 0.08;

        const floatBreath = Math.sin(time * 0.9) * 0.03;
        wg.rotation.y += (targetRotY + floatBreath - wg.rotation.y) * 0.08;
        wg.rotation.x += (targetRotX - wg.rotation.x) * 0.08;
      }

      // 1. Cyber Security Network Dynamics
      if (latticeGroup) {
        latticeGroup.rotation.y = time * 0.12;
        latticeGroup.rotation.x = Math.sin(time * 0.2) * 0.08;

        // Threat badge floating bounce
        badgeThreatMesh.position.y = 1.8 + Math.sin(time * 2.0) * 0.15;
        badgeBlockedMesh.position.y = -1.2 + Math.cos(time * 1.8) * 0.12;

        // Animate Laser Light Pulses along lines
        pulseMeshes.forEach((pulse) => {
          pulse.progress += pulse.speed;
          if (pulse.progress > 1.0) {
            pulse.progress = 0;
            pulse.lineIdx = Math.floor(Math.random() * lineEdges.length);
          }
          if (lineEdges[pulse.lineIdx]) {
            const [pA, pB] = lineEdges[pulse.lineIdx];
            pulse.mesh.position.lerpVectors(pA, pB, pulse.progress);
          }
        });
      }

      // 2. Software Dev Code Windows Dynamics
      if (codeWindowsGroupRef.current) {
        const cg = codeWindowsGroupRef.current;
        cg.rotation.y = Math.sin(time * 0.4) * 0.06;
        cg.children.forEach((child, i) => {
          child.position.y = snipOriginalY(i) + Math.sin(time * 1.2 + i) * 0.18;
        });
      }

      // 3. Holographic 3D Earth Globe & Revolving Analytics Orbit Dynamics
      if (globeSystemGroupRef.current) {
        globeMesh.rotation.y = time * 0.18;
        wireMesh.rotation.y = time * 0.12;
        wireMesh.rotation.x = Math.sin(time * 0.15) * 0.05;
        globePointsMesh.rotation.y = time * 0.22;

        // Orbital Laser Rings
        if (orbitalRingGroupRef.current) {
          orbitalRingGroupRef.current.rotation.z = time * 0.25;
          orbitalRingGroupRef.current.rotation.y = time * 0.15;
        }

        // Revolving Dashboard Carousel (Video 0:08)
        if (dashboardRingGroupRef.current) {
          dashboardRingGroupRef.current.rotation.y = -time * 0.28;
          // Subtly oscillate individual cards
          dashboardRingGroupRef.current.children.forEach((c, ci) => {
            c.position.y = (Math.sin(time * 1.5 + ci) * 0.25) - 0.2;
          });
        }
      }

      // Dynamic Spot/Point Light Orbit Follow
      if (keyPointLightRef.current && worldGroupRef.current) {
        const wx = worldGroupRef.current.position.x;
        const wy = worldGroupRef.current.position.y;
        keyPointLightRef.current.position.set(
          wx + 5.0 + Math.sin(time * 1.4) * 1.5,
          wy + 4.0 + Math.cos(time * 1.1) * 1.5,
          12
        );
      }

      // Camera Floating Parallax
      if (cameraRef.current) {
        cameraRef.current.position.x = mx * 0.6;
        cameraRef.current.position.y = my * 0.45;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    function snipOriginalY(idx: number) {
      if (idx === 0) return 2.4;
      if (idx === 1) return 2.0;
      return -2.4;
    }

    renderLoop();

    // 10. CLEANUP
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', onResize);
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
      style={{ opacity: 1 }}
      aria-hidden="true"
    />
  );
};
