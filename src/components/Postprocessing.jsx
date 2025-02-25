import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useAppStore } from "../lib/stores/useAppStore";
import {
  EffectPass,
  VignetteEffect,
  BloomEffect,
  SMAAEffect,
  NoiseEffect,
} from "postprocessing";
import {
  NOISE_EFFECT_CONFIG,
  BLOOM_EFFECT_CONFIG,
  VIGNETTE_EFFECT_CONFIG,
} from "../lib/utils";
import { useLensFlare } from "../lib/hooks/useLensFlare";
import { useGodrays } from "../lib/hooks/useGodrays";
import PropTypes from "prop-types";
import { Scene } from "three";

export default function Postprocessing({ homeScene, projectsScene }) {
  const activeScene = useAppStore((state) => state.activeScene);
  const { size, camera, scene } = useThree();
  const viewport = { width: size.width / 10 };
  const [composer, setComposer] = useState(null);

  const godRaysEffect = useGodrays();
  const lensFlareEffect = useLensFlare();

  const homePass = useMemo(() => {
    if (!godRaysEffect) return null;
    const noise = new NoiseEffect({
      blendFunction: NOISE_EFFECT_CONFIG.blendFunction,
      premultiply: NOISE_EFFECT_CONFIG.premultiply,
    });
    noise.blendMode.opacity.value = NOISE_EFFECT_CONFIG.opacity;

    return new EffectPass(
      camera,
      new SMAAEffect(),
      new BloomEffect(BLOOM_EFFECT_CONFIG),
      new VignetteEffect(VIGNETTE_EFFECT_CONFIG),
      godRaysEffect,
      noise
    );
  }, [camera, godRaysEffect]);

  const projectsPass = useMemo(() => {
    if (!lensFlareEffect) return null;
    return new EffectPass(
      camera,
      new VignetteEffect(VIGNETTE_EFFECT_CONFIG),
      lensFlareEffect
    );
  }, [camera, lensFlareEffect]);

  const sceneMap = useMemo(
    () => ({
      home: homeScene,
      projects: projectsScene,
    }),
    [homeScene, projectsScene]
  );

  useEffect(() => {
    if (!composer) return;
    const timer = setTimeout(() => {
      if (composer.passes.length > 1) {
        composer.removePass(composer.passes[1]);
      }

      if (homePass && activeScene !== "projects") {
        composer.addPass(homePass);
      } else if (projectsPass && activeScene !== "home") {
        composer.addPass(projectsPass);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [composer, homeScene, homePass, projectsPass, projectsScene, activeScene]);

  useFrame((state) => {
    if (!composer) return;

    state.gl.autoClear = false;
    state.gl.clear();
    state.gl.autoClear = true;

    // Update composer scene using memoized map
    const targetScene = sceneMap[activeScene] || scene;
    if (composer.scene !== targetScene) {
      composer.setMainScene(targetScene);
    }
  });

  if (viewport.width < 76) return null;

  return (
    <Suspense fallback={null}>
      <EffectComposer
        ref={setComposer}
        camera={camera}
        multisampling={0}
        renderPriority={1}
        disableNormalPass={true}
        stencilBuffer={false}
        autoClear={false}
      />
    </Suspense>
  );
}

Postprocessing.propTypes = {
  homeScene: PropTypes.instanceOf(Scene).isRequired,
  projectsScene: PropTypes.instanceOf(Scene).isRequired,
};
