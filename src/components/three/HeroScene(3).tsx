import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

/*
  LAYOUT INTENT
  ─────────────
  All visuals are pushed to the RIGHT half
  (x > 1.0) and kept dim so the text card
  on the left stays fully readable.

  Depth layers:
    z = -3.0  →  donut rings (far back)
    z = -1.2  →  scatter dots (mid)
    z = -0.2  →  bar chart   (mid-front)
    z =  0.4  →  line chart  (front)
*/

/* ─────────────────────────────────────────
   DONUT RINGS
   Three partial arc rings at different tilts
   and speeds — look like pie/donut chart
   segments frozen mid-render, floating.
───────────────────────────────────────── */
function DonutRing({
  position,
  radius,
  tube,
  arc,
  tiltX,
  tiltZ,
  speed,
  color,
  opacity,
}: {
  position: [number, number, number];
  radius: number;
  tube: number;
  arc: number;
  tiltX: number;
  tiltZ: number;
  speed: number;
  color: string;
  opacity: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * speed;
    ref.current.rotation.x = tiltX + Math.sin(t * 0.07) * 0.03;
    ref.current.rotation.z = tiltZ;
  });
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[radius, tube, 6, 80, arc]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.18}
        roughness={0.5}
        metalness={0.1}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

function DonutRings() {
  return (
    <>
      {/* large outer ring — slow, nearly full arc */}
      <DonutRing
        position={[3.4, 0.1, -3.0]}
        radius={2.1}
        tube={0.045}
        arc={Math.PI * 1.55}
        tiltX={0.5}
        tiltZ={0.3}
        speed={0.03}
        color="#f97316"
        opacity={0.22}
      />
      {/* medium ring — counter-rotate, shorter arc */}
      <DonutRing
        position={[3.8, -0.3, -2.8]}
        radius={1.45}
        tube={0.032}
        arc={Math.PI * 1.1}
        tiltX={-0.4}
        tiltZ={-0.5}
        speed={-0.05}
        color="#fdba74"
        opacity={0.18}
      />
      {/* small inner ring — faster, tight arc */}
      <DonutRing
        position={[3.4, 0.1, -2.6]}
        radius={0.88}
        tube={0.022}
        arc={Math.PI * 0.75}
        tiltX={0.8}
        tiltZ={0.6}
        speed={0.07}
        color="#fb923c"
        opacity={0.16}
      />
      {/* accent thin ring — very slow, full circle */}
      <DonutRing
        position={[2.6, 0.8, -3.2]}
        radius={1.7}
        tube={0.014}
        arc={Math.PI * 2}
        tiltX={1.2}
        tiltZ={0.2}
        speed={0.018}
        color="#f97316"
        opacity={0.1}
      />
    </>
  );
}

/* ─────────────────────────────────────────
   BAR CHART
   7 animated columns that breathe slowly —
   live dashboard feel.
───────────────────────────────────────── */
function BarChart() {
  const groupRef = useRef<THREE.Group>(null!);
  const BAR_COUNT = 7;

  const bars = useMemo(
    () =>
      Array.from({ length: BAR_COUNT }, (_, i) => ({
        baseH: 0.4 + Math.random() * 1.0,
        phase: (i / BAR_COUNT) * Math.PI * 2,
        speed: 0.25 + Math.random() * 0.16,
        x: (i - (BAR_COUNT - 1) / 2) * 0.44,
      })),
    []
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((bar, i) => {
      const d = bars[i];
      const h = Math.max(0.1, d.baseH + Math.sin(t * d.speed + d.phase) * 0.2);
      bar.scale.y = h;
      (bar as THREE.Mesh).position.y = h * 0.5 - 1.6;
    });
  });

  return (
    <group ref={groupRef} position={[3.1, 0, -0.2]}>
      {bars.map((d, i) => {
        const ratio = i / (BAR_COUNT - 1);
        const color = new THREE.Color().lerpColors(
          new THREE.Color("#7c2d12"),
          new THREE.Color("#f97316"),
          ratio
        );
        return (
          <mesh key={i} position={[d.x, 0, 0]}>
            <boxGeometry args={[0.24, 1, 0.2]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.14}
              roughness={0.55}
              metalness={0.2}
              transparent
              opacity={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ─────────────────────────────────────────
   LINE CHART
   Smooth animated polyline — time-series /
   trend line feel.
───────────────────────────────────────── */
function LineChart() {
  const lineRef = useRef<THREE.Line>(null!);
  const POINTS = 38;
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
      positions[i * 3]     = 1.4 + norm * 3.8;
      positions[i * 3 + 1] =
        -1.1 +
        Math.sin(norm * Math.PI * 2.4 + t * 0.35) * 0.26 +
        Math.sin(norm * Math.PI * 5.2 + t * 0.2) * 0.11 +
        norm * 0.45;
      positions[i * 3 + 2] = 0.4;
    }
    lineRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#fdba74" transparent opacity={0.35} />
    </line>
  );
}

/* ─────────────────────────────────────────
   SCATTER PLOT
   Two small clusters of spheres — looks like
   a clustering / classification result.
───────────────────────────────────────── */
function ScatterPlot() {
  const groupRef = useRef<THREE.Group>(null!);

  const points = useMemo(() => {
    const clusters = [
      { cx: 4.2, cy:  0.7, count: 7, spread: 0.32, color: "#fdba74" },
      { cx: 2.4, cy: -0.6, count: 6, spread: 0.26, color: "#fb923c" },
    ];
    return clusters.flatMap(({ cx, cy, count, spread, color }) =>
      Array.from({ length: count }, () => ({
        x: cx + (Math.random() - 0.5) * spread * 2,
        y: cy + (Math.random() - 0.5) * spread * 2,
        z: -1.2 + (Math.random() - 0.5) * 0.5,
        r: 0.028 + Math.random() * 0.034,
        color,
        phase: Math.random() * Math.PI * 2,
      }))
    );
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((mesh, i) => {
      mesh.position.y = points[i].y + Math.sin(t * 0.4 + points[i].phase) * 0.045;
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
            emissiveIntensity={0.22}
            roughness={0.45}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────
   SCENE ROOT
───────────────────────────────────────── */
export const HeroScene = () => (
  <Canvas
    camera={{ position: [0, 0.5, 7.5], fov: 46 }}
    dpr={[1, 1.5]}
    gl={{ antialias: true, alpha: true }}
    className="!absolute inset-0"
  >
    <Suspense fallback={null}>
      <ambientLight intensity={0.12} color="#fff7ed" />
      <pointLight position={[5, 3, 2]}   intensity={1.8} color="#f97316" distance={18} />
      <pointLight position={[2, -2, -1]} intensity={0.5} color="#92400e" distance={14} />
      <pointLight position={[4, 1, 4]}   intensity={0.3} color="#fde68a" distance={10} />

      <DonutRings />
      <ScatterPlot />
      <BarChart />
      <LineChart />
    </Suspense>
  </Canvas>
);
