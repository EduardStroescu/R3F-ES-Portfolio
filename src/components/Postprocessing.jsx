import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import {
  memo,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  SMAA_EFFECT_CONFIG,
} from "../lib/utils";
import { useLensFlare } from "../lib/hooks/useLensFlare";
import { useGodrays } from "../lib/hooks/useGodrays";
import PropTypes from "prop-types";
import { Scene } from "three";
import { useShallow } from "zustand/react/shallow";

const Postprocessing = memo(function Postprocessing({
  homeScene,
  projectsScene,
}) {
  const [composer, setComposer] = useState(null);
  const [ready, setReady] = useState(false);

  const { activeScene, viewportWidth } = useAppStore(
    useShallow((state) => ({
      activeScene: state.activeScene,
      viewportWidth: state.viewportWidth,
    }))
  );
  const { camera, scene } = useThree(
    useShallow((state) => ({ camera: state.camera, scene: state.scene }))
  );
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
    const opacityConfig = {
      SMAAEffect: 1,
      GodRaysEffect: 1,
      NoiseEffect: NOISE_EFFECT_CONFIG.opacity,
      BloomEffect: 1,
      VignetteEffect: 1,
    };

    const pass = new EffectPass(
      camera,
      new SMAAEffect(SMAA_EFFECT_CONFIG),
      new BloomEffect(BLOOM_EFFECT_CONFIG),
      new VignetteEffect(VIGNETTE_EFFECT_CONFIG),
      godRaysEffect,
      noise
    );

    pass.renderToScreen = false;
    pass.name = "HomePass";
    pass.setAllEffectsOpacity = (opacity) =>
      pass.effects.forEach((e) => (e.blendMode.opacity.value = opacity));
    pass.resetAllEffectsOpacityToDefault = () =>
      pass.effects.forEach(
        (e) => (e.blendMode.opacity.value = opacityConfig[e.name])
      );
    pass.setAllEffectsOpacity(0);
    pass.enabled = true;
    return pass;
  }, [camera, godRaysEffect]);

  const projectsPass = useMemo(() => {
    if (!lensFlareEffect) return null;
    const opacityConfig = {
      VignetteEffect: 1,
      LensFlareEffect: 1,
    };

    const pass = new EffectPass(
      camera,
      new VignetteEffect(VIGNETTE_EFFECT_CONFIG),
      lensFlareEffect
    );
    pass.name = "ProjectsPass";
    pass.setAllEffectsOpacity = (opacity) =>
      pass.effects.forEach((e) => (e.blendMode.opacity.value = opacity));
    pass.resetAllEffectsOpacityToDefault = () =>
      pass.effects.forEach(
        (e) => (e.blendMode.opacity.value = opacityConfig[e.name])
      );
    pass.setAllEffectsOpacity(0);
    pass.enabled = true;
    return pass;
  }, [camera, lensFlareEffect]);

  // Mark ready after first rAF instead of inside the frame loop
  useEffect(() => {
    let raf = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const hasPrerendered = useRef(false);
  // Pre-render both scenes to avoid stutters during transition
  useLayoutEffect(() => {
    if (hasPrerendered.current || !composer || !ready) return;
    for (const scene of Object.values(sceneMap)) {
      if (scene.uuid === composerSceneRef.current) continue;
      composer.setMainScene(scene);
      composerSceneRef.current = scene.uuid;
      composer.render();
    }
    hasPrerendered.current = true;
  }, [composer, ready, sceneMap]);

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
      projectsPass.setAllEffectsOpacity(0);
      homePass.resetAllEffectsOpacityToDefault();
    } else if (activeScene !== "home") {
      // Disable HomePass and enable ProjectsPass
      homePass.setAllEffectsOpacity(0);
      projectsPass.resetAllEffectsOpacityToDefault();
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
      enabled={viewportWidth >= 768}
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
