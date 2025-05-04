import { MeshWobbleMaterial, Text, useTrailTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useLocation } from "react-router-dom";
import { useSpring } from "@react-spring/web";
import { animated } from "@react-spring/three";

const AnimatedMeshWobbleMaterial = animated(MeshWobbleMaterial);
const AnimatedText = animated(Text);

const titleTrailConfig = {
  size: 32,
  radius: 0.5,
  maxAge: 500,
  interpolate: 1,
  smoothing: 0.5,
  minForce: 0.8,
  intensity: 0.5,
  blend: "screen",
};

function HomeTitle() {
  const { pathname } = useLocation();
  const { size } = useThree();
  const viewport = { width: size.width, height: size.height };

  const [texture2, onMove2] = useTrailTexture(titleTrailConfig);
  const [texture3, onMove3] = useTrailTexture(titleTrailConfig);

  const { opacity } = useSpring({
    from: { opacity: 0 },
    to: { opacity: pathname === "/" ? 1 : 0 },
    config: { mass: 5, tension: 500, friction: 80, clamp: true },
  });

  return (
    <>
      <AnimatedText
        visible={opacity.to((o) => (o !== 0 ? true : false))}
        onPointerMove={onMove2}
        anchorY="middle"
        anchorX="center"
        font={"/fonts/Dosis-SemiBold-v1.woff"}
        characters="FULL-STACK"
        position={[11, viewport.width > 667 ? 7 : 6.3, 9]}
        fontSize={
          viewport.width > 1110
            ? 3.2
            : Math.min(
                (viewport.width * 1.05) / (viewport.height / 2) + 0.78,
                3
              )
        }
        fillOpacity={1.5}
        curveRadius={viewport.width > 1110 ? 9 : 9}
        maxWidth={viewport.width}
      >
        <AnimatedMeshWobbleMaterial
          opacity={opacity}
          map={texture2}
          emissive="#ebebeb"
          factor={0.15}
        />
        FULL-STACK
      </AnimatedText>
      <AnimatedText
        visible={opacity.to((o) => (o !== 0 ? true : false))}
        onPointerMove={onMove3}
        anchorY="middle"
        anchorX="center"
        font={"/fonts/Dosis-SemiBold-v1.woff"}
        characters="WEB DEVELOPER"
        position={[11, viewport.width > 667 ? 4 : 4.2, 10]}
        fontSize={
          viewport.width > 1110
            ? 3.2
            : Math.min((viewport.width * 1.05) / (viewport.height / 2) + 0.8, 3)
        }
        fillOpacity={1.5}
        curveRadius={viewport.width > 1110 ? 10 : 9}
      >
        <AnimatedMeshWobbleMaterial
          opacity={opacity}
          map={texture3}
          emissive="#ebebeb"
          factor={0.1}
        />
        WEB DEVELOPER
      </AnimatedText>
    </>
  );
}

export default HomeTitle;
