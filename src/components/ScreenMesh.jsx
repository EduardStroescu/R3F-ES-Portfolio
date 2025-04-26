/* eslint-disable react/no-unknown-property */
import { forwardRef, memo } from "react";
import FullscreenTriangle from "../lib/helpers/FullScreenTriangle.js";
import vertexShader from "../lib/shaders/transitionShader/vertexShader.jsx";
import fragmentShader from "../lib/shaders/transitionShader/fragmentShader.jsx";
import { v4 as uuidv4 } from "uuid";
import { useTexture } from "@react-three/drei";

useTexture.preload("/textures/noise-v1.webp");

const ScreenMesh = memo(
  forwardRef(function ScreenMesh(_, ref) {
    const noise = useTexture("/textures/noise-v1.webp");

    return (
      <mesh ref={ref} geometry={FullscreenTriangle} frustumCulled={false}>
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
              value: noise,
            },
            uTime: {
              value: 0.0,
            },
            uProgress: {
              value: location.pathname !== "/projects" ? -2.0 : 2.0,
            },
          }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    );
  })
);

export default ScreenMesh;
