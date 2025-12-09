/* eslint-disable react/no-unknown-property */
import { Suspense, forwardRef, memo } from "react";
import PropTypes from "prop-types";

import Minimap from "./Minimap";
import { ProjectDetails } from "./ProjectDetails";
import { useAppStore } from "../../lib/stores/useAppStore";
import ProjectsScenePlanes from "./ProjectsScenePlanes";
import ProjectsScene3DTitle from "./ProjectsScene3DTitle";

const ProjectsSceneContent = memo(
  forwardRef(function ProjectsSceneContent({ renderTargetC }, textRef) {
    const activeScene = useAppStore((state) => state.activeScene);

    return (
      <group visible={activeScene !== "home"}>
        <Minimap />
        <ProjectsScenePlanes />
        <Suspense fallback={null}>
          <ProjectsScene3DTitle ref={textRef} renderTargetC={renderTargetC} />
        </Suspense>
        <Suspense fallback={null}>
          {activeScene === "projects" && <ProjectDetails />}
        </Suspense>
      </group>
    );
  })
);

export default ProjectsSceneContent;

ProjectsSceneContent.propTypes = {
  renderTargetC: PropTypes.object.isRequired,
};
