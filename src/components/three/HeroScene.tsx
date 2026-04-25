import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

/*
  DESIGN: Clayomorphism
  ─────────────────────
  • High roughness (0.85–1.0), zero metalness → matte clay feel
  • Strong emissive so shapes glow softly without harsh speculars
  • Puffy rounded geometry (spheres, capsule-like stacks, torus)
  • Soft warm lighting from above — single dominant key light
  • All shapes slightly oversized and bubbly

  LAYOUT
  ──────
  Shapes are spread ACROSS the full canvas but kept
  semi-transparent so text remains readable.
  Bar chart is the hero — centered-right.
  Floating blobs are background accents.
*/

/* ─────────────────────────────────────────
   CLAY MATERIAL FACTORY
   Shared material config for all clay shapes
───────────────────────────────────────── */
function clayMat(color: string, opacity = 0.72, emissiveIntensity = 0.28) {
  return {
    color,
    emissive: color,
    emissiveIntensity,
    roughness: 0.92,
    metalness: 0.0,
    transparent: true,
    opacity,
  };
}

/* ─────────────────────────────────────────
   BAR CHART — hero element
   Chunky rounded clay bars that breathe.
   Bars are given rounded tops via a sphere
   cap sitting on each box.
───────────────────────────────────────── */
function ClayBars() {
  const groupRef = useRef<THREE.Group>(null!);
  const BAR_COUNT = 8;

  const bars = useMemo(
    () =>
      Array.from({ length: BAR_COUNT }, (_, i) => ({
        baseH: 0.5 + Math.random() * 1.2,
        phase: (i / BAR_COUNT) * Math.PI * 2 + Math.random() * 0.4,
        speed: 0.22 + Math.random() * 0.14,
        x: (i - (BAR_COUNT - 1) / 2) * 0.72,
      })),
    []
  );

  // Store heights so caps can follow
  const heights = useRef<number[]>(bars.map((b) => b.baseH));

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const children = groupRef.current.children;

    bars.forEach((d, i) => {
      const h = Math.max(0.15, d.baseH + Math.sin(t * d.speed + d.phase) * 0.25);
      heights.current[i] = h;

      // Each bar is a <group> — drill into its two mesh children
      const barGroup = children[i] as THREE.Group;
      if (!barGroup?.children?.length) return;
      const bar = barGroup.children[0] as THREE.Mesh; // box body
      const cap = barGroup.children[1] as THREE.Mesh; // sphere cap

      bar.scale.y = h;
      bar.position.y = h * 0.5 - 1.9;
      cap.position.y = h - 1.9;
    });
  });

  const COLORS = [
    "#c2410c", "#ea580c", "#f97316",
    "#fb923c", "#fdba74", "#f97316",
    "#ea580c", "#c2410c",
  ];

  return (
    <group ref={groupRef} position={[1.2, 0, 0]}>
      {bars.map((d, i) => (
        <group key={i}>
          {/* body */}
          <mesh position={[d.x, 0, 0]}>
            <boxGeometry args={[0.52, 1, 0.52]} />
            <meshStandardMaterial {...clayMat(COLORS[i], 0.78)} />
          </mesh>
          {/* rounded cap */}
          <mesh position={[d.x, 0, 0]}>
            <sphereGeometry args={[0.28, 16, 16]} />
            <meshStandardMaterial {...clayMat(COLORS[i], 0.78, 0.35)} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────
   CLAY BLOB
   Soft icosphere-like sphere — the puffy
   accent shapes scattered in the scene.
───────────────────────────────────────── */
function ClayBlob({
  position,
  radius,
  color,
  opacity,
  speedX,
  speedY,
  floatAmp,
  floatPhase,
}: {
  position: [number, number, number];
  radius: number;
  color: string;
  opacity: number;
  speedX: number;
  speedY: number;
  floatAmp: number;
  floatPhase: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const baseY = position[1];

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * speedX;
    ref.current.rotation.y = t * speedY;
    ref.current.position.y = baseY + Math.sin(t * 0.5 + floatPhase) * floatAmp;
  });

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[radius, 1]} />
      <meshStandardMaterial {...clayMat(color, opacity, 0.22)} />
    </mesh>
  );
}

/* ─────────────────────────────────────────
   CLAY DONUT
   A thick puffy torus — looks like a clay
   donut chart segment.
───────────────────────────────────────── */
function ClayDonut({
  position,
  radius,
  tube,
  color,
  opacity,
  tiltX,
  tiltZ,
  speed,
}: {
  position: [number, number, number];
  radius: number;
  tube: number;
  color: string;
  opacity: number;
  tiltX: number;
  tiltZ: number;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const baseY = position[1];

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * speed;
    ref.current.rotation.x = tiltX + Math.sin(t * 0.09) * 0.06;
    ref.current.rotation.z = tiltZ;
    ref.current.position.y = baseY + Math.sin(t * 0.35 + 1.2) * 0.12;
  });

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[radius, tube, 20, 60]} />
      <meshStandardMaterial {...clayMat(color, opacity, 0.2)} />
    </mesh>
  );
}

