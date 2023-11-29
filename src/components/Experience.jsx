import { useRef, Suspense, useMemo, useState, useEffect } from "react";
import { createPortal, useFrame, useThree } from "@react-three/fiber";
import {
  useTexture,
  useGLTF,
  Environment,
  Text,
  MeshWobbleMaterial,
  Stats,
  useTrailTexture,
  useFBO,
  PerspectiveCamera,
  ScrollControls,
} from "@react-three/drei";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

import { useAppContext } from "./AppContextProvider.jsx";
import Camera from "./Camera.jsx";
import Camera2 from "./Camera2.jsx";
import Postprocessing from "./Postprocessing.jsx";
import Postprocessing2 from "./Postprocessing2.jsx";
import Scene2 from "./Scene2.jsx";
import { MeshReflectorMaterial } from "../shaders/waterShader/MeshReflectorMaterial.tsx";
import FullscreenTriangle from "./FullScreenTriangle.jsx";
import vertexShader from "../shaders/transitionShader/vertexShader.jsx";
import fragmentShader from "../shaders/transitionShader/fragmentShader.jsx";
import ContactSection from "./ContactSection.jsx";
import AboutSection from "./AboutSection.jsx";
import titleFont from "../assets/fonts/Dosis.woff";

THREE.ColorManagement.enabled = true;

export default function Experience() {
  const {
    location,
    flipped,
    setFlipped,
    visible,
    setVisible,
    playHoverSound,
    playMenuOpenCloseSound,
    playMenuFlipSound,
    isMessageSent,
    setMessageSent,
    setMessageReceived,
  } = useAppContext();
  const [progress, setProgress] = useState(-2.0);
  const { size } = useThree();
  const viewport = { width: size.width / 10 };

  const { nodes } = useGLTF("./models/model.glb");
  const [bakedTexture, noise] = useTexture([
    "./models/Bake.jpg",
    "./models/gradient-noise.jpg",
  ]);
  bakedTexture.flipY = false;

  const TrailConfig = {
    firstTrail: {
      size: 256,
      radius: 0.07,
      maxAge: 400,
      interpolate: 1,
      smoothing: 0.5,
      minForce: 0.2,
      intensity: 0.1,
      blend: screen,
    },
    secondTrail: {
      size: 256,
      radius: 0.8,
      maxAge: 500,
      interpolate: 1,
      smoothing: 0.5,
      minForce: 0.5,
      intensity: 0.5,
      blend: screen,
    },
  };

  const [texture, onMove] = useTrailTexture(TrailConfig.firstTrail);
  const [texture2, onMove2] = useTrailTexture(TrailConfig.secondTrail);
  const [texture3, onMove3] = useTrailTexture(TrailConfig.secondTrail);

  const [active, setActive] = useState(true);
  const [active2, setActive2] = useState(false);

  useEffect(() => {
    if (progress > -1.5) {
      setActive(false);
    } else {
      setActive(true);
    }
    if (progress > 2) {
      setActive2(true);
    } else {
      setActive2(false);
    }
  }, [progress]);

  const screenCamera = useRef();
  const screenMesh = useRef();
  const textRef = useRef();
  const scene1 = useMemo(() => new THREE.Scene(), []);
  const scene2 = useMemo(() => new THREE.Scene(), []);
  const renderTargetA = useFBO();
  const renderTargetB = useFBO();
  const renderTargetC = useFBO();
  const { gl } = useThree();

  useFrame((state, delta) => {
    const { camera } = state;
    gl.setRenderTarget(renderTargetA);
    gl.render(scene1, camera);

    gl.setRenderTarget(renderTargetB);
    gl.render(scene2, camera);

    gl.setRenderTarget(renderTargetC);
    textRef.current.material.visible = false;
    gl.render(scene2, camera);
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
          <mesh geometry={nodes.baked.geometry}>
            <meshBasicMaterial map={bakedTexture} />
          </mesh>
          <mesh
            visible={active}
            position={[10, -0.52, 15]}
            onPointerMove={onMove}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[300, 200, 50, 50]} />
            <MeshReflectorMaterial
              args={[100, 100, 50, 50]} // PlaneBufferGeometry arguments
              resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality
              key={MeshReflectorMaterial.key}
              mapp={texture}
              distortionMap={texture}
              distortion={0.05}
              amount={0.05}
              depthScale={90}
              mixStrength={0.8} // Strength of the reflections
              rotation={[-Math.PI * 0.5, 0, 0]}
              mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
              minDepthThreshold={0.1}
              maxDepthThreshold={10}
              color="cyan"
              roughness={0}
              metalness={1}
              blur={0} // Blur ground reflections (width, heigt), 0 skips blur
              toneMapped={false}
            />
          </mesh>

          <Text
            visible={location.pathname === "/"}
            onPointerMove={onMove2}
            anchorY="middle"
            anchorX="center"
            font={titleFont}
            characters="Web Developer"
            position={[11, 6, 10]}
            fontSize={viewport.width > 111 ? 3 : 2.1}
            fillOpacity={1.5}
            curveRadius={9}
          >
            <MeshWobbleMaterial
              map={texture2}
              emissive="#faf7fa"
              factor={0.2}
            />
            WEB DEVELOPER
          </Text>
          <Text
            visible={location.pathname === "/"}
            onPointerMove={onMove3}
            anchorY="middle"
            anchorX="center"
            font={titleFont}
            characters="Portfolio"
            position={[11, 3, 11]}
            fontSize={viewport.width > 111 ? 3 : 2.2}
            fillOpacity={1.5}
            curveRadius={9}
          >
            <MeshWobbleMaterial
              map={texture3}
              emissive="#faf7fa"
              factor={0.2}
            />
            PORTFOLIO
          </Text>

          <Environment
            files={"./Environment/surreal_desert.hdr"}
            background={"only"}
          />
          <Environment
            files={"./Environment/evening_road_01_puresky_1k.hdr"}
            background={false}
          />
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
            active={active}
            gl={gl}
            renderTargetA={renderTargetA}
            scene1={scene1}
            renderTargetB={renderTargetB}
            progress={progress}
          />
        </>,
        scene1
      )}
      <ScrollControls
        enabled={location.pathname === "/projects"}
        infinite
        pages={4}
        damping={0.6}
      >
        {createPortal(
          <>
            <Environment
              files={"./Environment/evening_road_01_puresky_1k.hdr"}
              background={false}
            />
            <color attach="background" args={["black"]} />
            <Camera2 position={[5, 0, 26]} />
            <fog attach="fog" args={["#191920", 0, 55]} />
            <Scene2
              active2={active2}
              textRef={textRef}
              titleFont={titleFont}
              renderTargetC={renderTargetC}
            />
          </>,
          scene2
        )}
      </ScrollControls>
      <Postprocessing2
        active2={active2}
        gl={gl}
        renderTarget={renderTargetA}
        renderTargetB={renderTargetB}
        scene2={scene2}
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

useGLTF.preload("./models/model.glb");
