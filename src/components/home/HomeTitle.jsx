import { MeshWobbleMaterial, Text, useTrailTexture } from "@react-three/drei";
import { useLocation } from "react-router-dom";
import { useSpring } from "@react-spring/web";
import { animated } from "@react-spring/three";
import { useAppStore } from "../../lib/stores/useAppStore";
import { useShallow } from "zustand/react/shallow";
import { useMemo } from "react";

const AnimatedMeshWobbleMaterial = animated(MeshWobbleMaterial);
const AnimatedText = animated(Text);

const baseTextProps = {
  anchorY: "middle",
  anchorX: "center",
  font: "/fonts/Dosis-SemiBold-v1.woff",
  fillOpacity: 1.5,
};

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

  const { viewportWidth, viewportHeight } = useAppStore(
    useShallow((state) => ({
      viewportWidth: state.viewportWidth,
      viewportHeight: state.viewportHeight,
    }))
  );

  const [texture2, onMove2] = useTrailTexture(titleTrailConfig);
  const [texture3, onMove3] = useTrailTexture(titleTrailConfig);

  const { opacity } = useSpring({
    from: { opacity: 0 },
    to: { opacity: pathname === "/" ? 1 : 0 },
    config: { mass: 5, tension: 500, friction: 80, clamp: true },
  });

  const fontSizes = useMemo(
    () => ({
      title:
        viewportWidth > 1110
          ? 3.2
          : Math.min((viewportWidth * 1.05) / (viewportHeight / 2) + 0.78, 3),
      subtitle:
        viewportWidth > 1110
          ? 3.2
          : Math.min((viewportWidth * 1.05) / (viewportHeight / 2) + 0.8, 3),
    }),
    [viewportWidth, viewportHeight]
  );

  const otherConfigs = useMemo(() => {
    const titleY = viewportWidth > 667 ? 7 : 6.3;
    const subtitleY = viewportWidth > 667 ? 4 : 4.2;

    return {
      positions: {
        title: [11, titleY, 9],
        subtitle: [11, subtitleY, 10],
      },
      curveRadiuses: {
        title: 9,
        subtitle: viewportWidth > 1110 ? 10 : 9,
      },
    };
  }, [viewportWidth]);

  return (
    <>
      <AnimatedText
        {...baseTextProps}
        visible={opacity.to((o) => (o !== 0 ? true : false))}
        onPointerMove={onMove2}
        characters="FULL-STACK"
        position={otherConfigs.positions.title}
        fontSize={fontSizes.title}
        curveRadius={otherConfigs.curveRadiuses.title}
        maxWidth={viewportWidth}
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
        {...baseTextProps}
        visible={opacity.to((o) => (o !== 0 ? true : false))}
        onPointerMove={onMove3}
        characters="WEB DEVELOPER"
        position={otherConfigs.positions.subtitle}
        fontSize={fontSizes.subtitle}
        curveRadius={otherConfigs.curveRadiuses.subtitle}
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
