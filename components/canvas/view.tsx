"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  useGLTF, Environment, Float, useAnimations, 
  OrbitControls,  MeshReflectorMaterial, ContactShadows, Center
} from "@react-three/drei";
import { Suspense, useRef, useLayoutEffect } from "react";
import * as THREE from "three";


interface ViewProps {
  modelUrl: string;
  isExploded?: boolean;
  scale?: number;
  isLab?: boolean;
}

function CarModel({ url, isExploded, customScale, isLab }: { url: string; isExploded?: boolean; customScale: number; isLab: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, group);
 
  const tl = useRef<gsap.core.Timeline | null>(null);

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

  
 
  return (
    <Float speed={isLab ? 1 : 1.5} rotationIntensity={0.05} floatIntensity={0.05}>
      <primitive 
        ref={group}
        object={scene} 
        scale={customScale} 
        rotation={[0, -Math.PI / 4, 0]} 
      />
    </Float>
  );
}

export default function View({ modelUrl, isExploded, scale = 1, isLab = false }: ViewProps) {
  return (
    <div className="h-full w-full outline-none bg-transparent">
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        camera={{ position: [0, 1.5, 5], fov: 35 }}
        gl={{ antialias: true, toneMapping: THREE.ReinhardToneMapping }}
      >
        <Suspense fallback={null}>
          
            
            <ambientLight intensity={isLab ? 0.4 : 0.8} />
            
            {isLab && (
              <>
                <spotLight position={[5, 10, 5]} angle={0.25} penumbra={1} intensity={2} color="#3b82f6" castShadow />
                <rectAreaLight width={10} height={10} intensity={1} color="#3b82f6" position={[0, 5, -5]} />
              </>
            )}

            <Center top>
               <CarModel url={modelUrl} isExploded={isExploded} customScale={scale} isLab={isLab} />
            </Center>

            {isLab ? (
              <group position={[0, -0.6, 0]}>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                  <ringGeometry args={[3.8, 4, 80]} />
                  <meshStandardMaterial emissive="#3b82f6" emissiveIntensity={15} toneMapped={false} />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                  <circleGeometry args={[4.5, 64]} />
                  <MeshReflectorMaterial 
                    blur={[300, 100]} 
                    resolution={1024} 
                    mixBlur={1} 
                    mixStrength={60} 
                    roughness={1} 
                    depthScale={1.2} 
                    color="#080808" 
                    metalness={0.8} 
                  />
                </mesh>
              </group>
            ) : (
              <ContactShadows position={[0, -0.6, 0]} opacity={0.4} scale={10} blur={2} far={1.5} color="#000000" />
            )}

          
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enableZoom={isLab} enablePan={false} makeDefault />
      </Canvas>
    </div>
  );
}