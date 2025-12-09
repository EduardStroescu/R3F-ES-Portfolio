import { a, useSpring } from "@react-spring/web";
import { Html } from "@react-three/drei";
import {
  useAboutStore,
  useAboutStoreActions,
} from "../../lib/stores/useAboutStore";
import { useSoundStoreActions } from "../../lib/stores/useSoundStore";
import { useNavigate } from "react-router-dom";
import { useResizableHtml } from "../../lib/hooks/useResizableHtml";
import { useAppStore } from "../../lib/stores/useAppStore";
import { memo } from "react";

const AboutSection = memo(function AboutSection() {
  const { scale: htmlScale } = useResizableHtml();
  const activeScene = useAppStore((state) => state.activeScene);
  const visible = useAboutStore((state) => state.visible);
  const { setVisible } = useAboutStoreActions();
  const { playHoverSound, playMenuOpenCloseSound, playTransitionSound } =
    useSoundStoreActions();
  const navigate = useNavigate();

  const { clipPath, scale } = useSpring({
    clipPath: visible ? "circle(100% at 50% 50%)" : "circle(0.0% at 50% 50%)",
    scale: visible ? htmlScale : htmlScale + 0.2,
    config: {
      mass: 2,
      tension: visible ? 400 : 450,
      friction: 60,
      clamp: true,
      precision: 0.0001,
    },
  });

  const handleNavigate = () => {
    setVisible(false);
    visible && playMenuOpenCloseSound();
    playTransitionSound();
    navigate("/contact");
  };

  if (activeScene === "projects") return null;

  return (
    <Html
      pointerEvents={"none"}
      style={{
        pointerEvents: "none",
      }}
      as="section"
      fullscreen
      transform
      scale={0.5}
      position={[11, 5.1, 15]}
      wrapperClass={`text-white ${
        visible ? "backdrop-blur-sm" : "backdrop-blur-none"
      }`}
    >
      <a.div
        style={{
          clipPath,
          scale,
        }}
        className="z-40 py-2 w-[90vw] max-w-[600px] mx-auto flex flex-col justify-center items-center rounded-xl border border-[#10D9E182] bg-cyan-800/90 text-base pointer-events-none"
      >
        <button
          style={{ pointerEvents: visible ? "auto" : "none" }}
          className="hover:text-[#f597e8] hover:italic hover:hover:scale-110 flex flex-row self-start pl-4 pt-4"
          onClick={() => {
            setVisible(false);
            playMenuOpenCloseSound();
          }}
          onPointerEnter={playHoverSound}
        >
          &#10094; Close
        </button>
        <h1 className="title-effect font-bold text-4xl pb-4 mt-[-30px]">
          About
        </h1>
        <section className="flex flex-col gap-0.5 text-[1.03rem] px-[15px] leading-5 md:leading-normal hyphens-auto indent-5">
          <p>
            I’m Eduard, a Full-Stack developer from Romania, with a focus on
            building dynamic and engaging web experiences. I love working at the
            intersection of design and functionality, where I can create
            seamless user interfaces that feel intuitive and look aesthetic. A
            big part of my process involves continuous research and
            experimentation, which lets me bring fresh ideas and solid results
            to every project I work on.
          </p>
          <section className="border-white border-[1px] flex items-center bg-black rounded overflow-clip w-fit self-center my-1 py-2">
            <p
              style={{
                writingMode: "vertical-rl",
              }}
              className="font-[serif] rotate-180 leading-0 indent-0 border-white py-2 border-l-[1px] w-fit bg-black"
            >
              Tech Stack
            </p>
            <ul className="text-xs indent-0 leading-normal px-4">
              <li>
                <strong className="font-bold">Front-End:</strong> React, NextJS,
                Expo, ThreeJS
              </li>
              <li>
                <strong className="font-bold">Back-End:</strong> NodeJS, NestJS,
                Express
              </li>
              <li>
                <strong className="font-bold">Databases:</strong> PostgreSQL,
                MongoDB
              </li>
              <li>
                <strong className="font-bold">Styling:</strong> TailwindCSS
              </li>
              <li>
                <strong className="font-bold">Other:</strong> Git, Docker, GH
                Actions
              </li>
            </ul>
          </section>
          <p>
            I’m eager to take on new projects, solve problems, and work with
            others to build something meaningful. If you appreciate my work and
            are looking for someone who’s dedicated and adaptable, let’s discuss
            how we can work together.
          </p>
          <p className="pb-4 text-center text-lg leading-5 indent-0">
            Let&apos;s{" "}
            <button
              onClick={handleNavigate}
              className="pointer-events-auto title-effect underline underline-offset-2 hover:italic"
              onPointerEnter={playHoverSound}
              aria-label="Go to Contact Section"
            >
              connect
            </button>{" "}
            and create something that leaves a lasting impression!
          </p>
        </section>
      </a.div>
    </Html>
  );
});

export default AboutSection;
