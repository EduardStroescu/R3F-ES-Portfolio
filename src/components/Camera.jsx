import { useEffect, useMemo, useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useLocation } from "react-router-dom";
import { useMousePosition } from "../lib/hooks/useMousePosition";
import { Euler, Vector3 } from "three";

const CAMERA_DEADZONE = 0.1;
const SEA_AMP = 0.1; // Sea amplitude or how much the camera moves
const SEA_SPEED = 1.0;

// Camera configurations per route
const useCameraConfig = (pathname, prev) =>
  useMemo(() => {
    switch (pathname) {
      case "/projects":
        return {
          getPos: (elapsed, mouse) =>
            elapsed >= 1
              ? [6 + mouse.x / 2, -5 - mouse.y / 6, 2]
              : [6, 1, prev === "/contact" ? 10 : 2],
          getRot: (mouse) => [mouse.y * 0.03, mouse.x * 0.03, 0],
          getDamp: (elapsed) =>
            elapsed >= 1 ? [0.5, 30] : [0.5, prev === "/contact" ? 50 : 20],
          smoothTime: 0.35,
        };

      case "/contact":
        return {
          getPos: (_, mouse) => [-23 + mouse.x / 4, 6, 31.5],
          getRot: (mouse) => [
            mouse.y * 0.05,
            -Math.PI / 4 + mouse.x * 0.08,
            mouse.y * 0.035,
          ],
          getDamp: () => [0.5, 30],
          smoothTime: 0.5,
        };

      default:
        return {
          getPos: (_, mouse) => [6 + mouse.x, 5 - mouse.y / 6, 2],
          getRot: (mouse) => [mouse.y * 0.02, mouse.x * 0.08, 0],
          getDamp: (elapsed) =>
            elapsed >= 1 ? [0.5, 30] : [prev === "/projects" ? 0.3 : 0.5, 50],
          smoothTime: 0.5,
        };
    }
  }, [pathname, prev]);

const clamp = (v, min = -1, max = 1) => Math.max(min, Math.min(max, v));

export default function Camera() {
  const { pathname, state } = useLocation();
  const prev = state?.prevPathname;
  const mouse = useMousePosition();
  const cameraRef = useRef();
  const startTime = useRef(null);

  const config = useCameraConfig(pathname, prev);

  // Reusable Vector3 and Euler to avoid creating new objects every frame
  const mouseNormalized = useRef({ x: 0, y: 0 }).current;
  const tempPos = useRef(new Vector3()).current;
  const tempRot = useRef(new Euler()).current;
  const seaOffset = useRef(new Vector3()).current;
  const seaRot = useRef(new Euler()).current;

  useEffect(() => {
    startTime.current = null; // reset timer on route change
  }, [pathname]);

  useFrame((state, delta) => {
    const camera = cameraRef.current;
    if (!camera) return;

    if (!startTime.current) startTime.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - startTime.current;

    const m = mouse.current || { x: 0, y: 0 };
    mouseNormalized.x = Math.abs(m.x) < CAMERA_DEADZONE ? 0 : clamp(m.x);
    mouseNormalized.y = Math.abs(m.y) < CAMERA_DEADZONE ? 0 : clamp(m.y);

    const targetPos = config.getPos(elapsed, mouseNormalized);
    const targetRot = config.getRot(mouseNormalized);

    // SEA OFFSET
    const seaT = state.clock.elapsedTime;

    const seaX = Math.sin(seaT * SEA_SPEED * 0.7) * SEA_AMP;
    const seaY = Math.sin(seaT * SEA_SPEED) * SEA_AMP * 0.8;
    const seaXRot = Math.sin(seaT * 0.4) * 0.008;
    const seaYRot = Math.cos(seaT * 0.3) * 0.006;
    const seaZRot = Math.sin(seaT * SEA_SPEED * 0.6) * 0.01;

    easing.damp3(seaOffset, [seaX, seaY, 0], 0.25, delta);
    easing.damp3(seaRot, [seaXRot, seaYRot, seaZRot], 0.25, delta);

    const [lerp, maxSpeed] = config.getDamp(elapsed);

    // Apply offsets
    tempPos.set(
      targetPos[0] + seaOffset.x,
      targetPos[1] + seaOffset.y,
      targetPos[2]
    );

    tempRot.set(
      targetRot[0] + seaRot.x,
      targetRot[1] + seaRot.y,
      targetRot[2] + seaRot.z
    );

    easing.damp3(camera.position, tempPos, lerp, delta, maxSpeed);
    easing.dampE(camera.rotation, tempRot, config.smoothTime, delta);

    camera.updateMatrixWorld();
  });

  return (
    // eslint-disable-next-line react/no-unknown-property
    <group name="Scene" position={[5, 0, 26]}>
      <PerspectiveCamera
        ref={cameraRef}
        name="Camera"
        position={[6, 5, 2]}
        far={90}
        near={0.01}
        fov={75}
        makeDefault
      />
    </group>
  );
}
