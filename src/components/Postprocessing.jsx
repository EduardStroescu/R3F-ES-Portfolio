import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { memo, useEffect, useMemo, useRef, useState } from "react";
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

const Postprocessing = memo(function Postprocessing({
  homeScene,
  projectsScene,
}) {
  const activeScene = useAppStore((state) => state.activeScene);
  const { size, camera, scene } = useThree();
  const viewport = { width: size.width };
  const [composer, setComposer] = useState(null);
  const [ready, setReady] = useState(false);
  const composerSceneRef = useRef(null);

  const sceneMap = useMemo(
    () => ({
      home: homeScene,
      projects: projectsScene,
    }),
    [homeScene, projectsScene]
  );

  const godRaysEffect = useGodrays();
  const lensFlareEffect = useLensFlare();

  const homePass = useMemo(() => {
    if (!godRaysEffect) return null;
    const noise = new NoiseEffect({
      blendFunction: NOISE_EFFECT_CONFIG.blendFunction,
      premultiply: NOISE_EFFECT_CONFIG.premultiply,
    });
    noise.blendMode.opacity.value = NOISE_EFFECT_CONFIG.opacity;

    const pass = new EffectPass(
      camera,
      new SMAAEffect(),
      new BloomEffect(BLOOM_EFFECT_CONFIG),
      new VignetteEffect(VIGNETTE_EFFECT_CONFIG),
      godRaysEffect,
      noise
    );
    pass.name = "HomePass";
    pass.enabled = false;
    return pass;
  }, [camera, godRaysEffect]);

  const projectsPass = useMemo(() => {
    if (!lensFlareEffect) return null;
    const pass = new EffectPass(
      camera,
      new VignetteEffect(VIGNETTE_EFFECT_CONFIG),
      lensFlareEffect
    );
    pass.name = "ProjectsPass";
    pass.enabled = false;
    return pass;
  }, [camera, lensFlareEffect]);

  // Mark ready after first rAF instead of inside the frame loop
  useEffect(() => {
    let raf = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useFrame((state) => {
    // Gate: skip frame work until ready and composer exists
    if (!ready || !composer) return;

    state.gl.autoClear = false;
    state.gl.clear();
    state.gl.autoClear = true;

    // Update composer scene using memoized map
    const targetScene = sceneMap[activeScene] || scene;
    if (composerSceneRef?.current !== targetScene.uuid) {
      composer.setMainScene(targetScene);
      composerSceneRef.current = targetScene.uuid;
    }
  });

  useEffect(() => {
    if (!composer || !homePass || !projectsPass || !ready) return;
    if (composer.passes.length === 1) {
      composer.addPass(homePass);
      composer.addPass(projectsPass);
    }

    if (activeScene !== "projects") {
      // Disable ProjectsPass and enable HomePass
      projectsPass.enabled = false;
      projectsPass.renderToScreen = false;

      homePass.enabled = true;
      homePass.renderToScreen = true;
    } else if (activeScene !== "home") {
      // Disable HomePass and enable ProjectsPass
      homePass.enabled = false;
      homePass.renderToScreen = false;

      projectsPass.enabled = true;
      projectsPass.renderToScreen = true;
    }
  }, [
    ready,
    composer,
    homeScene,
    homePass,
    projectsPass,
    projectsScene,
    activeScene,
  ]);

  return (
    <EffectComposer
      ref={setComposer}
      enabled={viewport.width >= 768}
      camera={camera}
      multisampling={0}
      renderPriority={1}
      disableNormalPass={true}
      stencilBuffer={false}
      autoClear={false}
    />
  );
});

Postprocessing.propTypes = {
  homeScene: PropTypes.instanceOf(Scene).isRequired,
  projectsScene: PropTypes.instanceOf(Scene).isRequired,
};

export default Postprocessing;
