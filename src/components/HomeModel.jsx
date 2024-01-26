/* eslint-disable react/no-unknown-property */
import { useGLTF, useTexture } from "@react-three/drei";

export function HomeModel() {
  const { nodes } = useGLTF(
    "https://res.cloudinary.com/dgfe1xsgj/image/upload/v1705318276/Portfolio/Model/kshsdufjorbekpswudbq.glb"
  );
  const bakedTexture = useTexture(
    "https://res.cloudinary.com/dgfe1xsgj/image/upload/f_auto,q_auto/v1/Portfolio/Model/lnac4hlhof7ttgmjuxyl"
  );
  bakedTexture.flipY = false;

  return (
    <mesh geometry={nodes.baked.geometry}>
      <meshBasicMaterial map={bakedTexture} />
    </mesh>
  );
}

useGLTF.preload(
  "https://res.cloudinary.com/dgfe1xsgj/image/upload/v1705318276/Portfolio/Model/kshsdufjorbekpswudbq.glb"
);
