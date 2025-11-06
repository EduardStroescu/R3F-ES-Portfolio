/* eslint-disable react/no-unknown-property */
import { memo } from "react";
import PropTypes from "prop-types";
import { PlaneGeometry } from "three";

const GEO_CACHE = new Map();
const getPlaneGeo = (args) => {
  const key = args.join("x");
  if (!GEO_CACHE.has(key)) {
    GEO_CACHE.set(key, new PlaneGeometry(...args));
  }
  return GEO_CACHE.get(key);
};

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
      <mesh geometry={getPlaneGeo(aspect)}>
        <meshBasicMaterial {...material} fog={fog} toneMapped={false} />
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
