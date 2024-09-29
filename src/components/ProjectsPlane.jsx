/* eslint-disable react/no-unknown-property */
import { memo } from "react";
import PropTypes from "prop-types";

export const Plane = memo(function Plane({
  position,
  material,
  aspect,
  scaleX,
  scaleY,
  fog = true,
}) {
  return (
    <group position={position} scale-x={scaleX} scale-y={scaleY}>
      <mesh>
        <planeGeometry args={aspect} />
        <meshBasicMaterial {...material} fog={fog} />
      </mesh>
    </group>
  );
});

Plane.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  material: PropTypes.object.isRequired,
  aspect: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  scaleX: PropTypes.number.isRequired,
  scaleY: PropTypes.number.isRequired,
  fog: PropTypes.bool,
};