/* ─────────────────────────────────────────
   SCENE ROOT
───────────────────────────────────────── */
export const HeroScene = () => (
  <Canvas
    camera={{ position: [0, 1.0, 8.0], fov: 48 }}
    dpr={[1, 1.5]}
    gl={{ antialias: true, alpha: true }}
    className="!absolute inset-0"
  >
    <Suspense fallback={null}>
      {/* Clay needs strong warm top light + soft fill */}
      <ambientLight intensity={0.35} color="#fff7ed" />
      <pointLight position={[0, 8, 4]} intensity={3.5} color="#ffffff" distance={22} />
      <pointLight position={[6, 4, 2]} intensity={1.6} color="#fed7aa" distance={18} />
      <pointLight position={[-5, 2, -2]} intensity={0.8} color="#f97316" distance={16} />
      <pointLight position={[0, -4, 3]} intensity={0.4} color="#7c2d12" distance={12} />

      {/* ── Background clay blobs ── */}
      {/* top-left accent */}
      <ClayBlob
        position={[-4.2, 1.8, -2.5]}
        radius={0.55}
        color="#f97316"
        opacity={0.35}
        speedX={0.04}
        speedY={0.06}
        floatAmp={0.18}
        floatPhase={0}
      />
      {/* top-right accent */}
      <ClayBlob
        position={[4.8, 1.5, -1.8]}
        radius={0.42}
        color="#fdba74"
        opacity={0.3}
        speedX={-0.05}
        speedY={0.04}
        floatAmp={0.14}
        floatPhase={1.2}
      />
      {/* bottom-left small */}
      <ClayBlob
        position={[-3.8, -1.6, -1.5]}
        radius={0.32}
        color="#fb923c"
        opacity={0.28}
        speedX={0.07}
        speedY={-0.05}
        floatAmp={0.12}
        floatPhase={2.4}
      />
      {/* far right mid */}
      <ClayBlob
        position={[5.2, -0.4, -2.0]}
        radius={0.48}
        color="#ea580c"
        opacity={0.25}
        speedX={0.03}
        speedY={0.08}
        floatAmp={0.16}
        floatPhase={0.8}
      />
      {/* small top-center */}
      <ClayBlob
        position={[-1.5, 2.8, -3.0]}
        radius={0.28}
        color="#fdba74"
        opacity={0.22}
        speedX={0.06}
        speedY={0.03}
        floatAmp={0.1}
        floatPhase={3.5}
      />

      {/* ── Clay donuts ── */}
      <ClayDonut
        position={[-4.5, 0.2, -2.8]}
        radius={1.1}
        tube={0.28}
        color="#f97316"
        opacity={0.28}
        tiltX={0.6}
        tiltZ={0.4}
        speed={0.04}
      />
      <ClayDonut
        position={[5.0, 0.8, -3.2]}
        radius={0.75}
        tube={0.2}
        color="#fdba74"
        opacity={0.22}
        tiltX={-0.5}
        tiltZ={-0.3}
        speed={-0.055}
      />

      {/* ── Hero bar chart ── */}
      <ClayBars />
    </Suspense>
  </Canvas>
);
