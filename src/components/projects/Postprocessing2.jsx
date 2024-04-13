import { useThree } from "@react-three/fiber";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { Suspense } from "react";
import LensFlare from "../../lib/shaders/ultimateLensFlare/ultimateLensFlare";
import { Color } from "three";
import { useAppStore } from "../../lib/store";

export default function Postprocessing2() {
  const projectsSceneActive = useAppStore((state) => state.projectsSceneActive);
  const activeProject = useAppStore((state) => state.activeProject);
  const { size } = useThree();
  const viewport = { width: size.width / 10 };

  const sceneColor = activeProject?.sceneColor
    ? new Color(...activeProject.sceneColor)
    : new Color(42, 108, 101);

  // In case of need to enable for smaller devices
  // const position = {x: viewport.width > 60 ? -15 : 5,
  // y: viewport.width > 60 ? 30 : 25,
  // z: 15}

  if (viewport.width < 76) return;
  return (
    <Suspense>
      <EffectComposer
        enabled={projectsSceneActive}
        multisampling={0}
        renderPriority={1}
        disableNormalPass={true}
        stencilBuffer={false}
        autoClear={false}
      >
        <LensFlare
          position={{
            x: -15,
            y: 30,
            z: 15,
          }}
          starBurst={false}
          secondaryGhosts={false}
          // Only uncomment for Small Devices
          // enabled={viewport.width > 43 ? true : false}
          glareSize={1}
          starPoints={14}
          flareShape={0.1}
          flareSpeed={0}
          colorGain={sceneColor}
          additionalStreaks
        />
        <Vignette offset={0.35} darkness={0.7} />
      </EffectComposer>
    </Suspense>
  );
}
