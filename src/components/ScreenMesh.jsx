/* eslint-disable react/no-unknown-property */
import { forwardRef } from "react";
import FullscreenTriangle from "../lib/helpers/FullScreenTriangle.js";
import vertexShader from "../lib/shaders/transitionShader/vertexShader.jsx";
import fragmentShader from "../lib/shaders/transitionShader/fragmentShader.jsx";
import { v4 as uuidv4 } from "uuid";

const ScreenMesh = forwardRef(function ScreenMesh(props, ref) {
  return (
    <mesh ref={ref} geometry={FullscreenTriangle()} frustumCulled={false}>
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
  );
});

export default ScreenMesh;
