import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { LensFlareEffect } from "../shaders/ultimateLensFlare/ultimateLensFlare";
import { Vector3 } from "three";
import { easing } from "maath";
import { useTexture } from "@react-three/drei";
import { Color } from "three";
import { useAppStore } from "../stores/useAppStore";

export function useLensFlare() {
  const lensDirtTexture = useTexture("/textures/lens-Dirt-Texture.webp");

  const { viewport, size, raycaster } = useThree();
  const viewportSize = { width: size.width };

  const lensFlareEffect = useMemo(() => {
    if (!lensDirtTexture || viewportSize.width < 768) return null;
    return new LensFlareEffect({
      position: { x: -15, y: 30, z: 15 },
      startBurst: false,
      secondaryGhosts: false,
      glareSize: 1,
      starPoints: 14,
      flareShape: 0.1,
      flareSpeed: 0,
      colorGain: [42, 108, 101],
      additionalStreams: true,
      lensDirtTexture,
    });
  }, [lensDirtTexture, viewportSize.width]);

  const screenPosition = new Vector3(-15, 30, 15);
  let flarePosition = new Vector3();

  let projectedPosition;

  useFrame(({ scene, camera, delta }) => {
    if (lensFlareEffect) {
      projectedPosition = screenPosition.clone();
      projectedPosition.project(camera);

      flarePosition.set(
        projectedPosition.x,
        projectedPosition.y,
        projectedPosition.z
      );

      if (flarePosition.z > 1) return;

      raycaster.setFromCamera(projectedPosition, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects[0]) {
        if (
          intersects[0].object.userData &&
          intersects[0].object.userData.lensflare === "no-occlusion"
        ) {
          easing.damp(
            lensFlareEffect.uniforms.get("opacity"),
            "value",
            0.0,
            0.07,
            delta
          );
        } else {
          //Check for MeshTransmissionMaterial
          if (intersects[0].object.material.uniforms) {
            if (intersects[0].object.material.uniforms._transmission) {
              if (
                intersects[0].object.material.uniforms._transmission.value > 0.2
              ) {
                easing.damp(
                  lensFlareEffect.uniforms.get("opacity"),
                  "value",
                  0.2,
                  0.07,
                  delta
                );
              }
            }
          } else {
            easing.damp(
              lensFlareEffect.uniforms.get("opacity"),
              "value",
              1.0,
              0.07,
              delta
            );
          }

          //Check for MeshPhysicalMaterial with transmission setting
          if (
            intersects[0].object.material._transmission &&
            intersects[0].object.material._transmission > 0.2
          ) {
            easing.damp(
              lensFlareEffect.uniforms.get("opacity"),
              "value",
              0.2,
              0.07,
              delta
            );
          } else {
            easing.damp(
              lensFlareEffect.uniforms.get("opacity"),
              "value",
              1.0,
              0.07,
              delta
            );
          }

          //Check for OtherMaterials with transparent parameter
          if (intersects[0].object.material.transparent) {
            easing.damp(
              lensFlareEffect.uniforms.get("opacity"),
              "value",
              intersects[0].object.material.opacity,
              0.07,
              delta
            );
          } else {
            easing.damp(
              lensFlareEffect.uniforms.get("opacity"),
              "value",
              1.0,
              0.07,
              delta
            );
          }
        }
      } else {
        easing.damp(
          lensFlareEffect.uniforms.get("opacity"),
          "value",
          0.0,
          0.07,
          delta
        );
      }

      lensFlareEffect.uniforms.get("lensPosition").value.x = flarePosition.x;
      lensFlareEffect.uniforms.get("lensPosition").value.y = flarePosition.y;
    }
  });

  useEffect(() => {
    if (!lensFlareEffect?.uniforms) return;
    lensFlareEffect.uniforms.get("iResolution").value.x = viewport.width;
    lensFlareEffect.uniforms.get("iResolution").value.y = viewport.height;
  }, [viewport, lensFlareEffect?.uniforms]);

  const currentColorRef = useRef(new Color());
  const targetColorRef = useRef(
    new Color(...useAppStore.getState().activeProject.sceneColor)
  );
  const interpolationFactorRef = useRef(0);

  useEffect(
    () =>
      useAppStore.subscribe((state) => {
        targetColorRef.current.set(...state.activeProject.sceneColor); // Update target color
        interpolationFactorRef.current = 0; // Reset interpolation factor
      }),
    []
  );

  useFrame((_, delta) => {
    if (!lensFlareEffect?.uniforms) return;
    const uniforms = lensFlareEffect.uniforms;
    if (uniforms && uniforms.get("colorGain")) {
      const currentColor = currentColorRef.current;
      currentColor.set(uniforms.get("colorGain").value);
      // Increment interpolation factor
      if (interpolationFactorRef.current < 1) {
        interpolationFactorRef.current += delta * 0.5; // Adjust speed of increment
      }

      // Clamp the factor to be between 0 and 1
      const lerpFactor = Math.min(interpolationFactorRef.current, 1);

      // Interpolate between current and target color
      currentColor.lerp(targetColorRef.current, lerpFactor);

      // Set the new interpolated color
      uniforms.get("colorGain").value = currentColor;
    }
  });

  return lensFlareEffect;
}

useTexture.preload("/textures/lens-Dirt-Texture.webp");
