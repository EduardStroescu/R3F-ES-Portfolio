/* eslint-disable react/no-unknown-property */
import { createPortal } from "@react-three/fiber";

import Postprocessing2 from "./projects/Postprocessing2";
import ScreenMesh from "./ScreenMesh";
import ProjectsScene from "./projects/ProjectsScene";
import useRenderScenePortals from "../lib/hooks/useRenderScenePortals";
import HomeScene from "./home/HomeScene";
import { useDirectionalSound } from "../lib/hooks/useDirectionalSound";

export default function Experience() {
  const { screenMesh, renderTargetC, textRef, homeScene, projectsScene } =
    useRenderScenePortals();
  useDirectionalSound();

  return (
    <>
      {createPortal(<HomeScene />, homeScene)}
      {createPortal(
        <ProjectsScene renderTargetC={renderTargetC} ref={textRef} />,
        projectsScene
      )}
      <Postprocessing2 homeScene={homeScene} projectsScene={projectsScene} />
      <ScreenMesh ref={screenMesh} />
      {/* Only enable in development */}
      {/* <Stats /> */}
    </>
  );
}
