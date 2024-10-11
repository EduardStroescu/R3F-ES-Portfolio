import { a, useSpring } from "@react-spring/web";
import { Html } from "@react-three/drei";
import {
  useAboutStore,
  useAboutStoreActions,
} from "../../lib/stores/useAboutStore";
import { useSoundStoreActions } from "../../lib/stores/useSoundStore";
import { useNavigate } from "react-router-dom";
import { useResizableHtml } from "../../lib/hooks/useResizableHtml";

export default function AboutSection() {
  const { scale } = useResizableHtml();
  const visible = useAboutStore((state) => state.visible);
  const { setVisible } = useAboutStoreActions();
  const { playHoverSound, playMenuOpenCloseSound, playTransitionSound } =
    useSoundStoreActions();
  const navigate = useNavigate();

  const { clipPath } = useSpring({
    clipPath: visible
      ? "polygon(0% 0%,100% 0%,100% 40%,0% 40%,0% 40%,100% 40%,100% 75%,0% 75%,0% 75%,100% 75%,100% 100%,0% 100%)"
      : "polygon(0% 0%,100% 0%,100% 0%,0% 0%,0% 60%,100% 61%,100% 61%,0% 60%,0% 100%,100% 100%,100% 100%,0% 100%)",
    config: { mass: 2, tension: 500, friction: 60 },
  });

  const handleNavigate = () => {
    setVisible(false);
    visible && playMenuOpenCloseSound();
    playTransitionSound();
    navigate("/contact");
  };

  return (
    <Html
      pointerEvents={"none"}
      style={{
        pointerEvents: "none",
      }}
      as="aboutSectionWrapper"
      fullscreen
      transform
      scale={0.5}
      position={[11, 5.1, 15]}
      wrapperClass={`text-white will-change-transform ${
        visible ? "backdrop-blur-sm" : "backdrop-blur-none"
      }`}
    >
      <a.div
        style={{
          clipPath,
          pointerEvents: "none",
          transform: `scale(${scale})`,
        }}
        className="z-40 py-2 w-[90vw] max-w-[600px] mx-auto flex flex-col justify-center items-center rounded-xl border border-[#10D9E182] bg-cyan-800/90 text-base"
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
        <h1 className="titleColor font-bold text-4xl pb-4 mt-[-30px]">About</h1>
        <div className="flex flex-col gap-0.5 text-[1.03rem] px-[15px] leading-5 md:leading-normal hyphens-auto indent-5">
          <p>
            I’m Eduard, a Full-Stack developer from Romania, with a focus on
            building dynamic and engaging web experiences. I love working at the
            intersection of design and functionality, where I can create
            seamless user interfaces that feel intuitive and look aesthetic. A
            big part of my process involves continuous research and
            experimentation, which lets me bring fresh ideas and solid results
            to every project I work on.
          </p>
          <p>My tech stack, just to name a few examples, includes:</p>
          <ul className="list-disc px-[50px] text-xs">
            <li>
              <strong className="ml-[-15px]">Front-End:</strong> React, NextJS,
              Expo
            </li>
            <li>
              <strong className="ml-[-15px]">Back-End:</strong> NodeJS, NestJS,
              Express
            </li>
            <li>
              <strong className="ml-[-15px]">Databases:</strong> PostgreSQL,
              MongoDB
            </li>
            <li>
              <strong className="ml-[-15px]">Styling:</strong> TailwindCSS
            </li>
          </ul>
          <p>
            I’m eager to take on new projects, solve problems, and work with
            others to build something meaningful. If you appreciate my work and
            are looking for someone who’s dedicated and adaptable, let us
            discuss how we can work together.
          </p>
          <p className="pb-4 text-center text-lg leading-5 indent-0">
            Let&apos;s{" "}
            <button
              onClick={handleNavigate}
              className="pointer-events-auto titleColor underline underline-offset-2 hover:italic"
              onPointerEnter={playHoverSound}
            >
              connect
            </button>{" "}
            and create something that leaves a lasting impression!
          </p>
        </div>
      </a.div>
    </Html>
  );
}
