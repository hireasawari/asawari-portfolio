import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function EditorialBackgroundScene() {
  const groupRef = useRef<THREE.Group>(null);

  const ringCount = 8;
  const particleCount = 150;

  const { ringPositions, particlePositions } = useMemo(() => {
    const rPos = [];
    const pPos = new Float32Array(particleCount * 3);

    // Create floating rings
    for (let i = 0; i < ringCount; i++) {
      const radius = 8 + Math.random() * 4;
      const y = (i - ringCount / 2) * 3;
      rPos.push({ radius, y, rotation: Math.random() * Math.PI * 2 });
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 25;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }

    return { ringPositions: rPos, particlePositions: pPos };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Floating particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#64748b"
          transparent
          opacity={0.3}
        />
      </points>

      {/* Floating rings */}
      {ringPositions.map((ring, i) => (
        <mesh key={i} position={[0, ring.y, 0]} rotation={[0, ring.rotation, Math.PI / 2]}>
          <ringGeometry args={[ring.radius - 0.1, ring.radius, 32]} />
          <meshBasicMaterial
            color="#475569"
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}