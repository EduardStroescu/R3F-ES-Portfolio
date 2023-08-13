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
    isMessageSent,
    setMessageSent,
  } = useAppContext();
  const [progress, setProgress] = useState(-2.0);
  const { viewport } = useThree();

  const { nodes } = useGLTF("./models/model.glb");
  const bakedTexture = useTexture("./models/Bake.jpg");
  bakedTexture.flipY = false;

  const TrailConfig = {
    size: 256,
    radius: 0.07,
    maxAge: 400,
    interpolate: 1,
    smoothing: 0.5,
    minForce: 0.2,
    intensity: 0.1,
    blend: screen,
  };

  const TrailConfig2 = {
    size: 256,
    radius: 0.8,
    maxAge: 500,
    interpolate: 1,
    smoothing: 0.5,
    minForce: 0.5,
    intensity: 0.5,
    blend: screen,
  };

  const [texture, onMove] = useTrailTexture(TrailConfig);
  const [texture2, onMove2] = useTrailTexture(TrailConfig2);
  const [texture3, onMove3] = useTrailTexture(TrailConfig2);

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

  // let active = true;
  // if (progress > -1.5) {active = false}
  // // if (progress >= 1) {active = 1}
  // let active2 = false;
  // if (progress > 2) {active2 = true}
  // // if (progress >= 1) {active2 = 0}

  const screenCamera = useRef();
  const screenMesh = useRef();
  const scene1 = useMemo(() => new THREE.Scene(), []);
  const scene2 = useMemo(() => new THREE.Scene(), []);
  const renderTargetA = useFBO();
  const renderTargetB = useFBO();
  const renderTargetC = useFBO();
  const { gl } = useThree();

  const textRef = useRef();

  useFrame((state, delta) => {
    const { scene, camera } = state;
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
    screenMesh.current.material.uniforms.uProgress.value = progress;
    screenMesh.current.material.uniforms.uTime.value += delta;
    gl.setRenderTarget(null);
  });

  useEffect(() => {
    const targetProgress =
      location.pathname === "/R3F-ES-Portofolio/projects" ? 2 : -2;
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

  // const mesh = new Mesh(
  //   new CylinderGeometry(1.1, 1.1, 1.1, 5),
  //   new MeshBasicMaterial({
  //     color: "#e898ad",
  //   })
  // );
  // mesh.position.set(11, 16.5, 11);
  // mesh.scale.set(4, 1, 4);
  // const sunRef = useRef();
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
            <planeGeometry args={[100, 100, 50, 50]} />
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

          <Suspense>
            <Text
              visible={location.pathname === "/R3F-ES-Portofolio/"}
              onPointerMove={onMove2}
              anchorY="middle"
              font={titleFont}
              strokeColor={"#f597e8"}
              characters="Web Developer"
              position={[11, 6, 10]}
              fontSize={viewport.width > 70 ? 2.5 : 2.2}
              fillOpacity={4}
            >
              <MeshWobbleMaterial
                map={texture2}
                emissive="#f597e8"
                factor={0.2}
              />
              WEB DEVELOPER
            </Text>
            <Text
              visible={location.pathname === "/R3F-ES-Portofolio/"}
              onPointerMove={onMove3}
              anchorY="middle"
              font={titleFont}
              strokeColor={"#f597e8"}
              characters="Portofolio"
              position={[11, 3, 10]}
              fontSize={viewport.width > 70 ? 2.5 : 2.2}
              fillOpacity={4}
            >
              <MeshWobbleMaterial
                map={texture3}
                emissive="#f597e8"
                factor={0.2}
              />
              PORTOFOLIO
            </Text>
          </Suspense>

          <Environment
            files={"./Environment/surreal_desert.hdr"}
            background={"only"}
            ground={{
              height: 15,
              radius: 120,
              scale: 1000,
            }}
          />
          <Environment
            files={"./Environment/evening_road_01_puresky_1k.hdr"}
            background={false}
          />
          <ContactSection
            flipped={flipped}
            setFlipped={setFlipped}
            isMessageSent={isMessageSent}
            setMessageSent={setMessageSent}
          />
          <AboutSection visible={visible} setVisible={setVisible} />
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
        enabled={location.pathname === "/R3F-ES-Portofolio/projects"}
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
