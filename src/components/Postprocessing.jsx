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
import { Suspense, forwardRef, useEffect, useRef } from "react";

const Sun = forwardRef(function Sun(props, forwardRef) {
  return (
    <mesh ref={forwardRef} position={[11, 16, 11]} scale={[4, 1, 4]}>
      <cylinderGeometry args={[1.1, 1.1, 1.1, 5]} />
      <meshBasicMaterial color={"#fac5f3"} />
    </mesh>
  );
});

export default function Postprocessing({ homeSceneActive }) {
  const sunRef = useRef();
  const { size } = useThree();
  const viewport = { width: size.width / 10 };
  const { gl } = useThree();

  useFrame((state) => {
    state.gl.autoClear = false;
    state.gl.clear();
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
      // Re-setup WebGL state and re-create WebGL resources
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

  if (viewport.width > 76) {
    return (
      <Suspense fallback={null}>
        <Sun ref={sunRef} />
        {sunRef.current && (
          <EffectComposer
            enabled={homeSceneActive}
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
              density={0.97}
              decay={0.93}
              weight={0.8}
              exposure={0.1}
              clampMax={1}
              kernelSize={KernelSize.SMALL}
              blur={true}
            />
            <Vignette offset={0.35} darkness={0.7} />
            <Noise opacity={0.04} premultiply={true} />
          </EffectComposer>
        )}
      </Suspense>
    );
  } else {
    return (
      <Suspense fallback={null}>
        <EffectComposer
          enabled={homeSceneActive}
          multisampling={0}
          renderPriority={1}
          disableNormalPass={true}
          stencilBuffer={false}
          autoClear={false}
        >
          <Bloom mipmapBlur luminanceThreshold={1.2} height={300} />
          <Vignette offset={0.35} darkness={0.7} />
          <Noise opacity={0.04} premultiply={true} />
        </EffectComposer>
      </Suspense>
    );
  }
}
