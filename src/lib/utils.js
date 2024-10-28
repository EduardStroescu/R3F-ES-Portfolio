import { z } from "zod";

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

// Postprocessing Home Scene
// <Bloom mipmapBlur luminanceThreshold={1.2} height={300} />
// <Vignette offset={0.35} darkness={0.7} />
// <Noise opacity={0.04} premultiply={true} />
