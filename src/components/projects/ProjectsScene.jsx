import { forwardRef, memo, Suspense } from "react";
import { ProjectsSceneEnv } from "../Environments";
import PropTypes from "prop-types";
import Camera2 from "../Camera2";
import { ManualLazyComponent } from "../LazyComponent";
import { useAppStore } from "../../lib/stores/useAppStore";
import { useLocation } from "react-router-dom";
import ProjectsScene3DTitle from "./ProjectsScene3DTitle";

const ProjectsScene = memo(
  forwardRef(function ProjectsScene({ textRenderTarget }, textRef) {
    return (
      <>
        <ProjectsSceneEnv />
        <Camera2 />
        <ProjectsSceneContent />
        {/* We load the title here without lazy to prevent transition stutters */}
        <Suspense fallback={null}>
          <ProjectsScene3DTitle
            ref={textRef}
            textRenderTarget={textRenderTarget}
          />
        </Suspense>
      </>
    );
  })
);

const ProjectsSceneContent = () => {
  const { pathname } = useLocation();
  const started = useAppStore((state) => state.started);

  return (
    <ManualLazyComponent
      shouldLoad={started || pathname === "/projects"}
      delay={pathname === "/projects" ? 0 : 40000}
      loadComponent={() => import("./ProjectsSceneContent")}
      shouldOuterSuspend={!started}
    />
  );
};

ProjectsScene.propTypes = {
  textRenderTarget: PropTypes.object.isRequired,
};

export default ProjectsScene;
