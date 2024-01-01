import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";
import { useScroll } from "@react-three/drei";

const material = new THREE.LineBasicMaterial({
  color: "white",
  depthTest: false,
  depthWrite: false,
});
const geometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0, -0.6, 0),
  new THREE.Vector3(0, 0.6, 0),
]);

const damp = THREE.MathUtils.damp;

export function Minimap({ planeGroups }) {
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
        index / planeGroups.length - 1.2 / planeGroups.length,
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
              ? i * 0.04 - planeGroups.length * -0.424
              : i * 0.04 - planeGroups.length * -0.427,
            -4.3,
            4.23,
          ]}
        />
      ))}
    </group>
  );
}
