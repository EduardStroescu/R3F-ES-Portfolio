import { forwardRef, memo } from "react";
import { ProjectsSceneEnv } from "../Environments";
import PropTypes from "prop-types";
import Camera2 from "../Camera2";
import { ManualLazyComponent } from "../LazyComponent";
import { useAppStore } from "../../lib/stores/useAppStore";
import { useLocation } from "react-router-dom";

const ProjectsScene = memo(
  forwardRef(function ProjectsScene({ renderTargetC }, textRef) {
    const { pathname } = useLocation();
    const started = useAppStore((state) => state.started);

    return (
      <>
        <ProjectsSceneEnv />
        <Camera2 position={[5, 0, 26]} />
        <ManualLazyComponent
          ref={textRef}
          shouldLoad={started || pathname === "/projects"}
          delay={pathname === "/projects" ? 0 : 500}
          loadComponent={() => import("./ProjectsSceneContent")}
          renderTargetC={renderTargetC}
        />
      </>
    );
  })
);

export default ProjectsScene;

ProjectsScene.propTypes = {
  renderTargetC: PropTypes.object.isRequired,
};
