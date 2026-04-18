import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function ClayBlob({ position, color, scale = 1, speed = 1 }: { position: [number, number, number]; color: string; scale?: number; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.15 * speed;
    ref.current.rotation.y = t * 0.2 * speed;
    // gentle parallax to mouse
    const { x, y } = state.mouse;
    ref.current.position.x = position[0] + x * 0.3;
    ref.current.position.y = position[1] + y * 0.3;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale} castShadow receiveShadow>
        <icosahedronGeometry args={[1, 6]} />
        <MeshDistortMaterial
          color={color}
          distort={0.42}
          speed={1.6}
          roughness={0.25}
          metalness={0.15}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
        />
      </mesh>
    </Float>
  );
}

function ClayTorus({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.3;
    ref.current.rotation.z = t * 0.2;
  });
  return (
    <Float speed={1.1} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh ref={ref} position={position} castShadow>
        <torusGeometry args={[0.7, 0.28, 32, 96]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.25}
          metalness={0.2}
          clearcoat={0.7}
          clearcoatRoughness={0.15}
        />
      </mesh>
    </Float>
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
        <ambientLight intensity={0.45} />
        <directionalLight position={[5, 5, 5]} intensity={1.1} color="#a5b4fc" />
        <pointLight position={[-4, -2, -3]} intensity={1.4} color="#22d3ee" />
        <pointLight position={[3, -3, 2]} intensity={1.2} color="#c084fc" />

        <ClayBlob position={[-1.8, 0.6, 0]} color="#6366f1" scale={1.1} />
        <ClayBlob position={[2.0, -0.5, -1]} color="#a855f7" scale={0.9} speed={0.8} />
        <ClayTorus position={[0.5, 1.4, -0.5]} color="#22d3ee" />
        <ClayTorus position={[-0.4, -1.5, 0.3]} color="#818cf8" />

        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
};
