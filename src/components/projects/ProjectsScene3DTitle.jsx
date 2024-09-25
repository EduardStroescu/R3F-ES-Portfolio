import { MeshTransmissionMaterial, Text } from "@react-three/drei";
import titleFont from "/fonts/Dosis-SemiBold.woff";
import { useThree } from "@react-three/fiber";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { useAppStore } from "../../lib/stores/useAppStore";
import { animated, easings, useSpring } from "@react-spring/three";

const AnimatedMeshTransmissionMaterial = animated(MeshTransmissionMaterial);
const AnimatedText = animated(Text);

const ProjectsScene3DTitle = memo(
  forwardRef(function ProjectsScene3DTitle({ renderTargetC }, textRef) {
    const activeProject = useAppStore((state) => state.activeProject);
    const { size } = useThree();
    const viewport = { width: size.width, height: size.height };

    const spring = useSpring({
      from: { fillOpacity: 0, position: [11, -5.5, 11] },
      color: activeProject.titleColor,
      fillOpacity: 1,
      position: [11, -5, 11],
      reset: true,
      config: { duration: 500, easing: easings.easeInOut },
    });

    if (!activeProject.title) return;

    return (
      <AnimatedText
        ref={textRef}
        anchorY="middle"
        font={titleFont}
        characters={activeProject.title}
        position={spring.position}
        fontSize={(viewport.width / viewport.height) * 3.5}
        maxWidth={viewport.width}
        fillOpacity={spring.fillOpacity}
      >
        <AnimatedMeshTransmissionMaterial
          buffer={renderTargetC.texture}
          samples={5}
          depthTest={false}
          depthWrite={false}
          fog={false}
          emissive={spring.color}
          transmission={1}
          ior={1}
          thickness={10}
          anisotropy={1}
          chromaticAberration={0.1}
        />
        {activeProject.title}
      </AnimatedText>
    );
  })
);

export default ProjectsScene3DTitle;

ProjectsScene3DTitle.propTypes = {
  renderTargetC: PropTypes.object.isRequired,
};
