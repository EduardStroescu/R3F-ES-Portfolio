import { a, useSpring } from "@react-spring/web";
import { Html } from "@react-three/drei";
import {
  useAboutStore,
  useAboutStoreActions,
} from "../../lib/stores/useAboutStore";
import { useSoundStoreActions } from "../../lib/stores/useSoundStore";
import { useNavigate } from "react-router-dom";
import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";

export default function AboutSection() {
  const { size } = useThree();
  const [scale, setScale] = useState(1);
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

  useEffect(() => {
    // Set scale based on height: larger height results in a smaller scale
    const heightFactor = 1 / (size.height / 1500);

    // Ensure the scale doesn't go below or above certain thresholds
    const newScale = Math.max(1.8, Math.min(5, heightFactor));
    setScale(newScale);
  }, [size.height]);

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
        <div className="flex flex-col text-[1.03rem] leading-tight md:leading-normal hyphens-auto">
          <p className="px-[15px] text-justify indent-5">
            I’m Eduard, a Full-Stack developer from Romania with a focus on
            building dynamic and engaging web experiences. I love working at the
            intersection of design and functionality, where I can create
            seamless user interfaces that feel intuitive and look aesthetic.
          </p>
          <p className="px-[15px] text-justify indent-5">
            I’m always researching and experimenting, aiming to keep up with the
            latest in tech to make sure I’m staying sharp. This process is
            important to me because it lets me bring fresh ideas and solid
            results to every project I work on.
          </p>
          <p className="px-[15px] text-justify indent-5">
            I’m eager to take on new projects, solve problems, and work with
            others to build something meaningful. If you’re looking for someone
            who’s dedicated and adaptable, check out my work.
          </p>
          <p className="pb-4 px-[15px] text-center">
            Let&apos;s{" "}
            <button
              onClick={handleNavigate}
              className="pointer-events-auto titleColor underline underline-offset-2 hover:italic"
              onPointerEnter={playHoverSound}
            >
              connect
            </button>{" "}
            and craft something that leaves a lasting impact!
          </p>
        </div>
      </a.div>
    </Html>
  );
}
