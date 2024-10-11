import { MeshWobbleMaterial, Text, useTrailTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { TrailConfig } from "../../lib/data/trailConfig";
import titleFont from "/fonts/Dosis-SemiBold.woff";
import { useLocation } from "react-router-dom";
import { useSpring } from "@react-spring/web";
import { animated } from "@react-spring/three";
const AnimatedMeshWobbleMaterial = animated(MeshWobbleMaterial);
const AnimatedText = animated(Text);

function HomeTitle() {
  const location = useLocation();
  const { size } = useThree();
  const viewport = { width: size.width / 10, height: size.height };

  const [texture2, onMove2] = useTrailTexture(TrailConfig.secondTrail);
  const [texture3, onMove3] = useTrailTexture(TrailConfig.secondTrail);

  const { opacity } = useSpring({
    opacity: location.pathname === "/" ? 1 : 0,
    config: { mass: 1, tension: 500, friction: 50 },
  });

  return (
    <>
      <AnimatedText
        visible={opacity !== 0}
        onPointerMove={onMove2}
        anchorY="middle"
        anchorX="center"
        font={titleFont}
        characters="Web Developer"
        position={[11, viewport.width > 111 ? 7 : 6.3, 9]}
        fontSize={
          viewport.width > 111
            ? 3.2
            : Math.min(
                (viewport.width * 10.5) / (viewport.height / 2) + 0.78,
                3
              )
        }
        fillOpacity={1.5}
        curveRadius={viewport.width > 111 ? 9 : 9}
        maxWidth={size.width}
      >
        <AnimatedMeshWobbleMaterial
          opacity={opacity}
          map={texture2}
          emissive="#faf7fa"
          factor={0.15}
        />
        FULL-STACK
      </AnimatedText>
      <AnimatedText
        visible={opacity !== 0}
        onPointerMove={onMove3}
        anchorY="middle"
        anchorX="center"
        font={titleFont}
        characters="Portfolio"
        position={[11, viewport.width > 111 ? 4 : 4.2, 10]}
        fontSize={
          viewport.width > 111
            ? 3.2
            : Math.min((viewport.width * 10.5) / (viewport.height / 2) + 0.8, 3)
        }
        fillOpacity={1.5}
        curveRadius={viewport.width > 111 ? 10 : 9}
      >
        <AnimatedMeshWobbleMaterial
          opacity={opacity}
          map={texture3}
          emissive="#faf7fa"
          factor={0.1}
        />
        WEB DEVELOPER
      </AnimatedText>
    </>
  );
}

export default HomeTitle;
