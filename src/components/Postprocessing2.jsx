import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Vignette, SMAA } from "@react-three/postprocessing";
import { Suspense, useEffect } from "react";
import LensFlare from "../shaders/ultimateLensFlare/ultimateLensFlare";
import { Color } from "three";

export default function Postprocessing2({ active2 }) {
  const { gl, size } = useThree();
  const viewport = { width: size.width / 10 };

  useFrame((state) => {
    state.gl.clear();
    gl.autoClear = true;
  });

  return (
    <Suspense>
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
    </Suspense>
  );
}
