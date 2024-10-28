import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useAppStore } from "../../lib/stores/useAppStore";
import {
  EffectPass,
  VignetteEffect,
  BlendFunction,
  BloomEffect,
  SMAAEffect,
  NoiseEffect,
} from "postprocessing";
import { useLensFlare } from "../../lib/hooks/useLensFlare";
import { useGodrays } from "../../lib/hooks/useGodrays";
import PropTypes from "prop-types";
import { Scene } from "three";

export default function Postprocessing({ homeScene, projectsScene }) {
  const activeScene = useAppStore((state) => state.activeScene);

  const { size, camera, scene } = useThree();
  const viewport = { width: size.width / 10 };
  const [composer, setComposer] = useState(null);

  useFrame((state) => {
    state.gl.autoClear = false;
    state.gl.clear();
    state.gl.autoClear = true;
  });

  const godRaysEffect = useGodrays();
  const lensFlareEffect = useLensFlare();

  const homePass = useMemo(() => {
    if (!godRaysEffect) return null;
    const noise = new NoiseEffect({
      blendFunction: BlendFunction.COLOR_DODGE,
      premultiply: true,
    });
    noise.blendMode.opacity.value = 0.2;
    return new EffectPass(
      camera,
      new SMAAEffect(),
      new BloomEffect({
        mipmapBlur: true,
        luminanceThreshold: 1.2,
        height: 300,
      }),
      new VignetteEffect({
        offset: 0.35,
        darkness: 0.7,
      }),
      godRaysEffect,
      noise
    );
  }, [camera, godRaysEffect]);

  const projectsPass = useMemo(() => {
    if (!lensFlareEffect) return null;
    return new EffectPass(
      camera,
      new VignetteEffect({
        offset: 0.35,
        darkness: 0.7,
      }),
      lensFlareEffect
    );
  }, [camera, lensFlareEffect]);

  useEffect(() => {
    if (!composer) return;
    if (homePass && activeScene !== "projects") {
      if (composer.passes.length > 1) {
        composer.removePass(composer.passes[1]);
      }
      composer.addPass(homePass);
    } else if (projectsPass && activeScene !== "home") {
      if (composer.passes.length > 1) {
        composer.removePass(composer.passes[1]);
      }
      composer.addPass(projectsPass);
    }
  }, [composer, homeScene, homePass, projectsPass, projectsScene, activeScene]);

  useFrame(() => {
    if (!composer) return;
    if (activeScene === "home") {
      if (composer.scene !== homeScene) {
        composer.setMainScene(homeScene);
      }
    } else if (activeScene === "projects") {
      if (composer.scene !== projectsScene) {
        composer.setMainScene(projectsScene);
      }
    } else {
      if (composer.scene !== scene) {
        composer.setMainScene(scene);
      }
    }
  });

  if (viewport.width < 76) return;
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
