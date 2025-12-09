import { forwardRef, memo } from "react";
import { ProjectsSceneEnv } from "../Environments";
import PropTypes from "prop-types";
import Camera2 from "../Camera2";
import { ManualLazyComponent } from "../LazyComponent";
import { useAppStore } from "../../lib/stores/useAppStore";
import { useLocation } from "react-router-dom";

const ProjectsScene = memo(
  forwardRef(function ProjectsScene({ renderTargetC }, textRef) {
    return (
      <>
        <ProjectsSceneEnv />
        <Camera2 />
        <ProjectsSceneContent ref={textRef} renderTargetC={renderTargetC} />
      </>
    );
  })
);

const ProjectsSceneContent = forwardRef(function ProjectsSceneContent(
  { renderTargetC },
  textRef
) {
  const { pathname } = useLocation();
  const started = useAppStore((state) => state.started);

  return (
    <ManualLazyComponent
      ref={textRef}
      shouldLoad={started || pathname === "/projects"}
      delay={pathname === "/projects" ? 0 : 40000}
      loadComponent={() => import("./ProjectsSceneContent")}
      renderTargetC={renderTargetC}
      shouldOuterSuspend={!started}
    />
  );
});

ProjectsScene.propTypes = {
  renderTargetC: PropTypes.object.isRequired,
};

ProjectsSceneContent.propTypes = ProjectsScene.propTypes;

export default ProjectsScene;
