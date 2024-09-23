import { a, useSpring } from "@react-spring/web";
import { Html } from "@react-three/drei";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useContactStore, useContactStoreActions } from "../../lib/store";
import { useSoundContext } from "../../lib/providers/SoundContextProvider";

export default function ContactSection() {
  const flipped = useContactStore((state) => state.flipped);
  const { setFlipped, setMessageSent, setMessageReceived } =
    useContactStoreActions();
  const { playHoverSound, playMenuFlipSound } = useSoundContext();

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const form = useRef();

  const formik = useFormik({
    initialValues: {
      user_name: "",
      user_email: "",
      message: "",
    },
    validationSchema: Yup.object({
      user_name: Yup.string().required("* Name field is required"),
      user_email: Yup.string()
        .email("Invalid email address")
        .required("* Email field is required")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "* Please enter a valid email address"
        ),
      message: Yup.string().required("* Message field is required"),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      try {
        emailjs
          .send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            values,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
          )
          .then(() => {
            setSubmitting(false);
            setMessageSent(true);
            setMessageReceived(true);
            setFlipped(false);
            resetForm();
            setTimeout(() => {
              setMessageSent(false);
            }, 5000);
          });
      } catch {
        setSubmitting(false);
        setMessageSent(true);
        setMessageReceived(false);
        setTimeout(() => {
          setMessageSent(false);
        }, 5000);
      }
    },
  });

  return (
    <Html
      pointerEvents={"none"}
      style={{ pointerEvents: "none" }}
      as="contactSectionWrapper"
      wrapperClass="z-40 overflow-hidden font-[titleFont] w-2/4 h-2/4 text-white "
      transform
      scale={0.5}
      position={[-7.3, 7, 46.8]}
      rotation={[0, -0.78, 0]}
    >
      <div style={{ transform: "scale(3)" }} className="z-40">
        <a.div
          className="flex flex-col lg:gap-6 text-center lg:text-left lg:flex-row mt-10"
          style={{ opacity: opacity.to((o) => 1 - o), transform }}
        >
          <div className="flex flex-col mb-2">
            <h2 className="text-center lg:text-end text-[4rem] mb-0 lg:mb-[-20px] italic font-bold">
              <span>Say hello</span>
            </h2>
            <div className="flex flex-col justify-end text-end uppercase ">
              <p className="self-center lg:self-end">I look forward </p>
              <p className="self-center lg:self-end">to hearing from you</p>
            </div>
          </div>
          <div className="flex flex-col justify-center ">
            <div className="self-center">
              <p className="text-[1.2rem]">Send me an E-mail at:</p>
              <a
                href="mailto:eduard.stroescu@gmail.com"
                style={{ pointerEvents: flipped ? "none" : "auto" }}
                onPointerEnter={playHoverSound}
                className="hover:scale-105 titleColor text-[1.3rem] bg-[#220140] rounded-md px-2 py-1"
              >
                eduard.stroescu@gmail.com
              </a>
              <p className="text-[1.2rem] px-2">or</p>
              <button
                onClick={() => {
                  setFlipped((prev) => !prev);
                  playMenuFlipSound();
                }}
                style={{ pointerEvents: flipped ? "none" : "auto" }}
                className="hover:scale-105 titleColor text-[1.3rem] bg-[#220140] rounded-md px-2"
                onPointerEnter={playHoverSound}
              >
                Send me a message here
              </button>
            </div>
          </div>
        </a.div>
        <a.div
          className="flex justify-center align-center"
          style={{
            opacity,
            transform,
            rotateX: "180deg",
          }}
        >
          <div className="absolute top-[-310px] sm:top-[-260px] bottom-0 mx-auto w-full max-w-sm md:max-w-md lg:max-w-lg">
            <button
              onClick={() => {
                setFlipped(false);
                playMenuFlipSound();
              }}
              style={{ pointerEvents: !flipped ? "none" : "auto" }}
              className="hover:text-[#f597e8] hoverShadow hover:italic hover:scale-110 mb-4"
              onPointerEnter={playHoverSound}
            >
              &#10094; Back
            </button>
            <h1 className="titleColor text-4xl font-medium">Contact me</h1>

            <form
              ref={form}
              onSubmit={formik.handleSubmit}
              className="mt-6 sm:mt-4"
            >
              <div className="grid gap-6 sm:grid-cols-2 ">
                <div className="relative z-5">
                  <input
                    type="text"
                    name="user_name"
                    id="user_name"
                    onChange={formik.handleChange}
                    value={formik.values.user_name}
                    style={{ pointerEvents: !flipped ? "none" : "auto" }}
                    className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-2 text-sm text-white focus:border-[#f597e8] focus:outline-none focus:ring-0 caret-[#f597e8] "
                    placeholder=""
                  />
                  <label
                    htmlFor="user_name"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-7 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-7 peer-focus:italic peer-focus:scale-75 peer-focus:text-[#f597e8] peer-focus:dark:text-[#f597e8]"
                  >
                    Your name
                  </label>
                  {formik.touched.user_name && formik.errors.user_name && (
                    <div className="bg-[#220140] rounded text-red-400 text-[0.6rem] text-center py-1 mt-2">
                      {formik.errors.user_name}
                    </div>
                  )}
                </div>
                <div className="relative z-5">
                  <input
                    type="email"
                    name="user_email"
                    id="user_email"
                    onChange={formik.handleChange}
                    value={formik.values.user_email}
                    style={{ pointerEvents: !flipped ? "none" : "auto" }}
                    className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-2 text-sm text-white focus:border-[#f597e8] focus:outline-none focus:ring-0 caret-[#f597e8]"
                    placeholder=""
                  />
                  <label
                    htmlFor="user_email"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-7 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:italic peer-focus:text-[#f597e8] peer-focus:dark:text-[#f597e8]"
                  >
                    Your email
                  </label>
                  {formik.touched.user_email && formik.errors.user_email && (
                    <div className="bg-[#220140] rounded text-red-400 text-[0.6rem] text-center py-1 mt-2">
                      {formik.errors.user_email}
                    </div>
                  )}
                </div>
                <div className="relative z-5 col-span-2">
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    onChange={formik.handleChange}
                    value={formik.values.message}
                    style={{ pointerEvents: !flipped ? "none" : "auto" }}
                    className="peer block w-full h-[100px] sm:h-auto appearance-none border-0 border-b border-white bg-transparent py-2.5 px-2 text-sm text-white focus:border-[#f597e8] focus:outline-none focus:ring-0 resize-none overflow-y-auto caret-[#f597e8]"
                    placeholder=" "
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-7 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:italic peer-focus:text-[#f597e8] peer-focus:dark:text-[#f597e8]"
                  >
                    Your message
                  </label>
                  {formik.touched.message && formik.errors.message && (
                    <div className="bg-[#220140] rounded w-1/2 text-red-400 text-[0.6rem] text-center py-1 mt-2">
                      {formik.errors.message}
                    </div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                value="Send"
                aria-label="Send Message"
                disabled={formik.isSubmitting}
                className="titleColor  mt-5 rounded-md bg-[#220140] hover:scale-105 hover:bg-[#410578] px-10 py-2"
                style={{ pointerEvents: !flipped ? "none" : "auto" }}
                onPointerEnter={playHoverSound}
              >
                {formik.isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </a.div>
      </div>
    </Html>
  );
}
