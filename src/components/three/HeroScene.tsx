import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Text, RoundedBox } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

/* Deep navy palette — single hue family, no violet/teal */
const NAVY = {
  base: "#1e3a8a",      // deep navy
  light: "#3b82f6",     // blue-500
  pale: "#93c5fd",      // light blue
  deep: "#0f1e4d",      // very deep navy
  ice: "#bfdbfe",       // ice blue (highlights)
};

/* Floating code-bracket symbol < /> */
function CodeBracket({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.4) * 0.3;
    const { x, y } = state.mouse;
    ref.current.position.x = position[0] + x * 0.25;
    ref.current.position.y = position[1] + y * 0.25;
  });
  return (
    <Float speed={1.1} rotationIntensity={0.3} floatIntensity={1.0}>
      <group ref={ref} position={position}>
        <Text
          font={undefined}
          fontSize={1.4}
          color={NAVY.pale}
          anchorX="center"
          anchorY="middle"
          letterSpacing={-0.05}
        >
          {"</>"}
          <meshPhysicalMaterial
            color={NAVY.pale}
            roughness={0.3}
            metalness={0.4}
            clearcoat={0.8}
            emissive={NAVY.light}
            emissiveIntensity={0.15}
          />
        </Text>
      </group>
    </Float>
  );
}

/* Wireframe cube — represents architecture/structure */
function WireCube({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.2;
    ref.current.rotation.y = t * 0.25;
    const { x, y } = state.mouse;
    ref.current.position.x = position[0] + x * 0.35;
    ref.current.position.y = position[1] + y * 0.35;
  });
  return (
    <Float speed={1.3} rotationIntensity={0.5} floatIntensity={1.2}>
      <group ref={ref} position={position} scale={scale}>
        {/* Solid inner cube */}
        <mesh>
          <boxGeometry args={[0.7, 0.7, 0.7]} />
          <meshPhysicalMaterial
            color={NAVY.base}
            roughness={0.35}
            metalness={0.5}
            clearcoat={0.7}
            clearcoatRoughness={0.2}
          />
        </mesh>
        {/* Wireframe outer cube */}
        <mesh>
          <boxGeometry args={[1.05, 1.05, 1.05]} />
          <meshBasicMaterial color={NAVY.light} wireframe transparent opacity={0.55} />
        </mesh>
      </group>
    </Float>
  );
}

/* Soft rounded "card" — represents UI / shipped product */
function CardMesh({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = rotation[1] + Math.sin(t * 0.35) * 0.2;
  });
  return (
    <Float speed={0.9} rotationIntensity={0.25} floatIntensity={1.4}>
      <group ref={ref} position={position} rotation={rotation}>
        <RoundedBox args={[1.6, 1.0, 0.12]} radius={0.12} smoothness={6}>
          <meshPhysicalMaterial
            color={NAVY.deep}
            roughness={0.25}
            metalness={0.3}
            clearcoat={0.9}
            clearcoatRoughness={0.15}
          />
        </RoundedBox>
        {/* Three "window dots" */}
        {[-0.55, -0.4, -0.25].map((x, i) => (
          <mesh key={i} position={[x, 0.32, 0.07]}>
            <circleGeometry args={[0.045, 24]} />
            <meshBasicMaterial color={NAVY.pale} />
          </mesh>
        ))}
        {/* Code lines */}
        {[0.1, -0.05, -0.2].map((y, i) => (
          <mesh key={`l${i}`} position={[0, y, 0.07]}>
            <planeGeometry args={[1.1 - i * 0.2, 0.04]} />
            <meshBasicMaterial color={NAVY.light} transparent opacity={0.55 - i * 0.1} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

/* Sphere (idea / node) */
function NodeSphere({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.3;
    const { x, y } = state.mouse;
    ref.current.position.x = position[0] + x * 0.3;
    ref.current.position.y = position[1] + y * 0.3;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.3}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshPhysicalMaterial
          color={NAVY.base}
          roughness={0.3}
          metalness={0.55}
          clearcoat={0.8}
          flatShading
        />
      </mesh>
    </Float>
  );
}

/* Floating dots — constellation feel */
function Constellation() {
  const group = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.04;
    group.current.rotation.x = Math.sin(t * 0.1) * 0.05;
  });
  const dots = Array.from({ length: 28 }, (_, i) => {
    const angle = (i / 28) * Math.PI * 2;
    const radius = 4.5 + Math.sin(i * 1.7) * 0.8;
    const y = Math.sin(i * 2.1) * 2.2;
    return [Math.cos(angle) * radius, y, Math.sin(angle) * radius - 1] as [number, number, number];
  });
  return (
    <group ref={group}>
      {dots.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color={NAVY.ice} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

export const HeroScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.0} color={NAVY.ice} />
        <pointLight position={[-4, -2, -3]} intensity={1.2} color={NAVY.light} />
        <pointLight position={[3, 3, 2]} intensity={0.8} color={NAVY.pale} />

        <CodeBracket position={[-2.2, 0.8, 0]} />
        <WireCube position={[2.3, 0.6, -0.5]} scale={0.95} />
        <CardMesh position={[-1.4, -1.4, 0.2]} rotation={[0.1, -0.4, 0.05]} />
        <NodeSphere position={[2.0, -1.3, 0.4]} />
        <NodeSphere position={[0.2, 1.9, -0.8]} scale={0.55} />

        <Constellation />

        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
};
