import { forwardRef, memo, Suspense } from "react";
import { ProjectsSceneEnv } from "../Environments";
import PropTypes from "prop-types";
import Camera2 from "../Camera2";
import { ManualLazyComponent } from "../LazyComponent";
import { useAppStore } from "../../lib/stores/useAppStore";

const ProjectsScene = memo(
  forwardRef(function ProjectsScene({ renderTargetC }, textRef) {
    const started = useAppStore((state) => state.started);
    return (
      <>
        <ProjectsSceneEnv />
        <Camera2 position={[5, 0, 26]} />
        <Suspense fallback={null}>
          <ManualLazyComponent
            ref={textRef}
            shouldLoad={started || location.pathname === "/projects"}
            delay={location.pathname === "/projects" ? 0 : 500}
            loadComponent={() => import("./ProjectsSceneContent")}
            renderTargetC={renderTargetC}
          />
        </Suspense>
      </>
    );
  })
);

export default ProjectsScene;

ProjectsScene.propTypes = {
  renderTargetC: PropTypes.object.isRequired,
};
