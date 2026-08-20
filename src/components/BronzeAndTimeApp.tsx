import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PORTFOLIO_PROFILE, ProjectCaseStudy } from '../data/portfolioData';
import profileImage from '../assets/profileImage';
import { 
  Shield, 
  Terminal, 
  Code2, 
  BarChart3, 
  X, 
  Mail, 
  FileDown, 
  Send, 
  CheckCircle2, 
  ArrowUpRight, 
  ExternalLink,
  Github,
  Linkedin,
  Phone,
  Layers,
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';
import { cyberAudio } from '../utils/soundEngine';
import confetti from 'canvas-confetti';

const ASSET_BASE_URL = "https://api.getlayers.ai/storage/v1/object/public/public/assets/laocoon-59f84455c6";

export const BronzeAndTimeApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [activeToolkitTab, setActiveToolkitTab] = useState<string>('cyber_security');

  // Toggle Sound
  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    cyberAudio.setMuted(next);
    if (!next) cyberAudio.playKeyClick();
  };

  // Three.js and Animation Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let gltfModel: THREE.Group | undefined;
    let modelPivot: THREE.Group | undefined;
    let mixer: THREE.AnimationMixer | undefined;
    const clock = new THREE.Clock();
    let currentScroll = 0;

    let mouseX = 0, mouseY = 0, targetMouseX = 0, targetMouseY = 0;
    let cursorX = window.innerWidth / 2, cursorY = window.innerHeight / 2;
    let outerCursorX = window.innerWidth / 2, outerCursorY = window.innerHeight / 2;

    let bgMaterial: THREE.ShaderMaterial | undefined;
    const shaderUniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 }
    };

    let sparkParticles: THREE.Points | undefined;
    const sparkCount = 450;
    const sparkData: Array<{
      speedX: number;
      speedY: number;
      speedZ: number;
      swaySpeed: number;
      swayRadius: number;
      phase: number;
    }> = [];

    const sizes = { width: window.innerWidth, height: window.innerHeight };

    // Initialize Scene & Camera
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    scene.fog = new THREE.FogExp2('#000000', 0.01);

    camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(0, 0.2, 3.0);
    scene.add(camera);

    // Background Liquid Bronze Shader
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform float uScroll;

      float hash(float n) { return fract(sin(n) * 43758.5453123); }
      float noise(in vec3 x) {
        vec3 p = floor(x);
        vec3 f = fract(x);
        f = f*f*(3.0-2.0*f);
        float n = p.x + p.y*57.0 + 113.0*p.z;
        return mix(mix(mix(hash(n+  0.0), hash(n+  1.0), f.x),
                       mix(hash(n+ 57.0), hash(n+ 58.0), f.x), f.y),
                   mix(mix(hash(n+113.0), hash(n+114.0), f.x),
                       mix(hash(n+170.0), hash(n+171.0), f.x), f.y), f.z);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
        float aspect = uResolution.x / uResolution.y;
        
        float time = uTime * 0.08;
        float scroll = uScroll;
        
        float angle1 = 0.6;
        float angle2 = -0.7;
        float angle3 = 1.2;
        
        float freq1 = 2.4;
        float freq2 = 3.2;
        float freq3 = 4.0;
        
        vec2 warpedUv = uv;
        float scrollDeform = scroll * 5.0;
        
        warpedUv.x += sin(uv.y * 2.5 + time * 0.2 + scrollDeform) * 0.35;
        warpedUv.y += cos(uv.x * 2.5 - time * 0.15 - scrollDeform * 0.8) * 0.35;
        
        warpedUv.x += sin(uv.y * 1.2 - time * 0.1 - scrollDeform * 1.5) * 0.25;
        warpedUv.y += cos(uv.x * 1.2 + time * 0.18 + scrollDeform * 1.2) * 0.25;
        
        vec2 scrollDrift = vec2(scroll * 0.04, -scroll * 0.02);
        vec2 mouseShift = vec2(uMouse.x * aspect * 0.05, uMouse.y * 0.05);
        warpedUv += scrollDrift + mouseShift;
        
        vec2 dir1 = vec2(cos(angle1), sin(angle1));
        vec2 dir2 = vec2(cos(angle2), sin(angle2));
        vec2 dir3 = vec2(cos(angle3), sin(angle3));
        
        float w1 = sin(dot(warpedUv, dir1) * freq1 + time * 1.0);
        float w2 = cos(dot(warpedUv, dir2) * freq2 - time * 1.4 + w1 * 0.4);
        float w3 = sin(dot(warpedUv, dir3) * freq3 + time * 1.8 + w2 * 0.5);
        
        float waveField = w1 * 0.50 + w2 * 0.35 + w3 * 0.15;
        
        float wideSheen = pow(max(0.0, 1.0 - abs(waveField - 0.1)), 2.5);
        float crispSpecular = pow(max(0.0, 1.0 - abs(waveField - 0.15)), 8.0);
        float crest = wideSheen * 0.5 + crispSpecular * 0.9;
        
        vec3 c0_shadow = vec3(0.0010, 0.0006, 0.0004);
        vec3 c0_wave1  = vec3(0.085, 0.040, 0.015);
        vec3 c0_wave2  = vec3(0.050, 0.022, 0.008);
        vec3 c0_crest  = vec3(0.45, 0.30, 0.18);
        
        vec3 c1_shadow = vec3(0.0004, 0.0006, 0.0012);
        vec3 c1_wave1  = vec3(0.015, 0.035, 0.065);
        vec3 c1_wave2  = vec3(0.008, 0.020, 0.045);
        vec3 c1_crest  = vec3(0.18, 0.35, 0.55);
        
        float t = smoothstep(0.0, 1.0, scroll);
        vec3 colShadow = mix(c0_shadow, c1_shadow, t);
        vec3 colWave1  = mix(c0_wave1, c1_wave1, t);
        vec3 colWave2  = mix(c0_wave2, c1_wave2, t);
        vec3 colCrest  = mix(c0_crest, c1_crest, t);
        
        vec3 color = colShadow;
        color = mix(color, colWave2, smoothstep(-0.6, 0.2, waveField));
        color = mix(color, colWave1, smoothstep(0.0, 0.8, waveField));
        color += colCrest * crest * 1.4;
        
        float vignette = 1.0 - dot(uv, uv) * 0.12;
        color *= vignette;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    bgMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: shaderUniforms,
      depthWrite: false,
      depthTest: false
    });

    const bgGeometry = new THREE.PlaneGeometry(30, 30);
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    bgMesh.position.set(0.0, 0.0, -8.0);
    bgMesh.renderOrder = -10;
    camera.add(bgMesh);

    // Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.2;

    // Dramatic Lighting (Chiaroscuro)
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.1);
    scene.add(ambientLight);

    const keyLight = new THREE.SpotLight('#ffffff', 18.0);
    keyLight.position.set(4, 6, 3);
    keyLight.angle = Math.PI / 4;
    keyLight.penumbra = 0.9;
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 1.0;
    keyLight.shadow.camera.far = 15;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#e3f2ff', 10.0);
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight('#fff3e6', 0.8);
    fillLight.position.set(-2, -4, 2);
    scene.add(fillLight);

    // Forge Sparks Generator
    const sparkCanvas = document.createElement('canvas');
    sparkCanvas.width = 16;
    sparkCanvas.height = 16;
    const ctx = sparkCanvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.85)');
      gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const sparkTexture = new THREE.CanvasTexture(sparkCanvas);

    const sparkGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(sparkCount * 3);
    const colors = new Float32Array(sparkCount * 3);

    for (let i = 0; i < sparkCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5.0 - 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6.5;

      if (Math.random() < 0.6) {
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.15;
        colors[i * 3 + 2] = 0.05 + Math.random() * 0.1;
      } else {
        colors[i * 3] = 0.55 + Math.random() * 0.15;
        colors[i * 3 + 1] = 0.82 + Math.random() * 0.12;
        colors[i * 3 + 2] = 1.0;
      }

      sparkData.push({
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: 0.15 + Math.random() * 0.3,
        speedZ: (Math.random() - 0.5) * 0.4,
        swaySpeed: 0.5 + Math.random() * 1.5,
        swayRadius: 0.05 + Math.random() * 0.15,
        phase: Math.random() * Math.PI * 2
      });
    }

    sparkGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    sparkGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const sparkMat = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: sparkTexture
    });

    sparkParticles = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparkParticles);

    // Load Bronze Horse Sculpture
    const loader = new GLTFLoader();
    loader.load(
      ASSET_BASE_URL + '/bronze_horse.glb',
      (gltf) => {
        gltfModel = gltf.scene;

        modelPivot = new THREE.Group();
        scene.add(modelPivot);
        modelPivot.add(gltfModel);

        gltfModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = 0.42;
              mat.metalness = 0.92;
              mat.flatShading = false;
              if (mat.map) {
                mat.map.anisotropy = 16;
              }
            }
          }
        });

        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(gltfModel);
          gltf.animations.forEach((clip) => {
            mixer?.clipAction(clip).play();
          });
        }

        // Auto-scale to max dim = 3.5
        const boxInitial = new THREE.Box3().setFromObject(gltfModel);
        const sizeInitial = boxInitial.getSize(new THREE.Vector3());
        const maxDim = Math.max(sizeInitial.x, sizeInitial.y, sizeInitial.z);
        const targetScale = 3.5 / (maxDim > 0.0001 ? maxDim : 1);
        gltfModel.scale.setScalar(targetScale);

        gltfModel.updateMatrixWorld(true);

        const boxScaled = new THREE.Box3().setFromObject(gltfModel);
        const centerScaled = boxScaled.getCenter(new THREE.Vector3());

        gltfModel.position.sub(centerScaled);
        modelPivot.position.y = -0.4;
      },
      undefined,
      (err) => console.error("Error loading model:", err)
    );

    // Split title letters for blur-up animation
    const titles = document.querySelectorAll('.slide-title');
    titles.forEach((title) => {
      const text = title.innerHTML;
      if (title.getAttribute('data-split') === 'true') return;
      title.setAttribute('data-split', 'true');

      let newHTML = '';
      let delayCounter = 0;
      const parts = text.split(/(<br\s*\/?>)/i);
      parts.forEach((part) => {
        if (part.toLowerCase().startsWith('<br')) {
          newHTML += part;
        } else {
          for (let i = 0; i < part.length; i++) {
            if (part[i] === ' ') {
              newHTML += ' ';
            } else {
              newHTML += `<span class="char" style="transition-delay: ${delayCounter * 0.035}s">${part[i]}</span>`;
              delayCounter++;
            }
          }
        }
      });
      title.innerHTML = newHTML;
    });

    // Pointer events
    const handleMouseMove = (event: MouseEvent) => {
      cursorX = event.clientX;
      cursorY = event.clientY;
      const cursorInner = document.querySelector('.cursor-inner') as HTMLElement;
      if (cursorInner) {
        cursorInner.style.left = `${cursorX}px`;
        cursorInner.style.top = `${cursorY}px`;
      }
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      if (shaderUniforms) shaderUniforms.uResolution.value.set(sizes.width, sizes.height);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // Slides & Stories updater
    const updateSlides = (scroll: number) => {
      const slide1 = document.getElementById('slide-1');
      const slide2 = document.getElementById('slide-2');
      const slide3 = document.getElementById('slide-3');
      const slide4 = document.getElementById('slide-4');

      for (let i = 1; i <= 4; i++) {
        const fill = document.getElementById(`dash-fill-${i}`);
        if (fill) {
          const start = (i - 1) * 0.25;
          const end = i * 0.25;
          let progress = (scroll - start) / (end - start);
          progress = Math.max(0, Math.min(1, progress));
          fill.style.height = `${progress * 100}%`;
        }
      }

      const isActive = (val: number, start: number, end: number) => val >= start && val <= end;

      if (slide1) slide1.classList.toggle('active', isActive(scroll, -0.10, 0.12));
      if (slide2) {
        const active2 = isActive(scroll, 0.28, 0.40);
        slide2.classList.toggle('active', active2);
        const slide2Img = document.getElementById('slide-2-img');
        if (slide2Img) slide2Img.classList.toggle('active', active2);
      }
      if (slide3) slide3.classList.toggle('active', isActive(scroll, 0.56, 0.68));
      if (slide4) slide4.classList.toggle('active', isActive(scroll, 0.84, 1.05));
    };

    const updateGridDots = (scroll: number) => {
      const dots = document.querySelectorAll('.grid-dot');
      dots.forEach((dot, i) => {
        const el = dot as HTMLElement;
        const startY = (i * 17) % 80 + 10;
        let speed = 90 + (i * 55) % 180;
        if (i % 2 === 0) speed = -speed;
        let y = startY + scroll * speed;
        y = ((y % 100) + 100) % 100;
        el.style.top = `${y}%`;
      });
    };

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const deltaTime = clock.getDelta();
      if (mixer) mixer.update(deltaTime);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY !== undefined ? window.scrollY
        : (window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop);
      const targetScroll = maxScroll > 0 ? scrollTop / maxScroll : 0;

      currentScroll += (targetScroll - currentScroll) * 0.025;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      outerCursorX += (cursorX - outerCursorX) * 0.2;
      outerCursorY += (cursorY - outerCursorY) * 0.2;
      const cursorOuter = document.querySelector('.cursor-outer') as HTMLElement;
      if (cursorOuter) {
        cursorOuter.style.left = `${outerCursorX}px`;
        cursorOuter.style.top = `${outerCursorY}px`;
      }

      if (modelPivot) {
        modelPivot.rotation.y = mouseX * 0.25;
        modelPivot.rotation.x = mouseY * 0.15;
      }

      // Forge Sparks Physics
      if (sparkParticles) {
        const posArray = sparkParticles.geometry.attributes.position.array as Float32Array;
        const time = clock.getElapsedTime();
        const scrollVelocity = Math.abs(targetScroll - currentScroll);
        const speedMultiplier = 1.0 + scrollVelocity * 9.0;
        const turbulence = scrollVelocity * 0.8;

        for (let i = 0; i < sparkCount; i++) {
          const idx = i * 3;
          const data = sparkData[i];
          posArray[idx]     += data.speedX * deltaTime * speedMultiplier;
          posArray[idx + 1] += data.speedY * deltaTime * speedMultiplier;
          posArray[idx + 2] += data.speedZ * deltaTime * speedMultiplier;

          const currentSway = data.swayRadius * (1.0 + turbulence * 4.0);
          posArray[idx]     += Math.sin(time * data.swaySpeed + data.phase) * currentSway * deltaTime;
          posArray[idx + 2] += Math.cos(time * data.swaySpeed + data.phase) * currentSway * deltaTime;

          if (posArray[idx + 1] > 3.0 || Math.abs(posArray[idx]) > 3.5 || Math.abs(posArray[idx + 2]) > 3.5) {
            posArray[idx + 1] = -2.5;
            posArray[idx]     = (Math.random() - 0.5) * 3.0;
            posArray[idx + 2] = (Math.random() - 0.5) * 3.0;
          }
        }
        sparkParticles.geometry.attributes.position.needsUpdate = true;
      }

      // Camera Orbit
      const phi = currentScroll * Math.PI * 2.0;
      const y = 0.35 + Math.sin(currentScroll * Math.PI) * 0.8;
      const radius = 4.2 - Math.sin(currentScroll * Math.PI) * 0.6;
      const x = radius * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const transitionProgress = Math.min(1.0, currentScroll / 0.28);
      const easeFactor = (Math.cos(transitionProgress * Math.PI) + 1.0) * 0.5;
      const lookAtXOffset = -0.9 * easeFactor;
      const targetLookAt = new THREE.Vector3(lookAtXOffset, -0.15, 0);
      const targetPos = new THREE.Vector3(x, y, z);
      camera.position.lerp(targetPos, 0.025);
      camera.lookAt(targetLookAt);

      if (shaderUniforms) {
        shaderUniforms.uTime.value = clock.getElapsedTime();
        shaderUniforms.uMouse.value.set(mouseX, -mouseY);
        shaderUniforms.uScroll.value = currentScroll;
      }

      updateSlides(currentScroll);
      updateGridDots(currentScroll);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Smooth Navigation Jump
  const handleNavClick = (index: number) => {
    cyberAudio.playKeyClick();
    const targetScrolls = [0.0, 0.34, 0.62, 0.94];
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = maxScroll * targetScrolls[index];
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  // Contact Submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    cyberAudio.playSuccess();
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', message: '' });
      setActiveModal(null);
    }, 2500);
  };

  // Download CV
  const handleDownloadCV = () => {
    cyberAudio.playSuccess();
    const element = document.createElement('a');
    const file = new Blob([
      `SATHYA SAI JS - Resume\n\n` +
      `Role: Cyber Security Engineer • Software Developer • Data Analyst\n` +
      `Email: ${PORTFOLIO_PROFILE.email}\n` +
      `Phone: ${PORTFOLIO_PROFILE.phone}\n` +
      `Location: ${PORTFOLIO_PROFILE.location}\n` +
      `GitHub: ${PORTFOLIO_PROFILE.github}\n` +
      `LinkedIn: ${PORTFOLIO_PROFILE.linkedin}\n\n` +
      `Summary:\n${PORTFOLIO_PROFILE.bio}\n\n` +
      `Experience:\nTechnical Associate at Braiil Academy (2025 - Present)\n\n` +
      `Education:\n- B.E. Cyber Security, Sri Ram Engineering College (2024 - 2027)\n- Diploma in ECE, CPCL Polytechnic College (2020 - 2023)\n\n` +
      `Certifications:\n- Power BI Data Analytics\n- Data Analytics Certification\n- Python Programming\n- Cyber Security Fundamentals`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "Sathya_Sai_JS_Resume.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="relative w-full min-h-[900vh] bg-black text-white select-none">
      {/* Custom Cursors */}
      <div className="cursor-inner" />
      <div className="cursor-outer" />

      {/* Grid Overlay */}
      <div className="grid-horizontal-line" />
      <div className="grid-lines">
        <div className="grid-line">
          <div className="grid-dot top" />
          <div className="grid-dot bottom" />
        </div>
        <div className="grid-line">
          <div className="grid-dot top" />
          <div className="grid-dot bottom" />
        </div>
        <div className="grid-line">
          <div className="grid-dot top" />
          <div className="grid-dot bottom" />
        </div>
        <div className="grid-line">
          <div className="grid-dot top" />
          <div className="grid-dot bottom" />
        </div>
        <div className="grid-line story-progress-container">
          <div className="grid-dot top" />
          <div className="grid-dot bottom" />
          <div className="story-dashes">
            <div className="story-dash"><div className="story-dash-fill" id="dash-fill-1" /></div>
            <div className="story-dash"><div className="story-dash-fill" id="dash-fill-2" /></div>
            <div className="story-dash"><div className="story-dash-fill" id="dash-fill-3" /></div>
            <div className="story-dash"><div className="story-dash-fill" id="dash-fill-4" /></div>
          </div>
        </div>
      </div>

      {/* Fixed WebGL Canvas */}
      <canvas id="webgl" ref={canvasRef} />

      {/* Cinematic UI Overlay Container */}
      <div className="cinematic-container">
        {/* Main Header */}
        <header className="main-header">
          <div className="flex items-center gap-3">
            <div className="brand cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              {PORTFOLIO_PROFILE.name}
            </div>
            <span className="text-[10px] font-code text-white/40 tracking-widest uppercase hidden sm:inline">
              / {PORTFOLIO_PROFILE.brandMark}
            </span>
          </div>

          <nav className="header-nav">
            <button onClick={() => handleNavClick(0)} className="nav-link bg-transparent border-0">Bronze</button>
            <span className="nav-dot" />
            <button onClick={() => handleNavClick(1)} className="nav-link bg-transparent border-0">Marble</button>
            <span className="nav-dot" />
            <button onClick={() => handleNavClick(2)} className="nav-link bg-transparent border-0">Fluid</button>
            <span className="nav-dot" />
            <button onClick={() => handleNavClick(3)} className="nav-link bg-transparent border-0">Digital</button>
          </nav>

          <div className="header-actions flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              title="Toggle Sound"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handleDownloadCV}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 text-white text-[10px] font-code tracking-wider hover:bg-white/10 transition-colors"
            >
              <FileDown className="w-3 h-3" /> CV
            </button>

            <button
              onClick={() => {
                cyberAudio.playModalOpen();
                setActiveModal('portfolio');
              }}
              className="contact-btn"
            >
              Explore Portfolio <span className="btn-circle" />
            </button>
          </div>
        </header>

        {/* Slide 1: Bronze and Time */}
        <div className="slide active" id="slide-1">
          <h2 className="slide-title">Bronze <br />and Time</h2>
          <div className="desc-row">
            <p className="slide-desc col-1">
              A timeless material holding centuries of human history. Fluid in hot flames, eternal in its form. Each curve captures a tense, dramatic moment.
            </p>
            <p className="slide-desc col-2">
              Born of molten fire and creative will, it stands to bridge our ancient memory and modern vision. A fluid energy frozen in still, heavy bronze.
            </p>
          </div>
        </div>

        {/* Slide 2 Editorial Image Mask */}
        <div className="slide-image-mask" id="slide-2-img">
          <img src={profileImage} alt="Sathya Sai JS" className="w-full h-full object-cover object-center" />
        </div>

        {/* Slide 2: Marble Emotion */}
        <div className="slide" id="slide-2">
          <h2 className="slide-title">Marble <br />Emotion</h2>
          <p className="slide-desc">
            A sculpture frozen at the peak of human suffering and heroic struggle. Laocoön and his sons, bound by ruthless fate.
          </p>
        </div>

        {/* Slide 3: Liquid Metal */}
        <div className="slide" id="slide-3">
          <h2 className="slide-title">Liquid Metal</h2>
          <p className="slide-desc">
            Art that breathes. Mesmerizing waves of liquid bronze flow through space, reflecting every contour and tensed muscle of the ancient masterpiece.
          </p>
        </div>

        {/* Slide 4: Eternal Moment */}
        <div className="slide" id="slide-4">
          <h2 className="slide-title">Eternal <br />Moment</h2>
          <p className="slide-desc">
            Contemplating antique form through the lens of new dimensions. A classic masterpiece reborn in the currents of radiant digital matter.
          </p>
        </div>
      </div>

      {/* Floating Bottom Quick Hub */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 pointer-events-auto">
        <button
          onClick={() => {
            cyberAudio.playModalOpen();
            setActiveModal('portfolio');
          }}
          className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-code text-xs font-semibold backdrop-blur-md transition-all shadow-lg flex items-center gap-2"
        >
          <Layers className="w-3.5 h-3.5 text-[#fbcfe8]" />
          Sathya's Engineering Dossier
        </button>
      </div>

      {/* Sathya's Engineering & Portfolio Drawer Modal */}
      {activeModal === 'portfolio' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 backdrop-blur-xl bg-black/85 animate-fadeIn">
          <div className="modal-glass relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-10 border border-white/20 text-white shadow-2xl">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#fbcfe8]" />
                </div>
                <div>
                  <h3 className="font-bold text-xl sm:text-2xl text-white font-manrope">
                    {PORTFOLIO_PROFILE.name}
                  </h3>
                  <p className="text-xs font-code text-white/50 tracking-wider">
                    {PORTFOLIO_PROFILE.roleTitle}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  cyberAudio.playModalClose();
                  setActiveModal(null);
                }}
                className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-8">
              <div className="w-full aspect-square rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-white/5">
                <img src={profileImage} alt="Sathya Sai JS" className="w-full h-full object-cover object-center" />
              </div>
              <div className="md:col-span-2 space-y-3 font-manrope">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-code">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {PORTFOLIO_PROFILE.availability}
                </div>
                <h4 className="text-xl font-bold text-white">{PORTFOLIO_PROFILE.aboutHeadline}</h4>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                  {PORTFOLIO_PROFILE.bio}
                </p>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {PORTFOLIO_PROFILE.stats.map((st, i) => (
                    <div key={i} className="minimal-card p-3 rounded-xl text-center">
                      <div className="text-base font-bold text-[#fbcfe8]">{st.value}</div>
                      <div className="text-[9px] text-white/50 font-code uppercase">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Projects */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between">
                <span className="text-xs font-code font-bold tracking-widest text-[#fbcfe8] uppercase">
                  SELECTED PRODUCTION CASE STUDIES
                </span>
                <span className="text-xs font-code text-white/40">04 ARCHITECTURES</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PORTFOLIO_PROFILE.projects.map((proj) => (
                  <div key={proj.id} className="minimal-card p-5 rounded-2xl space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-code text-[#fbcfe8] tracking-widest">{proj.category}</span>
                        <span className="text-xs font-code text-white/30">{proj.number}</span>
                      </div>
                      <h5 className="font-bold text-sm text-white">{proj.title}</h5>
                      <p className="text-xs text-white/70 leading-relaxed">{proj.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="flex flex-wrap gap-1">
                        {proj.tags.slice(0, 3).map((t, ti) => (
                          <span key={ti} className="px-2 py-0.5 rounded bg-white/10 text-[9px] font-code text-white/80">{t}</span>
                        ))}
                      </div>
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-code font-bold text-[#fbcfe8] hover:underline flex items-center gap-1"
                      >
                        Code <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Toolkit Radar */}
            <div className="space-y-4 mb-8">
              <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
                {PORTFOLIO_PROFILE.toolkitCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      cyberAudio.playKeyClick();
                      setActiveToolkitTab(cat.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-code font-bold transition-all ${
                      activeToolkitTab === cat.id
                        ? 'bg-[#fbcfe8] text-black'
                        : 'text-white/60 hover:text-white bg-white/5'
                    }`}
                  >
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {PORTFOLIO_PROFILE.toolkitCategories
                  .find((c) => c.id === activeToolkitTab)?.skills.map((skill, idx) => (
                    <div key={idx} className="minimal-card p-3 rounded-xl flex items-center justify-between text-xs">
                      <span className="text-white/90 font-medium">{skill}</span>
                      <span className="text-[10px] font-code text-emerald-400">PRO</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Direct Connect & Socials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div className="space-y-3">
                <span className="text-xs font-code font-bold tracking-widest text-[#fbcfe8] uppercase">
                  DIRECT TRANSMISSION
                </span>
                <p className="text-xs text-white/70">
                  Open for cyber defense roles, full-stack systems engineering, and data analytics consulting.
                </p>
                <div className="space-y-2 pt-1">
                  <div className="minimal-card p-3 rounded-xl flex items-center justify-between text-xs">
                    <span className="font-code text-white/80">{PORTFOLIO_PROFILE.email}</span>
                    <a href={`mailto:${PORTFOLIO_PROFILE.email}`} className="text-[#fbcfe8] hover:underline font-code text-[10px]">
                      SEND EMAIL
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={PORTFOLIO_PROFILE.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 minimal-card p-2.5 rounded-xl text-center text-xs font-code text-white/80 hover:text-white"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={PORTFOLIO_PROFILE.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 minimal-card p-2.5 rounded-xl text-center text-xs font-code text-white/80 hover:text-white"
                    >
                      GitHub (satboy-12)
                    </a>
                  </div>
                </div>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                />
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="your.email@domain.com"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                />
                <textarea
                  rows={2}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Project or message details..."
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30 resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-white text-black font-bold text-xs tracking-wider hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                >
                  {contactSubmitted ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Send className="w-3.5 h-3.5" />}
                  {contactSubmitted ? 'Message Sent' : 'Send Message'}
                </button>
              </form>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
