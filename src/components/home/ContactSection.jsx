import { a, useSpring } from "@react-spring/web";
import { Html } from "@react-three/drei";
import {
  useContactStore,
  useContactStoreActions,
} from "../../lib/stores/useContactStore";
import { useSoundStoreActions } from "../../lib/stores/useSoundStore";
import { HyperlinkIcon } from "../Icons";
import { useResizableHtml } from "../../lib/hooks/useResizableHtml";
import { emailjsConfig } from "../../lib/emailjsConfig";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppStore } from "../../lib/stores/useAppStore";
import { memo } from "react";

const contactSchema = z.object({
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

const ContactSection = memo(function ContactSection() {
  const activeScene = useAppStore((state) => state.activeScene);
  const flipped = useContactStore((state) => state.flipped);

  const { setFlipped, setMessageSent, setMessageReceived } =
    useContactStoreActions();
  const { playHoverSound, playMenuFlipSound } = useSoundStoreActions();

  const { scale, viewportWidth } = useResizableHtml();

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(contactSchema),
    defaultValues: {
      user_name: "",
      user_email: "",
      message: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      const payload = {
        ...emailjsConfig,
        template_params: {
          user_name: formData.user_name,
          user_email: formData.user_email,
          message: formData.message,
        },
      };
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setMessageSent(true);
        setMessageReceived(true);
        setFlipped(false);
        reset();
        setTimeout(() => {
          setMessageSent(false);
        }, 5000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch {
      setMessageSent(true);
      setMessageReceived(false);
      setTimeout(() => {
        setMessageSent(false);
      }, 5000); // Time to autodismiss notifications
    }
  };

  if (activeScene === "projects") return null;

  return (
    <Html
      pointerEvents={"none"}
      style={{
        transform: `scale(${viewportWidth > 1110 ? scale * 1.8 : scale * 1.2})`,
      }}
      as="section"
      wrapperClass="z-40 w-[100vw] text-white font-[serif] pointer-events-none"
      transform
      fullscreen
      scale={0.5}
      position={[
        viewportWidth > 1110 ? -7.3 : -7,
        6,
        viewportWidth > 1110 ? 46.5 : 46.5,
      ]}
      rotation={[0, -Math.PI / 3.95, 0]}
    >
      <a.div
        className="flex w-[90vw] max-w-[520px] flex-col xl:gap-6 text-center xl:text-left xl:flex-row gap-2"
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform,
        }}
      >
        <div className="w-full flex flex-col">
          <h1 className="text-center xl:text-end text-[4rem] mb-[-15px] xl:mb-[-25px] italic font-bold mt-[-20px]">
            <span>Say hello</span>
          </h1>
          <p className="flex flex-col justify-end text-end uppercase">
            <span className="self-center xl:self-end">I look forward </span>
            <span className="self-center xl:self-end mt-[-7px]">
              to hearing from you
            </span>
          </p>
        </div>
        <div className="w-full overflow-hidden flex flex-col justify-center items-center xl:items-start gap-2">
          <div className="flex gap-2 items-center">
            <p className="flex gap-0.5 bg-white border-[1px] rounded-full px-2 text-black pointer-events-auto cursor-default">
              E-mail
              <HyperlinkIcon className="rotate-90 w-[16px] h-[16px] self-center" />
            </p>
            <button
              className="hover:scale-105 bg-white xl:bg-transparent xl:text-white hover:bg-black xl:hover:bg-white border-white border-[1px] rounded-full px-2 text-black transition-all duration-500 ease-in-out hover:text-white xl:hover:text-black"
              onClick={() => {
                setFlipped((prev) => !prev);
                playMenuFlipSound();
              }}
              onPointerEnter={playHoverSound}
              style={{ pointerEvents: flipped ? "none" : "auto" }}
            >
              Contact Form
            </button>
          </div>
          <a
            href={`mailto:${import.meta.env.VITE_OWNER_EMAIL}`}
            style={{ pointerEvents: flipped ? "none" : "auto" }}
            onPointerEnter={playHoverSound}
            className="text-[1.3rem] rounded-full bg-black text-white xl:bg-transparent xl:text-white xl:underline underline-offset-1 decoration-[#f597e8] decoration-1 px-2 xl:px-0"
          >
            {import.meta.env.VITE_OWNER_EMAIL}
          </a>
        </div>
      </a.div>
      <a.div
        className="w-[90vw] max-w-[520px] flex justify-center"
        style={{
          opacity,
          transform,
          rotateX: "180deg",
        }}
      >
        <div className="absolute top-[-250px] sm:top-[-240px] bottom-0 mx-auto w-full max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg">
          <button
            onClick={() => {
              setFlipped(false);
              playMenuFlipSound();
              reset();
            }}
            style={{
              pointerEvents: !flipped ? "none" : "auto",
            }}
            className="font-dosis hover:text-[#f597e8] hover:italic hover:scale-110 mb-4"
            onPointerEnter={playHoverSound}
          >
            &#10094; Back
          </button>
          <h2 className="text-4xl font-medium">Contact me</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 sm:mt-4">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="relative z-5">
                <input
                  {...register("user_name")}
                  type="text"
                  id="user_name"
                  spellCheck="false"
                  style={{ pointerEvents: !flipped ? "none" : "auto" }}
                  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-2 text-sm text-white focus:border-[#f597e8] focus:outline-none focus:ring-0 caret-[#f597e8] selection:bg-pink-500"
                />
                <label
                  htmlFor="user_name"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-7 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-7 peer-focus:italic peer-focus:scale-75 peer-focus:text-[#f597e8]"
                >
                  Your name
                </label>
                {errors.user_name && (
                  <div className="bg-[#220140] rounded text-red-400 text-[0.6rem] text-center py-1 mt-2">
                    {errors.user_name.message}
                  </div>
                )}
              </div>
              <div className="relative z-5">
                <input
                  {...register("user_email")}
                  type="email"
                  id="user_email"
                  spellCheck="false"
                  style={{ pointerEvents: !flipped ? "none" : "auto" }}
                  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-2 text-sm text-white focus:border-[#f597e8] focus:outline-none focus:ring-0 caret-[#f597e8] selection:bg-pink-500"
                />
                <label
                  htmlFor="user_email"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-7 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:italic peer-focus:text-[#f597e8]"
                >
                  Your email
                </label>
                {errors.user_email && (
                  <div className="bg-[#220140] rounded text-red-400 text-[0.6rem] text-center py-1 mt-2">
                    {errors.user_email.message}
                  </div>
                )}
              </div>
              <div className="relative z-5 col-span-2">
                <textarea
                  {...register("message")}
                  id="message"
                  rows="5"
                  spellCheck="false"
                  style={{ pointerEvents: !flipped ? "none" : "auto" }}
                  className="peer block w-full h-[100px] sm:h-auto appearance-none border-0 border-b border-white bg-transparent py-2.5 px-2 text-sm text-white focus:border-[#f597e8] focus:outline-none focus:ring-0 resize-none overflow-y-auto caret-[#f597e8] selection:bg-pink-500"
                />
                <label
                  htmlFor="message"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-7 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:italic peer-focus:text-[#f597e8]"
                >
                  Your message
                </label>
                {errors.message && (
                  <div className="bg-[#220140] rounded w-1/2 text-red-400 text-[0.6rem] text-center py-1 mt-2">
                    {errors.message.message}
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              value="Send"
              aria-label="Send Message"
              disabled={isSubmitting}
              className="mt-5 rounded-full border-[1px] border-white text-sm hover:scale-105 px-4 py-1 transition-all duration-500 ease-in-out"
              style={{ pointerEvents: !flipped ? "none" : "auto" }}
              onPointerEnter={playHoverSound}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </a.div>
    </Html>
  );
});

export default ContactSection;
