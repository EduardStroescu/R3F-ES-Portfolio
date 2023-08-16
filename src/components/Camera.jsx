import { useRef, useEffect } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Euler, Quaternion } from "three";
import { easing } from "maath";

import { useAppContext } from "./AppContextProvider.jsx";

export default function Camera(props) {
  const group = useRef();
  const cameraRef = useRef();
  // const { animations } = useGLTF("./models/Camera.glb");
  // const { actions } = useAnimations(animations, group);
  // const [paused, setPaused] = useState(true); // Start animation as paused

  const set = useThree((state) => state.set);
  useEffect(() => void set({ camera: cameraRef.current }));
  useFrame(() => cameraRef.current.updateMatrixWorld());

  // useEffect(() => {
  //   const animation = actions["CameraAction.003"];
  //   animation.play();

  //   // Check if the animation should reverse
  //   if (animation.time === 40) {
  //     animation.setEffectiveTimeScale(-1);
  //   } else {
  //     animation.setEffectiveTimeScale(-1);
  //   }

  //   const handleKeyPress = (event) => {
  //     if (event.code === "Space") {
  //       actions["CameraAction.003"].paused =
  //         !actions["CameraAction.003"].paused;
  //       setPaused(!paused);
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyPress);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, [actions, paused]);

  // // Pause animation if it was initially started as paused
  // useEffect(() => {
  //   actions["CameraAction.003"].paused = paused;
  // }, [actions, paused]);

  // const stopped = false;
  const { location } = useAppContext();

  useFrame((state, delta) => {
    // const time = Math.floor(state.clock.elapsedTime);
    // actions["CameraAction.003"].mixer?.update(time);
    if (location.pathname === "/") {
      easing.damp3(
        state.camera.position,
        [6 + state.pointer.x, 5, 2],
        0.5,
        delta
      );

      // Calculate the rotation target based on mouse position
      const rotationTarget = new Quaternion().setFromEuler(
        new Euler(
          state.pointer.y * 0.02, // Y-axis rotation
          state.pointer.x * 0.04, // X-axis rotation
          Math.atan2(state.pointer.x, state.pointer.y) * 0, // Z-axis rotation
          "XYZ" // Rotation order (adjust as needed)
        )
      );

      // Apply the fixed point rotation conditionally
      const maxMovementThreshold = 20; // Adjust the threshold as needed
      if (state.pointer.x >= maxMovementThreshold) {
        const fixedPointRotation = new Quaternion().setFromEuler(
          new Euler(
            20, // Additional rotation around X-axis
            0 + state.pointer.y, // Additional rotation around Y-axis
            0 // Additional rotation around Z-axis
          )
        );
        rotationTarget.multiply(fixedPointRotation);
      }

      // Interpolate the camera rotation towards the rotation target
      state.camera.quaternion.slerp(rotationTarget, 0.1);
    } else if (location.pathname === "/projects") {
      easing.damp3(
        state.camera.position,
        [6 + state.pointer.x, 5, 2],
        0.5,
        delta
      );

      // Calculate the rotation target based on mouse position
      const rotationTarget = new Quaternion().setFromEuler(
        new Euler(
          state.pointer.y * 0.02, // Y-axis rotation
          state.pointer.x * 0.04, // X-axis rotation
          Math.atan2(state.pointer.x, state.pointer.y) * 0, // Z-axis rotation
          "XYZ" // Rotation order (adjust as needed)
        )
      );

      // Apply the fixed point rotation conditionally
      const maxMovementThreshold = 20; // Adjust the threshold as needed
      if (state.pointer.x >= maxMovementThreshold) {
        const fixedPointRotation = new Quaternion().setFromEuler(
          new Euler(
            20, // Additional rotation around X-axis
            0 + state.pointer.y, // Additional rotation around Y-axis
            0 // Additional rotation around Z-axis
          )
        );
        rotationTarget.multiply(fixedPointRotation);
      }

      // Interpolate the camera rotation towards the rotation target
      state.camera.quaternion.slerp(rotationTarget, 0.1);
    } else {
      easing.damp3(
        state.camera.position,
        [-4 + state.pointer.x, 6, 22],
        0.5,
        delta
      );
      state.camera.lookAt(10, 6, 15);
      const rotationTarget = new Quaternion().setFromEuler(
        new Euler(
          state.pointer.y * 0.02, // Y-axis rotation
          state.pointer.x * 0.04, // X-axis rotation
          Math.atan2(state.pointer.x, state.pointer.y) * 0, // Z-axis rotation
          "XYZ" // Rotation order (adjust as needed)
        )
      );

      // Apply the fixed point rotation conditionally
      const maxMovementThreshold = 20; // Adjust the threshold as needed
      if (state.pointer.x >= maxMovementThreshold) {
        const fixedPointRotation = new Quaternion().setFromEuler(
          new Euler(
            20, // Additional rotation around X-axis
            0 + state.pointer.y, // Additional rotation around Y-axis
            0 // Additional rotation around Z-axis
          )
        );
        rotationTarget.multiply(fixedPointRotation);
      }

      // Interpolate the camera rotation towards the rotation target
      state.camera.quaternion.slerp(rotationTarget, 0.1);
    }
    // You can perform any additional tracking or calculations with the camera position here
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
          // position={[15, 10, 60]}
          makeDefault
        />
      </group>
    </group>
  );
}

// useGLTF.preload("./models/Camera.glb");
