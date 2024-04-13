/* eslint-disable react/no-unknown-property */
import { forwardRef } from "react";

const Sun = forwardRef(function Sun(props, ref) {
  return (
    <mesh ref={ref} position={[11, 16, 11]} scale={[4, 1, 4]}>
      <cylinderGeometry args={[1.1, 1.1, 1.1, 5]} />
      <meshBasicMaterial color={"#fac5f3"} />
    </mesh>
  );
});

export default Sun;
