import { useEffect, useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

export default function Camera2() {
  const cameraRef = useRef();

  const set = useThree((state) => state.set);
  useEffect(() => void set({ camera: cameraRef.current }));
  useFrame(() => cameraRef.current.updateMatrixWorld());

  return (
    // eslint-disable-next-line react/no-unknown-property
    <group position={[5, 0, 26]}>
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
