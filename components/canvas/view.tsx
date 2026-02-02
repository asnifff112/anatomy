"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Stage, useGLTF, Environment, Float, useAnimations, 
  OrbitControls, ScrollControls, useScroll, MeshReflectorMaterial, ContactShadows 
} from "@react-three/drei";
import { Suspense, useRef, useEffect, useLayoutEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

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
  const tl = useRef<any>(null);

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

  useLayoutEffect(() => {
    tl.current = gsap.timeline({ paused: true });
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        if (child.name.toLowerCase().includes("engine")) {
          tl.current.to(child.position, { y: 1.2, z: 0.5, duration: 1 }, 0);
        }
        if (child.name.toLowerCase().includes("wheel") || child.name.toLowerCase().includes("tyre")) {
          const direction = child.position.x > 0 ? 0.8 : -0.8;
          tl.current.to(child.position, { x: direction, duration: 1 }, 0);
        }
      }
    });
  }, [scene]);

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
        position={[0, -0.2, 0]} // Position adjusted for platform
        rotation={[0, -Math.PI / 6, 0]} 
      />
    </Float>
  );
}

export default function View({ modelUrl, isExploded, scale = 1.3 }: ViewProps) {
  return (
    <div className="h-full w-full outline-none bg-transparent">
      <Canvas 
        shadows 
        dpr={[1, 1.5]} 
        camera={{ position: [0, 1, 5], fov: 35 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={isExploded ? 3 : 0} damping={0.2}>
            <Stage environment="city" intensity={0.5} adjustCamera={false}>
              <Model url={modelUrl} isExploded={isExploded} customScale={scale} />
            </Stage>

            {/* ✨ THE ROUND PLATFORM SECTION */}
            <group position={[0, -0.65, 0]}>
              <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[4, 64]} />
                <MeshReflectorMaterial
                  blur={[300, 100]}
                  resolution={1024}
                  mixBlur={1}
                  mixStrength={50}
                  roughness={1}
                  depthScale={1.2}
                  minDepthThreshold={0.4}
                  maxDepthThreshold={1.4}
                  color="#151515" // Dark base color for the lab look
                  metalness={0.6}
                />
              </mesh>
              
              {/* Soft shadow on the platform */}
              <ContactShadows 
                opacity={0.4} 
                scale={10} 
                blur={2} 
                far={1.5} 
                color="#000000" 
              />
            </group>

          </ScrollControls>
          
          {/* Environment changes based on the lab theme */}
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