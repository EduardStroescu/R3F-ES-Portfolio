import { MeshWobbleMaterial, Text, useTrailTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { TrailConfig } from "../../lib/data/trailConfig";
import titleFont from "/fonts/Dosis-SemiBold.woff";
import { useLocation } from "react-router-dom";

function HomeTitle() {
  const location = useLocation();
  const { size } = useThree();
  const viewport = { width: size.width / 10 };

  const [texture2, onMove2] = useTrailTexture(TrailConfig.secondTrail);
  const [texture3, onMove3] = useTrailTexture(TrailConfig.secondTrail);
  return (
    <>
      <Text
        visible={location.pathname === "/"}
        onPointerMove={onMove2}
        anchorY="middle"
        anchorX="center"
        font={titleFont}
        characters="Web Developer"
        position={[11, 6, 10]}
        fontSize={viewport.width > 111 ? 3 : 2}
        fillOpacity={1.5}
        curveRadius={9}
        maxWidth={size.width}
      >
        <MeshWobbleMaterial map={texture2} emissive="#faf7fa" factor={0.2} />
        WEB DEVELOPER
      </Text>
      <Text
        visible={location.pathname === "/"}
        onPointerMove={onMove3}
        anchorY="middle"
        anchorX="center"
        font={titleFont}
        characters="Portfolio"
        position={[11, 3, 11]}
        fontSize={viewport.width > 111 ? 3 : 2.1}
        fillOpacity={1.5}
        curveRadius={9}
      >
        <MeshWobbleMaterial map={texture3} emissive="#faf7fa" factor={0.2} />
        PORTFOLIO
      </Text>
    </>
  );
}

export default HomeTitle;
