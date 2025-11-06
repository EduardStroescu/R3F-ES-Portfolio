import { useEffect, useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useLocation } from "react-router-dom";
import { useMousePosition } from "../lib/hooks/useMousePosition";

export default function Camera() {
  const { pathname, state: locationState } = useLocation();
  const cameraRef = useRef();
  const mousePosition = useMousePosition();

  const set = useThree((state) => state.set);
  useEffect(() => void set({ camera: cameraRef.current }));
  useFrame(() => {
    if (!cameraRef.current) return;
    cameraRef.current.updateMatrixWorld();
  });

  const startTimeRef = useRef(null);

  useEffect(() => {
    startTimeRef.current = null;
  }, [pathname]);

  useFrame((state, delta) => {
    if (pathname === "/") {
      if (!startTimeRef?.current)
        startTimeRef.current = state.clock.elapsedTime;

      if (state.clock.elapsedTime >= startTimeRef.current + 1) {
        easing.damp3(
          state.camera.position,
          [6 + mousePosition.current.x, 5 + -mousePosition.current.y / 6, 2],
          0.5,
          delta,
          30
        );
      } else {
        easing.damp3(
          state.camera.position,
          [6 + mousePosition.current.x, 5 + -mousePosition.current.y / 6, 2],
          locationState?.prevPathname === "/projects" ? 0.3 : 0.5,
          delta,
          50
        );
      }
      easing.dampE(
        state.camera.rotation,
        [mousePosition.current.y * 0.02, mousePosition.current.x * 0.08, 0],
        0.5,
        delta
      );
    } else if (pathname === "/projects") {
      if (!startTimeRef?.current)
        startTimeRef.current = state.clock.elapsedTime;

      if (state.clock.elapsedTime >= startTimeRef.current + 1) {
        easing.damp3(
          state.camera.position,
          [
            6 + mousePosition.current.x / 2,
            -5 + -mousePosition.current.y / 6,
            2,
          ],
          0.5,
          delta,
          30
        );
      } else {
        easing.damp3(
          state.camera.position,
          [6, 1, locationState?.prevPathname === "/contact" ? 10 : 2],
          0.5,
          delta,
          locationState?.prevPathname === "/contact" ? 50 : 20
        );
      }
      easing.dampE(
        state.camera.rotation,
        [mousePosition.current.y * 0.03, mousePosition.current.x * 0.03, 0],
        0.35,
        delta
      );
    } else if (pathname === "/contact") {
      easing.damp3(
        state.camera.position,
        [-23 + mousePosition.current.x / 4, 6, 31.5],
        0.5,
        delta,
        30
      );
      easing.dampE(
        state.camera.rotation,
        [
          mousePosition.current.y * 0.05,
          -Math.PI / 4 + mousePosition.current.x * 0.08,
          mousePosition.current.y * 0.035,
        ],
        0.5,
        delta
      );
    } else {
      easing.damp3(
        state.camera.position,
        [6 + mousePosition.current.x, 5 + -mousePosition.current.y / 6, 2],
        0.5,
        delta,
        30
      );
      easing.dampE(
        state.camera.rotation,
        [mousePosition.current.y * 0.02, mousePosition.current.x * 0.08, 0],
        0.5,
        delta
      );
    }
  });

  return (
    // eslint-disable-next-line react/no-unknown-property
    <group name="Scene" position={[5, 0, 26]}>
      <PerspectiveCamera
        ref={cameraRef}
        damping={true}
        name="Camera"
        position={[6, 5, 2]}
        far={pathname !== "/projects" ? 90 : 60}
        near={0.01}
        fov={75}
        makeDefault
      />
    </group>
  );
}
