/* eslint-disable react/no-unknown-property */
import { useTrailTexture } from "@react-three/drei";
import { MeshReflectorMaterial } from "../../lib/shaders/waterShader/MeshReflectorMaterial";
import { useAppStore } from "../../lib/stores/useAppStore";
import { useShallow } from "zustand/react/shallow";

const waterTrailConfig = {
  size: 32,
  radius: 0.07,
  maxAge: 400,
  interpolate: 1,
  smoothing: 0.5,
  minForce: 0.8,
  intensity: 0.1,
  blend: "lighten",
};

function WaterComponent() {
  const [texture, onMove] = useTrailTexture(waterTrailConfig);
  const { activeScene, viewportWidth } = useAppStore(
    useShallow((state) => ({
      activeScene: state.activeScene,
      viewportWidth: state.viewportWidth,
    }))
  );

  return (
    <mesh
      visible={activeScene !== "projects"}
      position={[10, -0.52, 15]}
      onPointerMove={onMove}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[300, 200, 28, 28]} />
      <MeshReflectorMaterial
        resolution={viewportWidth >= 1024 ? 1024 : 512} // Off-buffer resolution, lower=faster, higher=better quality
        mapp={texture}
        distortionMap={texture}
        distortion={0.15}
        amount={0.08}
        mixStrength={0.9} // Strength of the reflections
        mirror={0.9} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthScale={30}
        minDepthThreshold={viewportWidth >= 1024 ? -0.04 : 0.1}
        maxDepthThreshold={viewportWidth >= 1024 ? 0.8 : 10}
        color="#05faea"
        roughness={0}
        metalness={0.05}
        blur={0} // Blur ground reflections (width, heigt), 0 skips blur
      />
    </mesh>
  );
}

export default WaterComponent;
