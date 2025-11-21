import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Sphere = (props) => {
  const ref = useRef();
  const [sphere] = useMemo(() => {
    const positions = random.inSphere(new Float32Array(5000), { radius: 1.2 });
    return [positions];
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <pointsMaterial
          transparent
          color='#00FFFF'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

const DataSphere = () => {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 0.05]} />
      <Sphere />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      <Preload all />
    </Canvas>
  );
};

export default DataSphere;
