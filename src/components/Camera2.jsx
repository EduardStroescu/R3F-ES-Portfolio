import { PerspectiveCamera } from "@react-three/drei";

export default function Camera2() {
  return (
    // eslint-disable-next-line react/no-unknown-property
    <group position={[5, 0, 26]}>
      <group name="Scene2">
        <PerspectiveCamera
          name="Camera2"
          far={90}
          near={0.01}
          fov={75}
          position={[6, 5, 2]}
          makeDefault
        />
      </group>
    </group>
  );
}
