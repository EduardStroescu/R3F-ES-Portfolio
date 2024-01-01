import { useRef, useMemo, useState, useEffect } from "react";
import { createPortal, useFrame, useThree } from "@react-three/fiber";
import {
  useTexture,
  Environment,
  useFBO,
  PerspectiveCamera,
  ScrollControls,
} from "@react-three/drei";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

import { useAppContext } from "./AppContextProvider.jsx";
import { useSoundContext } from "./SoundContextProvider.jsx";
import Camera from "./Camera.jsx";
import Camera2 from "./Camera2.jsx";
import Postprocessing from "./Postprocessing.jsx";
import Postprocessing2 from "./Postprocessing2.jsx";
import ProjectsScene from "./ProjectsScene.jsx";
import FullscreenTriangle from "../helpers/FullScreenTriangle.js";
import vertexShader from "../shaders/transitionShader/vertexShader.jsx";
import fragmentShader from "../shaders/transitionShader/fragmentShader.jsx";
import ContactSection from "./ContactSection.jsx";
import AboutSection from "./AboutSection.jsx";
import { WaterComponent } from "./WaterComponent.jsx";
import { HomeTitle } from "./HomeTitle.jsx";
import { HomeModel } from "./HomeModel.jsx";

THREE.ColorManagement.enabled = true;

export default function Experience() {
  const {
    location,
    flipped,
    setFlipped,
    visible,
    setVisible,
    isMessageSent,
    setMessageSent,
    setMessageReceived,
  } = useAppContext();
  const { playHoverSound, playMenuOpenCloseSound, playMenuFlipSound } =
    useSoundContext();
  const [progress, setProgress] = useState(-2.0);

  const noise = useTexture("./models/gradient-noise.jpg");

  const [homeSceneActive, setHomeSceneActive] = useState(true);
  const [projectsSceneActive, setProjectsSceneActive] = useState(false);

  useEffect(() => {
    if (progress > -1.5) {
      setHomeSceneActive(false);
    } else {
      setHomeSceneActive(true);
    }
    if (progress > 2) {
      setProjectsSceneActive(true);
    } else {
      setProjectsSceneActive(false);
    }
  }, [progress]);

  const screenCamera = useRef();
  const screenMesh = useRef();
  const textRef = useRef();
  const homeScene = useMemo(() => new THREE.Scene(), []);
  const projectsScene = useMemo(() => new THREE.Scene(), []);
  const renderTargetA = useFBO();
  const renderTargetB = useFBO();
  const renderTargetC = useFBO();
  const { gl } = useThree();

  useFrame((state, delta) => {
    const { camera } = state;
    gl.setRenderTarget(renderTargetA);
    gl.render(homeScene, camera);

    gl.setRenderTarget(renderTargetB);
    gl.render(projectsScene, camera);

    gl.setRenderTarget(renderTargetC);
    textRef.current.material.visible = false;
    gl.render(projectsScene, camera);
    textRef.current.material.visible = true;

    screenMesh.current.material.uniforms.textureA.value = renderTargetA.texture;
    screenMesh.current.material.uniforms.textureB.value = renderTargetB.texture;
    screenMesh.current.material.uniforms.uNoise.value = noise;
    screenMesh.current.material.uniforms.uProgress.value = progress;
    screenMesh.current.material.uniforms.uTime.value += delta;
    gl.setRenderTarget(null);
  });

  useEffect(() => {
    const targetProgress = location.pathname === "/projects" ? 2 : -2;
    const duration = 1000; // Duration in milliseconds for the progress to change
    const interval = 40; // Interval time in milliseconds for updating the progress

    let currentProgress = progress; // Start from the current progress value
    const increment =
      (targetProgress - currentProgress) / (duration / interval);

    const progressInterval = setInterval(() => {
      currentProgress += increment;
      setProgress(currentProgress);

      if (
        (increment > 0 && currentProgress >= targetProgress) ||
        (increment < 0 && currentProgress <= targetProgress)
      ) {
        clearInterval(progressInterval);
      }
    }, interval);

    return () => clearInterval(progressInterval);
  }, [location.pathname]);

  return (
    <>
      {createPortal(
        <>
          <Camera position={[5, 0, 26]} />
          <HomeModel />
          <WaterComponent homeSceneActive={homeSceneActive} />
          <HomeTitle location={location} />
          <HomeSceneEnv />
          <AboutSection
            visible={visible}
            location={location}
            setVisible={setVisible}
            playHoverSound={playHoverSound}
            playMenuOpenCloseSound={playMenuOpenCloseSound}
          />
          <ContactSection
            flipped={flipped}
            setFlipped={setFlipped}
            isMessageSent={isMessageSent}
            setMessageSent={setMessageSent}
            setMessageReceived={setMessageReceived}
            playHoverSound={playHoverSound}
            playMenuFlipSound={playMenuFlipSound}
          />
          <Postprocessing
            homeSceneActive={homeSceneActive}
            gl={gl}
            renderTargetA={renderTargetA}
            homeScene={homeScene}
            renderTargetB={renderTargetB}
            progress={progress}
          />
        </>,
        homeScene
      )}
      <ScrollControls
        enabled={location.pathname === "/projects"}
        infinite
        pages={4}
        damping={0.6}
      >
        {createPortal(
          <>
            <ProjectsSceneEnv />
            <Camera2 position={[5, 0, 26]} />
            <ProjectsScene
              projectsSceneActive={projectsSceneActive}
              textRef={textRef}
              renderTargetC={renderTargetC}
            />
          </>,
          projectsScene
        )}
      </ScrollControls>
      <Postprocessing2
        projectsSceneActive={projectsSceneActive}
        gl={gl}
        renderTarget={renderTargetA}
        renderTargetB={renderTargetB}
        projectsScene={projectsScene}
      />
      <PerspectiveCamera
        position={[0, 0, 0]}
        near={0.01}
        far={1}
        ref={screenCamera}
      />
      <mesh
        ref={screenMesh}
        geometry={FullscreenTriangle()}
        frustumCulled={false}
      >
        <shaderMaterial
          key={uuidv4()}
          uniforms={{
            textureA: {
              value: null,
            },
            textureB: {
              value: null,
            },
            uNoise: {
              value: null,
            },
            uTime: {
              value: 0.0,
            },
            uProgress: {
              progress: -2.0,
            },
          }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
      {/* <Stats /> */}
    </>
  );
}

function HomeSceneEnv() {
  return (
    <>
      <Environment
        files={"./Environment/surreal_desert.hdr"}
        background={"only"}
      />
      <Environment
        files={"./Environment/evening_road_01_puresky_1k.hdr"}
        background={false}
      />
    </>
  );
}

function ProjectsSceneEnv() {
  return (
    <>
      <Environment
        files={"./Environment/evening_road_01_puresky_1k.hdr"}
        background={false}
      />
      <color attach="background" args={["black"]} />
      <fog attach="fog" args={["#191920", 0, 55]} />
    </>
  );
}
