/* eslint-disable react/no-unknown-property */
import { useRef, useMemo, useState, useEffect, lazy, Suspense } from "react";
import { createPortal, useFrame, useThree } from "@react-three/fiber";
import {
  useTexture,
  Environment,
  useFBO,
  ScrollControls,
} from "@react-three/drei";
import { v4 as uuidv4 } from "uuid";

import { useAppContext } from "./AppContextProvider.jsx";
import { useSoundContext } from "./SoundContextProvider.jsx";
import Camera from "./Camera.jsx";
import Postprocessing from "./Postprocessing.jsx";
import Postprocessing2 from "./Postprocessing2.jsx";
import FullscreenTriangle from "../helpers/FullScreenTriangle.js";
import vertexShader from "../shaders/transitionShader/vertexShader.jsx";
import fragmentShader from "../shaders/transitionShader/fragmentShader.jsx";
import { WaterComponent } from "./WaterComponent.jsx";
import { HomeTitle } from "./HomeTitle.jsx";
import { HomeModel } from "./HomeModel.jsx";
import { Scene } from "three";

const AboutSection = lazy(() => import("./AboutSection.jsx"));
const ProjectsScene = lazy(() => import("./ProjectsScene.jsx"));
const Camera2 = lazy(() => import("./Camera2.jsx"));
const ContactSection = lazy(() => import("./ContactSection.jsx"));

export default function Experience({ start }) {
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
  const noise = useTexture(
    "https://res.cloudinary.com/dgfe1xsgj/image/upload/f_auto,q_auto/v1/Portfolio/Model/mgc28ibcemeqqoztq6vs"
  );

  const [homeSceneActive, setHomeSceneActive] = useState(true);
  const [projectsSceneActive, setProjectsSceneActive] = useState(false);

  const screenMesh = useRef();
  const textRef = useRef();
  const homeScene = useMemo(() => new Scene(), []);
  const projectsScene = useMemo(() => new Scene(), []);
  const renderTargetA = useFBO();
  const renderTargetB = useFBO();
  const renderTargetC = useFBO();
  const progress = useRef(-2.0);
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
    screenMesh.current.material.uniforms.uProgress.value = progress.current;
    screenMesh.current.material.uniforms.uTime.value += delta;
    gl.setRenderTarget(null);

    // Scene activation logic according to progress
    if (progress.current > -1.5) {
      setHomeSceneActive(false);
    } else {
      setHomeSceneActive(true);
    }
    if (progress.current > 1.5) {
      setProjectsSceneActive(true);
    } else {
      setProjectsSceneActive(false);
    }
  });

  useEffect(() => {
    const targetProgress = location.pathname === "/projects" ? 2 : -2;
    const duration = 1000; // Duration in milliseconds for the progress to change
    const interval = 40; // Interval time in milliseconds for updating the progress

    let currentProgress = progress.current; // Start from the current progress value
    const increment =
      (targetProgress - currentProgress) / (duration / interval);

    const progressInterval = setInterval(() => {
      currentProgress += increment;
      progress.current = currentProgress;

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
          {start && (
            <Suspense fallback={null}>
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
            </Suspense>
          )}
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
            <Suspense fallback={null}>
              <Camera2 position={[5, 0, 26]} />
            </Suspense>
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
        files={
          "https://res.cloudinary.com/dgfe1xsgj/raw/upload/v1/Portfolio/Environment/qldpzf7hd4mid2444htq.hdr"
        }
        background={"only"}
      />
      <Environment
        files={
          "https://res.cloudinary.com/dgfe1xsgj/raw/upload/v1/Portfolio/Environment/o1aavxxiq6alk6xvwdmp.hdr"
        }
        background={false}
      />
    </>
  );
}

function ProjectsSceneEnv() {
  return (
    <>
      <Environment
        files={
          "https://res.cloudinary.com/dgfe1xsgj/raw/upload/v1/Portfolio/Environment/o1aavxxiq6alk6xvwdmp.hdr"
        }
        background={false}
      />
      <color attach="background" args={["black"]} />
      <fog attach="fog" args={["#191920", 0, 55]} />
    </>
  );
}
