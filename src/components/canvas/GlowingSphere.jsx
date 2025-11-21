import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Environment } from "@react-three/drei";

import CanvasLoader from "../Loader";

const SphereModel = () => {
  const sphere = useGLTF("./models/sphere.glb");

  return (
    <primitive
      object={sphere.scene}
      scale={2.5}
      position-y={0}
      rotation-y={0}
    />
  );
};

const GlowingSphere = () => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <spotLight position={[-10, -10, -10]} intensity={1} />
      <Environment preset="city" />
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <SphereModel />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default GlowingSphere;
