/* eslint-disable react/no-unknown-property */
import { createPortal } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";

import Postprocessing2 from "./projects/Postprocessing2.jsx";
import ScreenMesh from "./ScreenMesh.jsx";
import { useLocation } from "react-router-dom";
import ProjectsScene from "./projects/ProjectsScene.jsx";
import useRenderScenePortals from "../lib/hooks/useRenderScenePortals.jsx";
import useSceneTransition from "../lib/hooks/useSceneTransition.jsx";
import HomeScene from "./home/HomeScene.jsx";

export default function Experience() {
  const location = useLocation();
  const {
    screenMesh,
    renderTargetC,
    textRef,
    progress,
    homeScene,
    projectsScene,
  } = useRenderScenePortals(location);
  useSceneTransition(progress, location);

  return (
    <>
      {createPortal(<HomeScene />, homeScene)}
      <ScrollControls
        enabled={location.pathname === "/projects"}
        infinite
        distance={1.2}
        pages={4}
        damping={0.6}
      >
        {createPortal(
          <ProjectsScene renderTargetC={renderTargetC} ref={textRef} />,
          projectsScene
        )}
      </ScrollControls>
      <Postprocessing2 />
      <ScreenMesh ref={screenMesh} />
      {/* Only enable in development */}
      {/* <Stats /> */}
    </>
  );
}
