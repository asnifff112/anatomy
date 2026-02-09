"use client";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls, MeshReflectorMaterial, Center } from "@react-three/drei";
import { Suspense, useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

function LabModel({ url, isExploded }: { url: string; isExploded: boolean }) {
  const { scene } = useGLTF(url);

  useLayoutEffect(() => {
    scene.traverse((obj: any) => {
      if (obj.isMesh) {
        const name = obj.name.toLowerCase();
        // Doors, Bonnet, Boot എന്നിവ ആനിമേറ്റ് ചെയ്യുന്നു
        if (name.includes("door") || name.includes("bonnet") || name.includes("boot")) {
          gsap.to(obj.position, {
            z: isExploded ? 1.5 : 0,
            x: isExploded && name.includes("l") ? 1.5 : isExploded && name.includes("r") ? -1.5 : 0,
            duration: 1.5,
            ease: "power3.out"
          });
          gsap.to(obj.rotation, {
            y: isExploded ? (name.includes("l") ? Math.PI/4 : -Math.PI/4) : 0,
            duration: 1.5,
            ease: "power3.out"
          });
        }
      }
    });
  }, [isExploded, scene]);

  return <primitive object={scene} scale={2.5} />;
}

export default function LabView({ modelUrl = "/car.glb", isExploded = false }) {
  return (
    <div className="w-full h-full bg-[#050505]">
      <Canvas shadows camera={{ position: [0, 2, 8], fov: 35 }}>
        <Suspense fallback={null}>
          <Center top>
            <LabModel url={modelUrl} isExploded={isExploded} />
          </Center>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 100]} resolution={1024} mixBlur={1} mixStrength={60}
              roughness={1} depthScale={1.2} color="#050505" metalness={0.9}
            />
          </mesh>
          <Environment preset="city" />
          <OrbitControls makeDefault enablePan={false} maxPolarAngle={Math.PI / 2} />
        </Suspense>
      </Canvas>
    </div>
  );
}