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
        // കാറിന്റെ ബോഡി പാർട്ടിന്റെ പേര് 'body' എന്നാണെങ്കിൽ അത് മാത്രം മാറ്റാം
        // അല്ലെങ്കിൽ എല്ലാ മെറ്റീരിയലിന്റെയും കളർ മാറ്റാം
        // നിന്റെ മോഡലിലെ കാർ ബോഡി മെറ്റീരിയൽ നെയിം നോക്കി ഇത് കൂടുതൽ കൃത്യമാക്കാം
        if (child.name.includes("body") || child.name.includes("paint")) {
           (child as any).material.color.set(color);
        }
      }
    });
  }, [scene, color]);

  return <primitive object={scene} scale={1.5} />;
}

export default function CarView({ modelUrl, selectedColor }: { modelUrl: string; selectedColor: string }) {
  return (
    <div className="h-[500px] w-full">
      <Canvas shadows>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5}>
            <Model url={modelUrl} color={selectedColor} />
          </Stage>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}