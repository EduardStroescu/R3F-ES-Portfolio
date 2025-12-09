/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useVideoTexture } from "@react-three/drei";
import { useAppStore } from "../lib/stores/useAppStore";
import { Plane } from "./ProjectsPlane";

// HOC to add video texture to plane
export const VideoPlane = (props) => {
  const activeProject = useAppStore((state) => state.activeProject);
  const videoMaterial = useVideoTexture(props.material, {
    start: false,
    playsInline: true,
    muted: true,
  });

  const videoMaterialMemo = useMemo(
    () => ({ map: videoMaterial }),
    [videoMaterial]
  );

  useEffect(() => {
    if (!videoMaterial) return;
    if (videoMaterial?.source?.data?.currentSrc === activeProject?.video) {
      videoMaterial.source.data.play();
    } else {
      videoMaterial.source.data.pause();
    }
  }, [activeProject.video, videoMaterial]);

  return <Plane {...props} material={videoMaterialMemo} />;
};

VideoPlane.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  material: PropTypes.string,
  scaleX: PropTypes.number.isRequired,
  scaleY: PropTypes.number.isRequired,
  args: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  fog: PropTypes.bool,
};
