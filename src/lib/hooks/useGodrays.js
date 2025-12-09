import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";
import { useThree } from "@react-three/fiber";
import { GodRaysEffect } from "postprocessing";
import { GODRAYS_EFFECT_CONFIG } from "../utils";

export function useGodrays() {
  const sun = useAppStore((state) => state.sun);
  const camera = useThree((state) => state.camera);

  const godRaysEffect = useMemo(() => {
    if (!sun || !camera) return null;
    return new GodRaysEffect(camera, sun, GODRAYS_EFFECT_CONFIG);
  }, [camera, sun]);

  return godRaysEffect;
}
