import { useTrailTexture } from "@react-three/drei";
import { MeshReflectorMaterial } from "../shaders/waterShader/MeshReflectorMaterial";
import { TrailConfig } from "../data/trailConfig";

export function WaterComponent({ homeSceneActive }) {
  const [texture, onMove] = useTrailTexture(TrailConfig.firstTrail);

  return (
    <mesh
      visible={homeSceneActive}
      position={[10, -0.52, 15]}
      onPointerMove={onMove}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[300, 200, 50, 50]} />
      <MeshReflectorMaterial
        args={[100, 100, 50, 50]} // PlaneBufferGeometry arguments
        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality
        key={MeshReflectorMaterial.key}
        mapp={texture}
        distortionMap={texture}
        distortion={0.05}
        amount={0.05}
        depthScale={90}
        mixStrength={0.8} // Strength of the reflections
        rotation={[-Math.PI * 0.5, 0, 0]}
        mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        minDepthThreshold={0.1}
        maxDepthThreshold={10}
        color="cyan"
        roughness={0}
        metalness={1}
        blur={0} // Blur ground reflections (width, heigt), 0 skips blur
        toneMapped={false}
      />
    </mesh>
  );
}
