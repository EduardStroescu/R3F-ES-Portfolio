/* eslint-disable react/no-unknown-property */
import { createPortal } from "@react-three/fiber";

import Postprocessing from "./Postprocessing";
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
      <Postprocessing homeScene={homeScene} projectsScene={projectsScene} />
      <ScreenMesh ref={screenMesh} />
      {/* Only enable in development */}
      {/* <Stats /> */}
    </>
  );
}
