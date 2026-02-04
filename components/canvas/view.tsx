"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  useGLTF, Environment, Float, useAnimations, 
  OrbitControls, ScrollControls, useScroll, MeshReflectorMaterial, ContactShadows, Center
} from "@react-three/drei";
import { Suspense, useRef, useEffect, useLayoutEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface ViewProps {
  modelUrl: string;
  isExploded?: boolean;
  scale?: number;
}

function CarModel({ url, isExploded, customScale }: { url: string; isExploded?: boolean; customScale: number }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, group);
  const scroll = useScroll();
  const tl = useRef<any>(null);

  useLayoutEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const center = new THREE.Vector3();
      box.getCenter(center);
      scene.position.sub(center); 

      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      
      const scaleFactor = 3.5 / maxDim; 
      scene.scale.setScalar(scaleFactor);
    }
  }, [scene, url]);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => {
        isExploded ? action?.play().fadeIn(1) : action?.fadeOut(1).stop();
      });
    }
  }, [actions, isExploded]);

  return (
    <Float speed={isExploded ? 0 : 0.8} rotationIntensity={0.1} floatIntensity={0.1}>
      <primitive 
        ref={group}
        object={scene} 
        scale={customScale} 
        rotation={[0, -Math.PI / 6, 0]} 
      />
    </Float>
  );
}

export default function View({ modelUrl, isExploded, scale = 1 }: ViewProps) {
  return (
    <div className="h-full w-full outline-none bg-transparent">
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 1, 5], fov: 35 }}>
        <Suspense fallback={null}>
          <ScrollControls pages={isExploded ? 3 : 0} damping={0.2}>
            
            <ambientLight intensity={0.7} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

            <Center top>
               <CarModel url={modelUrl} isExploded={isExploded} customScale={scale} />
            </Center>

            <group position={[0, -0.6, 0]}>
              <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[4, 64]} />
                <MeshReflectorMaterial
                  blur={[300, 100]}
                  resolution={1024}
                  mixBlur={1}
                  mixStrength={50}
                  roughness={1}
                  depthScale={1.2}
                  color="#151515" 
                  metalness={0.6}
                />
              </mesh>
              <ContactShadows opacity={0.4} scale={10} blur={2} far={1.5} color="#000000" />
            </group>

          </ScrollControls>
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} makeDefault />
      </Canvas>
    </div>
  );
}