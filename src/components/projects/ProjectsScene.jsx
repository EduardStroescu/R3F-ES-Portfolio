import { forwardRef, lazy, memo } from "react";
import { ProjectsSceneEnv } from "../Environments.jsx";
import PropTypes from "prop-types";
import Camera2 from "../Camera2.jsx";

const ProjectsSceneContent = lazy(() => import("./ProjectsSceneContent.jsx"));

const ProjectsScene = memo(
  forwardRef(function ProjectsScene({ renderTargetC }, textRef) {
    return (
      <>
        <ProjectsSceneEnv />
        <Camera2 position={[5, 0, 26]} />
        <ProjectsSceneContent ref={textRef} renderTargetC={renderTargetC} />
      </>
    );
  })
);

export default ProjectsScene;

ProjectsScene.propTypes = {
  renderTargetC: PropTypes.object.isRequired,
};
