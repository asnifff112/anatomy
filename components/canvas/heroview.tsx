"use client";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, Float, OrbitControls, ContactShadows } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

function Model({ url, onReady }: { url: string; onReady: () => void }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (modelRef.current) {

      const tl = gsap.timeline({ 
        onComplete: onReady,
        defaults: { ease: "power2.inOut", duration: 1.5 } 
      });

      tl.fromTo(modelRef.current.position, 
        { x: 10, y: -0.5, z: 0 }, 
        { x: 0, y: -0.5, z: 0, duration: 2, ease: "power3.out" }
      );

      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const name = child.name.toLowerCase();

          if (name.includes("door") || name.includes("box156") || name.includes("box216")) {
            tl.to(child.rotation, {
              y: name.includes("left") || name.includes("156") ? 1.5 : -1.5,
            }, "-=1.5"); 
          }

          if (name.includes("bonnet") || name.includes("hood") || name.includes("box42")) {
            tl.to(child.rotation, { x: -1.2 }, "-=1.5");
          }

          if (name.includes("boot") || name.includes("trunk") || name.includes("box110")) {
            tl.to(child.rotation, { x: 1.1 }, "-=1.5");
          }
          
          if (name.includes("wheel")) {
            gsap.to(child.rotation, {
              x: Math.PI * 4,
              duration: 2,
              ease: "power3.out"
            });
          }
        }
      });
    }
  }, [onReady, scene]);

  return <primitive ref={modelRef} object={scene} scale={1.8} />;
}

export default function HeroView({ modelUrl = "/car.glb", onReady }: { modelUrl?: string; onReady: () => void }) {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [8, 4, 12], fov: 25 }} gl={{ antialias: true, toneMappingExposure: 1.2 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 15, 10]} intensity={2.5} angle={0.3} penumbra={1} castShadow />
          <directionalLight position={[-10, 5, 5]} intensity={1} color="#ffffff" />
          
          <OrbitControls 
            enableZoom={false} 
            maxPolarAngle={Math.PI / 2} 
            minPolarAngle={Math.PI / 4}
          />
          
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
            <Model url={modelUrl} onReady={onReady} />
          </Float>

          <ContactShadows position={[0, -0.5, 0]} opacity={0.6} scale={12} blur={2.5} far={4} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}