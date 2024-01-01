import { useGLTF, useTexture } from "@react-three/drei";

export function HomeModel() {
  const { nodes } = useGLTF("./models/model.glb");
  const bakedTexture = useTexture("./models/Bake.jpg");
  bakedTexture.flipY = false;

  return (
    <mesh geometry={nodes.baked.geometry}>
      <meshBasicMaterial map={bakedTexture} />
    </mesh>
  );
}

useGLTF.preload("./models/model.glb");
