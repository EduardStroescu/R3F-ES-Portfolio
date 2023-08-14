import { a, useSpring } from "@react-spring/web";
import { Html } from "@react-three/drei";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function ContactSection({
  flipped,
  setFlipped,
  playHoverSound,
  playMenuFlipSound,
  isMessageSent,
  setMessageSent,
}) {
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_famm10r",
        "template_4udz55q",
        form.current,
        "B4mo4unxXM1q-7gTM"
      )
      .then(
        (result) => {
          console.log(result.text);
          setMessageSent(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
    form.current.reset();
    setFlipped(false);
    setTimeout(() => {
      setMessageSent(false);
    }, 5000);
  };

  return (
    <Html
      pointerEvents={"none"}
      style={{ pointerEvents: "none" }}
      fullscreen
      as="contactSectionWrapper"
      wrapperClass="z-[-1] overflow-hidden font-[titleFont] m-0 p-0 box-border w-2/4 h-2/4 text-white "
      transform
      scale={0.5}
      position={[3.8, 7, 37]}
      rotation={[0, -0.25, 0]}
    >
      <div style={{ transform: "scale(2.5)" }}>
        <a.div
          className="flex flex-col text-center sm:text-left sm:flex-row mt-10"
          style={{ opacity: opacity.to((o) => 1 - o), transform }}
        >
          <div className="flex flex-col mb-2">
            <h2 className="text-end text-[4rem] mb-[-20px] italic font-bold">
              <span>Say hello</span>
            </h2>
            <div className="flex flex-col justify-end text-end uppercase ">
              <p className="self-end">I look forward </p>
              <p className="self-end">to hearing from you</p>
            </div>
          </div>
          <div className="flex flex-col justify-center pt-3 sm:p-6 ">
            <div className="self-center text-[1.2rem]">
              <p>Send me an E-mail at:</p>
              <a
                href="mailto:eduard.stroescu@gmail.com"
                style={{ pointerEvents: flipped ? "none" : "auto" }}
                className="hover:scale-105 titleColor text-[1.3rem]"
                onPointerEnter={playHoverSound}
              >
                eduard.stroescu@gmail.com
              </a>
              <p>or</p>
              <button
                onClick={() => {
                  setFlipped((state) => !state);
                  playMenuFlipSound();
                }}
                style={{ pointerEvents: flipped ? "none" : "auto" }}
                className="hover:scale-105 titleColor text-[1.3rem]"
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
          <div className="absolute top-[-260px] bottom-0 mx-auto w-full max-w-lg">
            <button
              onClick={() => {
                setFlipped(false);
                playMenuFlipSound();
              }}
              style={{ pointerEvents: !flipped ? "none" : "auto" }}
              className="hover:text-[#f597e8] hoverShadow hover:italic hover:-translate-x-1 mb-4"
            >
              &#10094; Back
            </button>
            <h1 className="titleColor text-4xl font-medium">Contact me</h1>

            <form ref={form} onSubmit={sendEmail} className="mt-4  ">
              <div className="grid gap-6 sm:grid-cols-2 ">
                <div className="relative z-0">
                  <input
                    type="text"
                    name="user_name"
                    required
                    style={{ pointerEvents: !flipped ? "none" : "auto" }}
                    className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-2 text-sm text-white focus:border-[#f597e8] focus:outline-none focus:ring-0 caret-[#f597e8] "
                    placeholder=""
                  />
                  <label className="absolute top-3 -z-10 origin-[0] -translate-y-7 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-7 peer-focus:italic peer-focus:scale-75 peer-focus:text-[#f597e8] peer-focus:dark:text-[#f597e8]">
                    Your name
                  </label>
                </div>
                <div className="relative z-0">
                  <input
                    type="text"
                    name="user_email"
                    required
                    style={{ pointerEvents: !flipped ? "none" : "auto" }}
                    className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-2 text-sm text-white focus:border-[#f597e8] focus:outline-none focus:ring-0 caret-[#f597e8]"
                    placeholder=""
                  />
                  <label className="absolute top-3 -z-10 origin-[0] -translate-y-7 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:italic peer-focus:text-[#f597e8] peer-focus:dark:text-[#f597e8]">
                    Your email
                  </label>
                </div>
                <div className="relative z-0 col-span-2">
                  <textarea
                    name="message"
                    rows="5"
                    required
                    style={{ pointerEvents: !flipped ? "none" : "auto" }}
                    className="peer block w-full appearance-none border-0 border-b border-white bg-transparent py-2.5 px-2 text-sm text-white focus:border-[#f597e8] focus:outline-none focus:ring-0 resize-none caret-[#f597e8]"
                    placeholder=" "
                  ></textarea>
                  <label className="absolute top-3 -z-10 origin-[0] -translate-y-7 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:italic peer-focus:text-[#f597e8] peer-focus:dark:text-[#f597e8]">
                    Your message
                  </label>
                </div>
              </div>
              <button
                type="submit"
                value="Send"
                className="titleColor mt-5 rounded-md bg-white px-10 py-2"
                style={{ pointerEvents: !flipped ? "none" : "auto" }}
              >
                Send Message
              </button>
            </form>
          </div>
        </a.div>
      </div>
    </Html>
  );
}
