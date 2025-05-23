/* eslint-disable react/no-unknown-property */
import { useGLTF, useTexture } from "@react-three/drei";
import { DoubleSide } from "three";

useGLTF.preload(
  "https://res.cloudinary.com/dgfe1xsgj/image/upload/fl_immutable_cache/v1705318276/Portfolio/Model/kshsdufjorbekpswudbq.glb"
);
useTexture.preload(
  "https://res.cloudinary.com/dgfe1xsgj/image/upload/c_scale,dpr_auto,fl_immutable_cache,h_2048,q_auto,w_2048/v1705318276/Portfolio/Model/lnac4hlhof7ttgmjuxyl.webp"
);

export default function HomeModel() {
  const { nodes } = useGLTF(
    "https://res.cloudinary.com/dgfe1xsgj/image/upload/fl_immutable_cache/v1705318276/Portfolio/Model/kshsdufjorbekpswudbq.glb"
  );
  const bakedTexture = useTexture(
    "https://res.cloudinary.com/dgfe1xsgj/image/upload/c_scale,dpr_auto,fl_immutable_cache,h_2048,q_auto,w_2048/v1705318276/Portfolio/Model/lnac4hlhof7ttgmjuxyl.webp"
  );
  bakedTexture.flipY = false;

  return (
    <group dispose={null}>
      <mesh geometry={nodes.baked.geometry}>
        <meshBasicMaterial map={bakedTexture} side={DoubleSide} />
      </mesh>
    </group>
  );
}
