import { useFrame, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  GodRays,
  SMAA,
} from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import { forwardRef, useEffect, useRef } from "react";

const Sun = forwardRef(function Sun(props, forwardRef) {
  return (
    <mesh ref={forwardRef} position={[11, 16, 11]} scale={[4, 1, 4]}>
      <cylinderGeometry args={[1.1, 1.1, 1.1, 5]} />
      <meshBasicMaterial color={"#f597e8"} />
    </mesh>
  );
});

export default function Postprocessing({ active, progress }) {
  const sunRef = useRef();
  const { gl, camera } = useThree();

  useFrame((state) => {
    // gl.setRenderTarget(renderTargetA);
    // state.gl.autoClear = false;
    state.gl.clear();
    // state.gl.setRenderTarget(renderTargetA);
    // state.gl.render(scene1, camera);
    gl.autoClear = true;
  });

  useEffect(() => {
    const canvas = gl.domElement;
    const handleContextLost = (event) => {
      event.preventDefault();
      console.log("WebGL context lost. Attempting to restore...");
      setTimeout(() => gl.forceContextRestore(), 1);
    };
    const handleContextRestored = () => {
      console.log("WebGL context restored.");
      // Re-setup your WebGL state and re-create your WebGL resources here
    };
    canvas.addEventListener("webglcontextlost", handleContextLost, false);
    canvas.addEventListener(
      "webglcontextrestored",
      handleContextRestored,
      false
    );

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
    };
  }, [gl]);

  // let samples, density, decay, weight, exposure;

  // if (progress <= -2) {
  //   // Keep the current parameter values
  //   samples = 10;
  //   density = 0.97;
  //   decay = 0.93;
  //   weight = 0.8;
  //   exposure = 0.1;
  // } else {
  //   // Gradually reduce the parameter values
  //   const t = (progress + 2) / 4; // Normalize progress to a value between 0 and 1
  //   samples = lerp(10, 0, t);
  //   density = lerp(0.97, 0, t);
  //   decay = lerp(0.93, 0, t);
  //   weight = lerp(0.8, 0, t);
  //   exposure = lerp(0.1, 0, t);
  // }

  return (
    <>
      <Sun ref={sunRef} />
      {sunRef.current && (
        <EffectComposer
          enabled={active}
          multisampling={0}
          renderPriority={1}
          disableNormalPass={true}
          stencilBuffer={false}
          autoClear={false}
        >
          <SMAA />
          <Bloom mipmapBlur luminanceThreshold={1.2} height={300} />
          <GodRays
            sun={sunRef.current}
            blendFunction={BlendFunction.SCREEN}
            samples={10}
            density={0.97} // Gradually reduce density
            decay={0.93} // Gradually reduce decay
            weight={0.8} // Gradually reduce weight
            exposure={0.1} // Gradually reduce exposure
            clampMax={1}
            kernelSize={KernelSize.SMALL}
            blur={true}
          />
          <Vignette offset={0.35} darkness={0.7} />
          <Noise opacity={0.04} premultiply={true} />
        </EffectComposer>
      )}
    </>
  );
}
