import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { Suspense, useEffect, useRef } from "react";
import LensFlare from "../../lib/shaders/ultimateLensFlare/ultimateLensFlare";
import { useAppStore } from "../../lib/stores/useAppStore";
import { Color } from "three";

export default function Postprocessing2() {
  const projectsSceneActive = useAppStore((state) => state.projectsSceneActive);
  const { size } = useThree();
  const viewport = { width: size.width / 10 };
  const lensFlareRef = useRef(null);

  const currentColorRef = useRef(new Color());
  const targetColorRef = useRef(
    new Color(...useAppStore.getState().activeProject.sceneColor)
  );
  const interpolationFactorRef = useRef(0);

  useEffect(
    () =>
      useAppStore.subscribe((state) => {
        targetColorRef.current.set(...state.activeProject.sceneColor); // Update target color
        interpolationFactorRef.current = 0; // Reset interpolation factor
      }),
    []
  );

  useFrame((_, delta) => {
    const uniforms = lensFlareRef?.current?.passes?.[1]?.effects?.[1]?.uniforms;
    if (uniforms && uniforms.get("colorGain")) {
      const currentColor = currentColorRef.current;
      currentColor.set(uniforms.get("colorGain").value);
      // Increment interpolation factor
      if (interpolationFactorRef.current < 1) {
        interpolationFactorRef.current += delta * 0.8; // Adjust speed of increment
      }

      // Clamp the factor to be between 0 and 1
      const lerpFactor = Math.min(interpolationFactorRef.current, 1);

      // Interpolate between current and target color
      currentColor.lerp(targetColorRef.current, lerpFactor);

      // Set the new interpolated color
      uniforms.get("colorGain").value = currentColor;
    }
  });

  // In case of need to enable for smaller devices
  // const position = {x: viewport.width > 60 ? -15 : 5,
  // y: viewport.width > 60 ? 30 : 25,
  // z: 15}

  if (viewport.width < 76) return;
  return (
    <Suspense>
      <EffectComposer
        ref={lensFlareRef}
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
          colorGain={[42, 108, 101]}
          additionalStreaks
        />
        <Vignette offset={0.35} darkness={0.7} />
      </EffectComposer>
    </Suspense>
  );
}
