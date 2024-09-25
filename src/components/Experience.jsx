/* eslint-disable react/no-unknown-property */
import { createPortal } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";

import Postprocessing2 from "./projects/Postprocessing2";
import ScreenMesh from "./ScreenMesh";
import { useLocation } from "react-router-dom";
import ProjectsScene from "./projects/ProjectsScene";
import useRenderScenePortals from "../lib/hooks/useRenderScenePortals";
import HomeScene from "./home/HomeScene";
import { useDirectionalSound } from "../lib/hooks/useDirectionalSound";

export default function Experience() {
  const location = useLocation();
  const { screenMesh, renderTargetC, textRef, homeScene, projectsScene } =
    useRenderScenePortals(location);
  useDirectionalSound();

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
