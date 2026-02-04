"use client";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stage } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import * as THREE from "three";

function Model({ url, color }: { url: string; color: string }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const name = mesh.name.toLowerCase();

        // 1. Detection Logic
        const isGlass = name.includes("glass") || name.includes("window") || name.includes("windshield");
        const isWheel = name.includes("wheel") || name.includes("tire") || name.includes("rim") || name.includes("alloy");
        const isInterior = name.includes("interior") || name.includes("seat") || name.includes("dash");

        if (isGlass) {
          // Glass fixed with dark tint
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color("#080808"),
            metalness: 0.9,
            roughness: 0.05,
            transmission: 0.9,
            transparent: true,
            opacity: 0.5,
          });
        } 
        else if (isWheel) {
          // 🏎️ WHEEL FIX: Eppozhum metallic silver/black aayi nilkan
          const wheelMaterial = new THREE.MeshStandardMaterial({
            color: name.includes("tire") ? new THREE.Color("#111111") : new THREE.Color("#888888"), // Tyre black, Rim silver
            metalness: 0.9,
            roughness: 0.2,
          });
          mesh.material = wheelMaterial;
        } 
        else if (!isInterior && !name.includes("light")) {
          // 🎨 ONLY EXTERIOR BODY: Ividem mathram selected color varu
          if (mesh.material) {
            const newMaterial = (mesh.material as THREE.MeshStandardMaterial).clone();
            newMaterial.color.set(new THREE.Color(color));
            newMaterial.roughness = 0.3;
            newMaterial.metalness = 0.7;
            mesh.material = newMaterial;
          }
        }
      }
    });
  }, [scene, color]);

  return <primitive object={scene} scale={1} position={[0, -0.2, 0]} />;
}

export default function CarView({ modelUrl, selectedColor }: { modelUrl: string; selectedColor: string }) {
  return (
    <div className="h-full w-full">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2, 6], fov: 35 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} adjustCamera={1.5}>
            <Model url={modelUrl} color={selectedColor} />
          </Stage>
          <OrbitControls 
            enableZoom={false} 
            maxPolarAngle={Math.PI / 2.2} 
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}