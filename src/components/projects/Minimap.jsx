/* eslint-disable react/no-unknown-property */
import { useFrame } from "@react-three/fiber";
import { memo, useEffect, useRef } from "react";
import { Vector3, LineBasicMaterial } from "three";
import { MathUtils } from "three";
import { BufferGeometry } from "three";
import { useScrollContext } from "../../lib/providers/ScrollProvider";
import { useAppStore } from "../../lib/stores/useAppStore";
import { projectsData } from "../../lib/data/projectsData";

const projects = projectsData;

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

const Minimap = memo(function Minimap() {
  const groupRef = useRef();
  const { scroll } = useScrollContext();

  const activeSceneRef = useRef(useAppStore.getState().activeScene);

  useEffect(() => {
    // Subscribe to changes in the store
    const unsubscribe = useAppStore.subscribe(
      (state) => (activeSceneRef.current = state.activeScene)
    );

    return () => unsubscribe();
  }, []);

  useFrame((delta) => {
    if (!groupRef?.current || activeSceneRef?.current !== "projects") return;

    groupRef.current.children.forEach((child, index) => {
      // Generate a value between 0 and 1
      //   starting at the position of the current item
      //   ranging across 4 / total length
      //   make it a sine, so the value goes from 0 to 1 to 0.
      const y = scroll.curve(
        index / projects.length - 1.8 / projects.length,
        4 / projects.length
      );
      child.scale.y = damp(child.scale.y, 0.1 + y / 3, 8, 8, delta);
    });
  });

  return (
    <group ref={groupRef} scale-x={5} scale-y={2} scale-z={5}>
      {projects.map((_, i) => (
        <line
          key={i}
          geometry={geometry}
          material={material}
          position={[
            i * 0.04 - ((projects.length - 1) * 0.04) / 2 + 2.21,
            -4.45,
            4.23,
          ]}
        />
      ))}
    </group>
  );
});

export default Minimap;
