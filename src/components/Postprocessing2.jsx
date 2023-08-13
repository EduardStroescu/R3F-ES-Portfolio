import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Vignette, SMAA } from "@react-three/postprocessing";
import { useEffect } from "react";
import LensFlare from "../shaders/ultimateLensFlare/ultimateLensFlare";
import { Color } from "three";

export default function Postprocessing({ active2 }) {
  const { gl, camera, viewport } = useThree();

  useFrame((state) => {
    // gl.setRenderTarget(renderTargetA);
    // state.gl.autoClear = false;
    state.gl.clear();
    // state.gl.setRenderTarget(renderTargetB);
    // state.gl.render(scene2, camera);
    gl.autoClear = true;
  });

  // if (!active) {
  //   return null; // Return null if the effect is inactive
  // }

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

  return (
    <>
      <EffectComposer
        enabled={active2}
        multisampling={0}
        renderPriority={1}
        disableNormalPass
        stencilBuffer={false}
        autoClear={false}
      >
        <SMAA />
        <LensFlare
          position={{
            x: viewport.width > 30 ? -15 : 5,
            y: viewport.width > 30 ? 30 : 25,
            z: 15,
          }}
          starBurst={false}
          secondaryGhosts={false}
          enabled
          glareSize={1}
          starPoints={14}
          flareShape={0.1}
          flareSpeed={0}
          colorGain={new Color(42, 108, 101)}
          additionalStreaks
        />
        <Vignette offset={0.35} darkness={0.7} />
      </EffectComposer>
    </>
  );
}
