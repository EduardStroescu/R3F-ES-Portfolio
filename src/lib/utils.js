import { z } from "zod";
import { BlendFunction, KernelSize } from "postprocessing";

export const emailjsConfig = {
  service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

export const contactSchema = z.object({
  user_name: z
    .string({ required_error: "A name is required" })
    .min(2, "The Name is too short"),
  user_email: z
    .string({ required_error: "An E-mail address is required" })
    .email({ message: "Invalid E-mail address" }),
  message: z
    .string({ required_error: "A message is required" })
    .min(10, "The message must be at least 10 characters long"),
});

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

// Postprocessing Home Scene
// <Bloom mipmapBlur luminanceThreshold={1.2} height={300} />
// <Vignette offset={0.35} darkness={0.7} />
// <Noise opacity={0.04} premultiply={true} />
