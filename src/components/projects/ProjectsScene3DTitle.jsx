import { MeshTransmissionMaterial, Text } from "@react-three/drei";
import titleFont from "../../assets/fonts/Dosis-SemiBold.woff";
import { useThree } from "@react-three/fiber";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { useAppStore } from "../../lib/store";

const ProjectsScene3DTitle = memo(
  forwardRef(function ProjectsScene3DTitle({ renderTargetC }, textRef) {
    const activeProject = useAppStore((state) => state.activeProject);
    const { size } = useThree();
    const viewport = { width: size.width, height: size.height };

    if (!activeProject.title) return;

    return (
      <Text
        ref={textRef}
        anchorY="middle"
        font={titleFont}
        characters={activeProject.title}
        position={[11, -5, 11]}
        fontSize={(viewport.width / viewport.height) * 3.5}
        maxWidth={viewport.width}
      >
        <MeshTransmissionMaterial
          buffer={renderTargetC.texture}
          samples={5}
          depthTest={false}
          depthWrite={false}
          fog={false}
          emissive={activeProject.titleColor}
          transmission={1}
          ior={1}
          thickness={10}
          anisotropy={1}
          chromaticAberration={0.1}
        />
        {activeProject.title}
      </Text>
    );
  })
);

export default ProjectsScene3DTitle;

ProjectsScene3DTitle.propTypes = {
  renderTargetC: PropTypes.object.isRequired,
};
