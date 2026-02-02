"use client";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stage, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
}

export default function CarView({ modelUrl }: { modelUrl: string }) {
  return (
    <div className="h-[500px] w-full cursor-grab active:cursor-grabbing">
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />
          <Stage environment="city" intensity={0.5}>
            <Model url={modelUrl} />
          </Stage>
       
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.5} 
            makeDefault 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}