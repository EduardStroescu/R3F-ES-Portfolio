/* eslint-disable react/no-unknown-property */
import { useFrame, useThree } from "@react-three/fiber";
import { memo, useRef } from "react";
import { useScroll } from "@react-three/drei";
import { Vector3, LineBasicMaterial } from "three";
import { MathUtils } from "three";
import { BufferGeometry } from "three";
import PropTypes from "prop-types";

const material = new LineBasicMaterial({
  color: "white",
  depthTest: false,
  depthWrite: false,
});
const geometry = new BufferGeometry().setFromPoints([
  new Vector3(0, -0.6, 0),
  new Vector3(0, 0.6, 0),
]);

const damp = MathUtils.damp;

const Minimap = memo(function Minimap({ planeGroups }) {
  const ref = useRef();
  const scroll = useScroll();
  const { size } = useThree();
  const viewport = { width: size.width / 10 };

  useFrame((delta) => {
    ref.current.children.forEach((child, index) => {
      // Generate a value between 0 and 1
      //   starting at the position of the current item
      //   ranging across 4 / total length
      //   make it a sine, so the value goes from 0 to 1 to 0.
      const y = scroll.curve(
        index / planeGroups.length - 1.8 / planeGroups.length,
        4 / planeGroups.length
      );
      child.scale.y = damp(child.scale.y, 0.1 + y / 3, 8, 8, delta);
    });
  });

  return (
    <group ref={ref} scale-x={5} scale-y={2} scale-z={5}>
      {planeGroups.map((_, i) => (
        <line
          key={i}
          geometry={geometry}
          material={material}
          position={[
            viewport.width > 111
              ? i * 0.04 - planeGroups.length * -0.35
              : i * 0.04 - planeGroups.length * -0.35,
            -4.25,
            4.23,
          ]}
        />
      ))}
    </group>
  );
});

export default Minimap;

Minimap.propTypes = {
  planeGroups: PropTypes.arrayOf(PropTypes.array).isRequired,
};
