"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import { Suspense, useLayoutEffect, useRef } from "react";
import * as THREE from "three";

function Model({ url, color }: { url: string; color: string }) {
  const { scene } = useGLTF(url);

  useLayoutEffect(() => {
    if (scene) {
      scene.scale.set(1, 1, 1);
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      
      // Standard scale factor (4.5 fits perfectly in the frame)
      const scaleFactor = 4.5 / maxDim;
      scene.scale.set(scaleFactor, scaleFactor, scaleFactor);
      
      const center = box.getCenter(new THREE.Vector3());
      scene.position.x -= center.x * scaleFactor;
      scene.position.y -= center.y * scaleFactor;
      scene.position.z -= center.z * scaleFactor;

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          if (mesh.name.toLowerCase().includes("body") || mesh.name.toLowerCase().includes("paint")) {
            (mesh.material as THREE.MeshStandardMaterial).color.set(color);
          }
        }
      });
    }
  }, [scene, url, color]);

  return <primitive object={scene} />;
}

export default function CarView({ modelUrl, selectedColor }: { modelUrl: string; selectedColor: string }) {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 1, 8]} fov={25} />
          <Stage environment="city" intensity={0.5} adjustCamera={false}>
            <Model url={modelUrl} color={selectedColor} />
          </Stage>
          <ContactShadows position={[0, -0.01, 0]} opacity={0.5} scale={10} blur={2.5} far={1} />
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}  
          autoRotate={true}
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 2.8} 
          maxPolarAngle={Math.PI / 2.1} 
        />
      </Canvas>
    </div>
  );
}