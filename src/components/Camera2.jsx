import { useRef, useEffect } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";

import { useAppContext } from "./AppContextProvider.jsx";

export default function Camera2(props) {
  const { location } = useAppContext();
  const group = useRef();
  const cameraRef = useRef();

  const set = useThree((state) => state.set);
  useEffect(() => void set({ camera: cameraRef.current }));
  useFrame(() => cameraRef.current.updateMatrixWorld());

  useFrame((state, delta) => {
    if (location.pathname === "/projects") {
      easing.damp3(
        state.camera.position,
        [6 + state.pointer.x / 2.5, 5 + -state.pointer.y / 6, 2],
        0.5,
        delta,
        10
      );
      easing.dampE(
        state.camera.rotation,
        [state.pointer.y * 0.02, state.pointer.x * 0.03, 0],
        0.35,
        delta
      );
    }
  });

  return (
    <group ref={group} {...props}>
      <group name="Scene">
        <PerspectiveCamera
          ref={cameraRef}
          damping={true}
          name="Camera"
          far={60}
          near={0.01}
          fov={75}
          makeDefault
        />
      </group>
    </group>
  );
}
