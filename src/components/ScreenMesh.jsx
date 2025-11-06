/* eslint-disable react/no-unknown-property */
import { forwardRef, memo, useRef } from "react";
import FullscreenTriangle from "../lib/helpers/FullScreenTriangle.js";
import vertexShader from "../lib/shaders/transitionShader/vertexShader.jsx";
import fragmentShader from "../lib/shaders/transitionShader/fragmentShader.jsx";
import { useTexture } from "@react-three/drei";

useTexture.preload("/textures/noise-v1.webp");

const ScreenMesh = memo(
  forwardRef(function ScreenMesh(_, ref) {
    const noise = useTexture("/textures/noise-v1.webp");
    const uniformsRef = useRef({
      textureA: { value: null },
      textureB: { value: null },
      uNoise: { value: noise },
      uTime: { value: 0.0 },
      uProgress: {
        value: location.pathname !== "/projects" ? -2.0 : 2.0,
      },
    });

    return (
      <mesh ref={ref} geometry={FullscreenTriangle} frustumCulled={false}>
        <shaderMaterial
          uniforms={uniformsRef.current}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    );
  })
);

export default ScreenMesh;
