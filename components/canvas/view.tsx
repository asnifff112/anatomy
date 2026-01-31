"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stage, useGLTF, Environment, Float, useAnimations, OrbitControls, ScrollControls, useScroll } from "@react-three/drei";
import { Suspense, useRef, useEffect, useLayoutEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

// Props interface 
interface ViewProps {
  modelUrl: string;
  isExploded?: boolean;
  scale?: number;
}

function Model({ url, isExploded, customScale }: { url: string; isExploded?: boolean; customScale: number }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, group);
  const scroll = useScroll();
  const tl = useRef<any>(null); // Type error fix cheyyaan 'any' upayogichu

  // Door/Bonnet animations from your original logic
  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => {
        if (isExploded !== undefined) {
          if (isExploded) {
            action?.play().fadeIn(1);
          } else {
            action?.fadeOut(1).stop();
          }
        } else {
          action?.play().fadeIn(1);
        }
      });
    }
  }, [actions, isExploded]);

  // GSAP Scroll Logic for Parts Deconstruction
  useLayoutEffect(() => {
    tl.current = gsap.timeline({ paused: true });

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        // Model-ile parts identification based on names
        if (child.name.toLowerCase().includes("engine")) {
          tl.current.to(child.position, { y: 1.2, z: 0.5, duration: 1 }, 0);
        }
        if (child.name.toLowerCase().includes("wheel") || child.name.toLowerCase().includes("tyre")) {
          // Wheels sideways move aakan
          const direction = child.position.x > 0 ? 0.8 : -0.8;
          tl.current.to(child.position, { x: direction, duration: 1 }, 0);
        }
      }
    });
  }, [scene]);

  // Sync GSAP timeline with Drei Scroll
  useFrame(() => {
    if (tl.current) {
      tl.current.seek(scroll.offset * tl.current.duration());
    }
  });

  return (
    <Float speed={isExploded ? 0 : 0.8} rotationIntensity={0.1} floatIntensity={0.1}>
      <primitive 
        ref={group}
        object={scene} 
        scale={customScale} 
        position={[0, -0.6, -1.5]} 
        rotation={[0, -Math.PI / 6, 0]} 
      />
    </Float>
  );
}

export default function View({ modelUrl, isExploded, scale = 1.3 }: ViewProps) {
  return (
    <div className="h-full w-full outline-none">
      <Canvas 
        shadows 
        dpr={[1, 1.5]} 
        camera={{ position: [0, 0, 5], fov: 35 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          {/* ScrollControls add cheythu - 3 pages scroll length */}
          <ScrollControls pages={isExploded ? 3 : 0} damping={0.2}>
            <Stage environment="city" intensity={0.5} adjustCamera={false}>
              <Model url={modelUrl} isExploded={isExploded} customScale={scale} />
            </Stage>
          </ScrollControls>
          <Environment preset="night" />
        </Suspense>

        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={isExploded !== undefined && !isExploded} 
          autoRotateSpeed={0.5}
          makeDefault 
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/car.glb");