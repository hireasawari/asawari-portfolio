import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

/* ─────────────────────────────────────────
   DATA HELIX
   Two interleaved strands of spheres that
   slowly rotate — nods to data pipelines
   and structured information flow.
───────────────────────────────────────── */
function DataHelix() {
  const groupRef = useRef<THREE.Group>(null!);

  const STRAND_POINTS = 28;
  const HEIGHT = 5.5;
  const RADIUS = 0.72;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.22;
    groupRef.current.position.y = Math.sin(t * 0.18) * 0.08;
  });

  const nodes = useMemo(() => {
    const items: { pos: [number, number, number]; strand: 0 | 1 }[] = [];
    for (let i = 0; i < STRAND_POINTS; i++) {
      const t = i / (STRAND_POINTS - 1);
      const angle = t * Math.PI * 4;
      const y = (t - 0.5) * HEIGHT;
      items.push({ pos: [Math.cos(angle) * RADIUS, y, Math.sin(angle) * RADIUS], strand: 0 });
      items.push({ pos: [Math.cos(angle + Math.PI) * RADIUS, y, Math.sin(angle + Math.PI) * RADIUS], strand: 1 });
    }
    return items;
  }, []);

  const rungPositions = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < STRAND_POINTS; i += 3) {
      const t = i / (STRAND_POINTS - 1);
      const angle = t * Math.PI * 4;
      const y = (t - 0.5) * HEIGHT;
      const ax = Math.cos(angle) * RADIUS, az = Math.sin(angle) * RADIUS;
      const bx = Math.cos(angle + Math.PI) * RADIUS, bz = Math.sin(angle + Math.PI) * RADIUS;
      arr.push(ax, y, az, bx, y, bz);
    }
    return new Float32Array(arr);
  }, []);

  return (
    <group ref={groupRef} position={[1.8, 0, -1]}>
      {nodes.map(({ pos, strand }, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[strand === 0 ? 0.055 : 0.042, 8, 8]} />
          <meshStandardMaterial
            color={strand === 0 ? "#f97316" : "#fdba74"}
            emissive={strand === 0 ? "#f97316" : "#f59e0b"}
            emissiveIntensity={0.45}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>
      ))}

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={rungPositions.length / 3}
            array={rungPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#f97316" transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
}

/* ─────────────────────────────────────────
   ORBITAL RING
   Thin torus rings that slowly tilt —
   represent data cycles / analytics loops.
───────────────────────────────────────── */
function OrbitalRing({
  position,
  radius,
  tube,
  speed,
  tilt,
  opacity,
  color,
}: {
  position: [number, number, number];
  radius: number;
  tube: number;
  speed: number;
  tilt: number;
  opacity: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * speed;
    ref.current.rotation.x = tilt + Math.sin(t * 0.09) * 0.04;
  });
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[radius, tube, 3, 96]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

/* ─────────────────────────────────────────
   CONSTELLATION FIELD
   ~62 dots on a Fibonacci sphere shell —
   quiet background depth layer.
───────────────────────────────────────── */
function Constellation() {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const count = 62;
    const arr = new Float32Array(count * 3);
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      arr[i * 3]     = Math.cos(theta) * r * 5.8;
      arr[i * 3 + 1] = y * 4.2;
      arr[i * 3 + 2] = Math.sin(theta) * r * 5.8 - 1.5;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.008;
    ref.current.rotation.x = Math.sin(t * 0.05) * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#fdba74" size={0.032} transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

/* ─────────────────────────────────────────
   SCENE ROOT
───────────────────────────────────────── */
export const HeroScene = () => (
  <Canvas
    camera={{ position: [0, 0, 6.5], fov: 48 }}
    dpr={[1, 1.5]}
    gl={{ antialias: true, alpha: true }}
    className="!absolute inset-0"
  >
    <Suspense fallback={null}>
      <ambientLight intensity={0.25} color="#fff7ed" />
      <pointLight position={[4, 3, 2]}    intensity={2.2} color="#f97316" distance={14} />
      <pointLight position={[-3.5, -2, -2]} intensity={0.7} color="#92400e" distance={12} />
      <pointLight position={[0, 0, -6]}   intensity={0.4} color="#fde68a" distance={10} />

      <Constellation />

      <OrbitalRing
        position={[-1.6, 0.2, -1.2]}
        radius={1.55}
        tube={0.008}
        speed={0.04}
        tilt={1.1}
        opacity={0.13}
        color="#f97316"
      />
      <OrbitalRing
        position={[-1.6, 0.2, -1.2]}
        radius={2.0}
        tube={0.006}
        speed={-0.028}
        tilt={0.55}
        opacity={0.08}
        color="#fdba74"
      />

      <DataHelix />
    </Suspense>
  </Canvas>
);
