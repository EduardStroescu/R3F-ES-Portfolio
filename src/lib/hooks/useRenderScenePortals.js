import { useFBO } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Scene } from "three";
import { useAppStore, useAppStoreActions } from "../stores/useAppStore";
import { useLocation } from "react-router-dom";
import { easing } from "maath";

export default function useRenderScenePortals() {
  const { pathname } = useLocation();
  const { setActiveScene } = useAppStoreActions();

  const screenMesh = useRef(null);
  const textRef = useRef(null);
  const homeScene = useMemo(() => new Scene(), []);
  const projectsScene = useMemo(() => new Scene(), []);
  const renderTargetA = useFBO();
  const renderTargetB = useFBO();
  const renderTargetC = useFBO();
  const progress = useRef(pathname !== "/projects" ? -2.0 : 2.0);
  const activeSceneRef = useRef(useAppStore.getState().activeScene);

  useFrame((state, delta) => {
    if (!screenMesh.current) return;

    const { camera, gl } = state;

    easing.damp(
      progress,
      "current",
      pathname !== "/projects" ? -2.0 : 2.0,
      1.1,
      delta,
      Infinity,
      easing.exp,
      0.0001
    );

    // Update shader uniform
    screenMesh.current.material.uniforms.uProgress.value = progress.current;

    // Scene activation logic according to progress
    const activeScene = activeSceneRef.current;
    if (progress.current < -0.05 && activeScene !== "home") {
      setActiveScene("home");
      activeSceneRef.current = "home";
    } else if (progress.current > 0.76 && activeScene !== "projects") {
      setActiveScene("projects");
      activeSceneRef.current = "projects";
    } else if (
      progress.current > -0.05 &&
      progress.current < 0.76 &&
      activeScene !== null
    ) {
      setActiveScene(null);
      activeSceneRef.current = null;
    }

    // Conditionally render scenes to FBOs only when needed
    let renderedA = false;
    let renderedB = false;

    if (activeScene !== "projects") {
      gl.setRenderTarget(renderTargetA);
      gl.render(homeScene, camera);
      renderedA = true;
    }

    if (activeScene !== "home") {
      gl.setRenderTarget(renderTargetB);
      gl.render(projectsScene, camera);
      renderedB = true;

      if (textRef.current) {
        gl.setRenderTarget(renderTargetC);
        textRef.current.material.visible = false;
        gl.render(projectsScene, camera);
        textRef.current.material.visible = true;
      }
    }

    if (renderedA) {
      screenMesh.current.material.uniforms.textureA.value =
        renderTargetA.texture;
    }
    if (renderedB) {
      screenMesh.current.material.uniforms.textureB.value =
        renderTargetB.texture;
    }

    screenMesh.current.material.uniforms.uTime.value += delta;
    gl.setRenderTarget(null);
  });

  return {
    screenMesh,
    renderTargetC,
    textRef,
    homeScene,
    projectsScene,
  };
}
