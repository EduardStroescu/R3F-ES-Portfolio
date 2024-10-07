import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";
import { useThree } from "@react-three/fiber";
import { GodRaysEffect, BlendFunction, KernelSize } from "postprocessing";

export function useGodrays() {
  const sun = useAppStore((state) => state.sun);
  const { camera } = useThree();
  const { size } = useThree();
  const viewportSize = { width: size.width / 10 };

  const godRaysEffect = useMemo(() => {
    if (!sun || !camera || viewportSize.width < 76) return null;
    return new GodRaysEffect(camera, sun, {
      blendFunction: BlendFunction.SCREEN,
      samples: 10,
      density: 0.97,
      decay: 0.93,
      weight: 0.8,
      exposure: 0.1,
      clampMax: 1,
      kernelSize: KernelSize.SMALL,
      blur: true,
    });
  }, [camera, sun, viewportSize.width]);

  return godRaysEffect;
}