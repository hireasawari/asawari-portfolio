import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

/* ─────────────────────────────────────────
   GRID PLANE
   Infinite-scroll wireframe grid drifting
   toward the camera — evokes spreadsheets,
   coordinate systems, data tables.
───────────────────────────────────────── */
function GridPlane() {
  const ref = useRef<THREE.GridHelper>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.z = ((clock.getElapsedTime() * 0.3) % 1) - 0.5;
  });
  return (
    <gridHelper
      ref={ref}
      args={[22, 22, "#f9731630", "#f9731618"]}
      position={[0, -2.2, -2]}
      rotation={[Math.PI / 2 + 0.1, 0, 0]}
    />
  );
}

/* ─────────────────────────────────────────
   BAR CHART COLUMNS
   Animated 3D bars that breathe up and down
   like a live chart updating in real time.
───────────────────────────────────────── */
function BarChart() {
  const groupRef = useRef<THREE.Group>(null!);

  const BAR_COUNT = 9;
  const barData = useMemo(
    () =>
      Array.from({ length: BAR_COUNT }, (_, i) => ({
        baseH: 0.5 + Math.random() * 1.5,
        phase: (i / BAR_COUNT) * Math.PI * 2,
        speed: 0.38 + Math.random() * 0.28,
        x: (i - (BAR_COUNT - 1) / 2) * 0.52,
      })),
    []
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((bar, i) => {
      const d = barData[i];
      const h = Math.max(0.15, d.baseH + Math.sin(t * d.speed + d.phase) * 0.32);
      bar.scale.y = h;
      (bar as THREE.Mesh).position.y = h * 0.5 - 2.2;
    });
    groupRef.current.rotation.y = Math.sin(t * 0.055) * 0.06;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0.6]}>
      {barData.map((d, i) => {
        const t = i / (BAR_COUNT - 1);
        const color = new THREE.Color().lerpColors(
          new THREE.Color("#92400e"),
          new THREE.Color("#f97316"),
          t
        );
        return (
          <mesh key={i} position={[d.x, 0, 0]}>
            <boxGeometry args={[0.28, 1, 0.28]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.18}
              roughness={0.5}
              metalness={0.25}
              transparent
              opacity={0.85}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ─────────────────────────────────────────
   SCATTER PLOT
   3 clusters of small spheres floating in
   3D — looks like a statistical cluster plot
   or ML feature space visualization.
───────────────────────────────────────── */
function ScatterPlot() {
  const groupRef = useRef<THREE.Group>(null!);

  const points = useMemo(() => {
    const clusters = [
      { cx: -2.9, cy: 0.9,  count: 11, spread: 0.5,  color: "#fdba74" },
      { cx:  2.4, cy: -0.3, count: 10, spread: 0.42, color: "#f97316" },
      { cx: -0.8, cy: -1.2, count:  8, spread: 0.38, color: "#fb923c" },
    ];
    return clusters.flatMap(({ cx, cy, count, spread, color }) =>
      Array.from({ length: count }, () => ({
        x: cx + (Math.random() - 0.5) * spread * 2,
        y: cy + (Math.random() - 0.5) * spread * 2,
        z: -1.2 + (Math.random() - 0.5) * 1.0,
        r: 0.042 + Math.random() * 0.05,
        color,
        phase: Math.random() * Math.PI * 2,
      }))
    );
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.022;
    groupRef.current.children.forEach((mesh, i) => {
      mesh.position.y = points[i].y + Math.sin(t * 0.45 + points[i].phase) * 0.055;
    });
  });

  return (
    <group ref={groupRef}>
      {points.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.r, 8, 8]} />
          <meshStandardMaterial
            color={p.color}
            emissive={p.color}
            emissiveIntensity={0.28}
            roughness={0.4}
            metalness={0.1}
            transparent
            opacity={0.72}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────
   LINE CHART
   A smooth animated polyline across the
   scene — like a time-series chart or
   stock/sensor data stream.
───────────────────────────────────────── */
function LineChart() {
  const lineRef = useRef<THREE.Line>(null!);
  const POINTS = 42;

  const positions = useMemo(() => new Float32Array(POINTS * 3), []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < POINTS; i++) {
      const norm = i / (POINTS - 1);
      positions[i * 3]     = norm * 5.8 - 2.9;
      positions[i * 3 + 1] =
        -1.55 +
        Math.sin(norm * Math.PI * 2.8 + t * 0.55) * 0.36 +
        Math.sin(norm * Math.PI * 6.2 + t * 0.28) * 0.16 +
        norm * 0.28;
      positions[i * 3 + 2] = 1.4;
    }
    lineRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#fdba74" transparent opacity={0.5} />
    </line>
  );
}

/* ─────────────────────────────────────────
   SCENE ROOT
───────────────────────────────────────── */
export const HeroScene = () => (
  <Canvas
    camera={{ position: [0, 1.0, 7.2], fov: 46 }}
    dpr={[1, 1.5]}
    gl={{ antialias: true, alpha: true }}
    className="!absolute inset-0"
  >
    <Suspense fallback={null}>
      <ambientLight intensity={0.18} color="#fff7ed" />
      <pointLight position={[3, 5, 3]}    intensity={2.2} color="#f97316" distance={16} />
      <pointLight position={[-4, 0, -2]}  intensity={0.65} color="#92400e" distance={14} />
      <pointLight position={[0, -1, 5]}   intensity={0.3}  color="#fde68a" distance={10} />

      <GridPlane />
      <BarChart />
      <ScatterPlot />
      <LineChart />
    </Suspense>
  </Canvas>
);
