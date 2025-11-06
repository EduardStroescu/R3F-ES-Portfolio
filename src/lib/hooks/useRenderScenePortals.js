import { useFBO } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Scene } from "three";
import { useAppStore, useAppStoreActions } from "../stores/useAppStore";
import { easings, useSpring } from "@react-spring/three";
import { useLocation } from "react-router-dom";

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
  const { gl } = useThree();

  // Animate the transition between home and projects scenes -2 to 2
  useSpring({
    from: { progress: progress?.current },
    to: { progress: pathname !== "/projects" ? -2.0 : 2.0 },
    config: {
      duration: 1600,
      easing: easings.easeInOut,
      precision: 0.0001,
      clamp: true,
    },
    onChange: (e) => {
      screenMesh.current.material.uniforms.uProgress.value = e.value.progress;
      // Scene activation logic according to progress
      if (e.value.progress < -0.05) {
        setActiveScene("home");
      } else if (e.value.progress > 0.76) {
        setActiveScene("projects");
      } else {
        setActiveScene(null);
      }
    },
  });

  useEffect(() => {
    // Subscribe to changes in the store
    const unsubscribe = useAppStore.subscribe(
      (state) => (activeSceneRef.current = state.activeScene)
    );

    return () => unsubscribe(); // cleanup on unmount
  }, []);

  useFrame((state, delta) => {
    const { camera } = state;
    if (!screenMesh.current) return;

    // Conditionally render scenes to FBOs only when needed
    let renderedA = false;
    let renderedB = false;

    const activeScene = activeSceneRef.current;

    if (activeScene !== "projects") {
      gl.setRenderTarget(renderTargetA);
      gl.render(homeScene, camera);
      renderedA = true;
    }

    if (activeScene !== "home") {
      gl.setRenderTarget(renderTargetB);
      gl.render(projectsScene, camera);
      renderedB = true;

      // Render text isolation pass only when projects is active and text exists
      if (textRef.current) {
        gl.setRenderTarget(renderTargetC);
        textRef.current.material.visible = false;
        gl.render(projectsScene, camera);
        textRef.current.material.visible = true;
      }
    }

    // Update uniforms (using last valid textures)
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
