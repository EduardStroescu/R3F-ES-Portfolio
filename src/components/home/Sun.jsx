/* eslint-disable react/no-unknown-property */
import { useAppStoreActions } from "../../lib/stores/useAppStore";

const Sun = function Sun() {
  const { setSun } = useAppStoreActions();
  return (
    <mesh ref={setSun} position={[11, 16, 11]} scale={[4, 1, 4]}>
      <cylinderGeometry args={[1.1, 1.1, 1.1, 5]} />
      <meshBasicMaterial color={"#fac5f3"} />
    </mesh>
  );
};

export default Sun;
