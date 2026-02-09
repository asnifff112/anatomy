"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { Suspense, useLayoutEffect, useRef } from "react";
import * as THREE from "three";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);

  useLayoutEffect(() => {
    if (scene) {
      // പഴയ സ്കെയിൽ റീസെറ്റ് ചെയ്യുന്നു
      scene.scale.set(1, 1, 1);
      
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      
      // എല്ലാ കാറിനും ഒരേ വലിപ്പം (Standard Size: 4.0)
      const scaleFactor = 4.0 / maxDim;
      scene.scale.set(scaleFactor, scaleFactor, scaleFactor);
      
      // സെന്ററിൽ പ്ലേസ് ചെയ്യുന്നു
      const center = box.getCenter(new THREE.Vector3());
      scene.position.x -= center.x * scaleFactor;
      scene.position.y -= center.y * scaleFactor;
      scene.position.z -= center.z * scaleFactor;

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
        }
      });
    }
  }, [scene, url]);

  return <primitive object={scene} />;
}

export default function LabView({ modelUrl }: { modelUrl: string }) {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [0, 1.5, 6], fov: 30 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} adjustCamera={false}>
            <Model key={modelUrl} url={modelUrl} />
          </Stage>
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}  
          minPolarAngle={Math.PI / 2.8} 
          maxPolarAngle={Math.PI / 2.1} 
        />
      </Canvas>
    </div>
  );
}