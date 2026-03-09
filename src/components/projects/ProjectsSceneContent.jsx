/* eslint-disable react/no-unknown-property */
import { Suspense, memo } from "react";

import Minimap from "./Minimap";
import { ProjectDetails } from "./ProjectDetails";
import { useAppStore } from "../../lib/stores/useAppStore";
import ProjectsScenePlanes from "./ProjectsScenePlanes";

const ProjectsSceneContent = memo(function ProjectsSceneContent() {
  const activeScene = useAppStore((state) => state.activeScene);

  return (
    <group visible={activeScene !== "home"}>
      <Minimap />
      <ProjectsScenePlanes />

      <Suspense fallback={null}>
        {activeScene === "projects" && <ProjectDetails />}
      </Suspense>
    </group>
  );
});

export default ProjectsSceneContent;
