/* eslint-disable react/no-unknown-property */
import { useAppStore, useAppStoreActions } from "../../lib/stores/useAppStore";
import { a, useSpring } from "@react-spring/three";

const Sun = function Sun() {
  const { setSun } = useAppStoreActions();
  const started = useAppStore((state) => state.started);

  const { opacity } = useSpring({
    from: { opacity: 0 },
    to: { opacity: started ? 1 : 0 },
    config: { mass: 5, tension: 500, friction: 80, clamp: true },
    delay: 250,
  });

  return (
    <mesh ref={setSun} position={[11, 16, 11]} scale={[4, 1, 4]}>
      <cylinderGeometry args={[1.1, 1.1, 1.1, 5]} />
      <a.meshBasicMaterial color={"#fac5f3"} opacity={opacity} transparent />
    </mesh>
  );
};

export default Sun;
