import { BlendFunction, KernelSize } from "postprocessing";

export const NOISE_EFFECT_CONFIG = {
  // Controls how the noise blends with the scene
  blendFunction: BlendFunction.COLOR_DODGE,
  // Whether to premultiply the noise with alpha
  premultiply: true,
  // Overall strength of the noise effect
  opacity: 0.2,
};

export const BLOOM_EFFECT_CONFIG = {
  // Use mipmap blur for better performance
  mipmapBlur: true,
  // Minimum brightness for bloom effect
  luminanceThreshold: 1.2,
  // Height of the bloom buffer
  height: 300,
};

export const VIGNETTE_EFFECT_CONFIG = {
  // How far from the center the vignette starts
  offset: 0.35,
  // How dark the vignette effect becomes at the edges
  darkness: 0.7,
};

export const GODRAYS_EFFECT_CONFIG = {
  // Controls how the godrays blend with the scene
  blendFunction: BlendFunction.SCREEN,
  // Number of samples along the ray
  samples: 10,
  // Density of the light scattering medium
  density: 0.97,
  // How quickly the light attenuates
  decay: 0.93,
  // Strength of the light rays
  weight: 0.8,
  // Overall brightness of the effect
  exposure: 0.1,
  // Maximum light value
  clampMax: 1,
  // Size of the blur kernel
  kernelSize: KernelSize.SMALL,
  // Whether to apply blur to the rays
  blur: true,
};
