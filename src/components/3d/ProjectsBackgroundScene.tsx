import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ProjectsBackgroundScene() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 200;
  const cubeCount = 20;

  const { particlePositions, cubePositions, cubeRotations } = useMemo(() => {
    const pPos = new Float32Array(particleCount * 3);
    const cPos = new Float32Array(cubeCount * 3);
    const cRot = new Float32Array(cubeCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 30;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    for (let i = 0; i < cubeCount; i++) {
      cPos[i * 3] = (Math.random() - 0.5) * 25;
      cPos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      cPos[i * 3 + 2] = (Math.random() - 0.5) * 8;

      cRot[i * 3] = Math.random() * Math.PI;
      cRot[i * 3 + 1] = Math.random() * Math.PI;
      cRot[i * 3 + 2] = Math.random() * Math.PI;
    }

    return {
      particlePositions: pPos,
      cubePositions: cPos,
      cubeRotations: cRot
    };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y -= delta * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Floating particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#6366f1"
          transparent
          opacity={0.4}
        />
      </points>

      {/* Floating cubes */}
      {Array.from({ length: cubeCount }, (_, i) => (
        <mesh
          key={i}
          position={[
            cubePositions[i * 3],
            cubePositions[i * 3 + 1],
            cubePositions[i * 3 + 2]
          ]}
          rotation={[
            cubeRotations[i * 3],
            cubeRotations[i * 3 + 1],
            cubeRotations[i * 3 + 2]
          ]}
        >
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.2}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}