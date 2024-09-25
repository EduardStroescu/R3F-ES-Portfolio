import { useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useLocation } from "react-router-dom";

export default function Camera(props) {
  const location = useLocation();
  const cameraRef = useRef();

  useFrame(() => cameraRef.current.updateMatrixWorld());

  let startTime;

  useFrame((state, delta) => {
    if (location.pathname === "/") {
      easing.damp3(
        state.camera.position,
        [6 + state.pointer.x, 5 + -state.pointer.y / 6, 2],
        0.5,
        delta,
        25
      );
      easing.dampE(
        state.camera.rotation,
        [state.pointer.y * 0.02, state.pointer.x * 0.08, 0],
        0.5,
        delta
      );
    } else if (location.pathname === "/projects") {
      if (startTime === undefined) startTime = state.clock.elapsedTime;

      if (state.clock.elapsedTime >= startTime + 0.6) {
        easing.damp3(
          state.camera.position,
          [6 + state.pointer.x / 2, -5 + -state.pointer.y / 6, 2],
          0.5,
          delta,
          10
        );
      } else {
        easing.damp3(
          state.camera.position,
          [6, 0, location.state.data === "/contact" ? 10 : 2],
          0.5,
          delta,
          location.state.data === "/contact" ? 40 : 10
        );
      }
      easing.dampE(
        state.camera.rotation,
        [state.pointer.y * 0.03, state.pointer.x * 0.03, 0],
        0.35,
        delta
      );
    } else if (location.pathname === "/contact") {
      easing.damp3(
        state.camera.position,
        [-23 + state.pointer.x / 4, 6, 31.5],
        0.5,
        delta,
        location.pathname === "/projects" ? 100 : 30
      );
      easing.dampE(
        state.camera.rotation,
        [
          state.pointer.y * 0.1,
          -Math.PI / 4 + state.pointer.x * 0.05,
          state.pointer.y * 0.07,
        ],
        0.5,
        delta
      );
    }
  });

  return (
    <group name="Scene" {...props}>
      <PerspectiveCamera
        ref={cameraRef}
        damping={true}
        name="Camera"
        position={[6, 5, 2]}
        far={location.pathname !== "/projects" ? 90 : 60}
        near={0.01}
        fov={75}
        makeDefault
      />
    </group>
  );
}
