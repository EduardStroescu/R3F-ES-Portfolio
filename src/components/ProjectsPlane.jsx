/* eslint-disable react/no-unknown-property */
import { useThree } from "@react-three/fiber";
import { memo, useRef } from "react";
import PropTypes from "prop-types";

export const Plane = memo(function Plane({ position, material }) {
  const ref = useRef();
  const { size } = useThree();
  const viewport = { width: size.width / 10 };

  return (
    <group
      position={position}
      scale-x={viewport.width > 111 ? 1.5 : 0.4}
      scale-y={viewport.width > 111 ? 1.5 : 0.5}
    >
      <mesh ref={ref}>
        <planeGeometry args={[15, 10]} />
        <meshBasicMaterial {...material} fog={true} />
      </mesh>
    </group>
  );
});

Plane.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  material: PropTypes.object.isRequired,
};
