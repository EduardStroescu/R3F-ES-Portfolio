/* eslint-disable react/no-unknown-property */
import { memo, useEffect } from "react";
import PropTypes from "prop-types";
import { useVideoTexture } from "@react-three/drei";
import { useAppStore } from "../lib/stores/useAppStore";

export const VideoPlane = memo(function VideoPlane({
  position,
  material,
  scaleX,
  scaleY,
  aspect,
  fog = true,
}) {
  const activeProject = useAppStore((state) => state.activeProject);
  const videoMaterial = useVideoTexture(material, {
    start: false,
    playsInline: true,
    muted: true,
  });

  useEffect(() => {
    if (!videoMaterial) return;
    if (videoMaterial?.source?.data?.currentSrc === activeProject?.video) {
      videoMaterial.source.data.play();
    } else {
      videoMaterial.source.data.pause();
    }
  }, [activeProject.video, videoMaterial]);

  return (
    <group position={position} scale-x={scaleX} scale-y={scaleY}>
      <mesh>
        <planeGeometry args={aspect} />
        <meshBasicMaterial map={videoMaterial} fog={fog} />
      </mesh>
    </group>
  );
});

VideoPlane.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  material: PropTypes.string,
  scaleX: PropTypes.number.isRequired,
  scaleY: PropTypes.number.isRequired,
  aspect: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  fog: PropTypes.bool,
};
