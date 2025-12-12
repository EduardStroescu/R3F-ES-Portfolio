/* eslint-disable react/no-unknown-property */
import { createPortal } from "@react-three/fiber";

import ScreenMesh from "./ScreenMesh";
import ProjectsScene from "./projects/ProjectsScene";
import useRenderScenePortals from "../lib/hooks/useRenderScenePortals";
import HomeScene from "./home/HomeScene";
import { PostprocessingWrapper } from "./PostprocessingWrapper";

export default function Experience() {
  const { screenMesh, renderTargetC, textRef, homeScene, projectsScene } =
    useRenderScenePortals();

  return (
    <>
      {createPortal(<HomeScene />, homeScene)}
      {createPortal(
        <ProjectsScene renderTargetC={renderTargetC} ref={textRef} />,
        projectsScene
      )}
      <ScreenMesh ref={screenMesh} />
      <PostprocessingWrapper
        homeScene={homeScene}
        projectsScene={projectsScene}
      />
      {/* Only enable in development */}
      {/* <Stats /> */}
    </>
  );
}
