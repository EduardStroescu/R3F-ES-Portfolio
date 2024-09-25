import { useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Camera2(props) {
  const cameraRef = useRef();

  useFrame(() => cameraRef.current.updateMatrixWorld());

  return (
    <group {...props}>
      <group name="Scene">
        <PerspectiveCamera
          ref={cameraRef}
          damping={true}
          name="Camera"
          far={60}
          near={0.01}
          fov={75}
          position={[6, 5, 2]}
          makeDefault
        />
      </group>
    </group>
  );
}
