import { a, useSpring } from "@react-spring/web";
import { Html } from "@react-three/drei";
import { useAboutStore, useAboutStoreActions } from "../../lib/store";
import { useLocation } from "react-router-dom";
import { useSoundContext } from "../../lib/providers/SoundContextProvider";

export default function AboutSection() {
  const location = useLocation();
  const visible = useAboutStore((state) => state.visible);
  const { setVisible } = useAboutStoreActions();
  const { playHoverSound, playMenuOpenCloseSound } = useSoundContext();

  const { clipPath } = useSpring({
    clipPath: visible
      ? "polygon(0% 0%,100% 0%,100% 40%,0% 40%,0% 40%,100% 40%,100% 75%,0% 75%,0% 75%,100% 75%,100% 100%,0% 100%)"
      : "polygon(0% 0%,100% 0%,100% 0%,0% 0%,0% 60%,100% 61%,100% 61%,0% 60%,0% 100%,100% 100%,100% 100%,0% 100%)",
    config: { mass: 2, tension: 500, friction: 60 },
    delay: location.state.data === "/projects" ? 1000 : 0,
  });

  return (
    <Html
      pointerEvents={"none"}
      style={{ pointerEvents: "none" }}
      as="aboutSectionWrapper"
      fullscreen
      transform
      scale={0.5}
      position={[11, 5.1, 15]}
      wrapperClass="text-white z-40"
    >
      <a.div
        style={{ clipPath, pointerEvents: "none", transform: "scale(2)" }}
        className="shadow MainFont z-40 mx-[-5px] sm:mx-[150px] md:mx-[150px] lg:mx-[25%] 2xl:mx-[35%] flex flex-col justify-center items-center gap-4 rounded-xl border border-[#10D9E182] bg-gradient-to-t from-[#11e8bb]/[0.95] to-[#8200c9]/[0.95]"
      >
        <button
          style={{ pointerEvents: visible ? "auto" : "none" }}
          className="hover:text-[#f597e8] hover:italic hoverShadow hover:hover:scale-110 flex flex-row self-start pl-4 pt-4"
          onClick={() => {
            setVisible(false);
            playMenuOpenCloseSound();
          }}
          onPointerEnter={playHoverSound}
        >
          &#10094; Close
        </button>
        <h1 className="font-bold titleColor text-4xl pb-4 mt-[-30px]">About</h1>
        <p className="py-0 px-[15px] text-justify indent-5">
          I&apos;m Eduard, a Front-End developer specializing in web-based
          technologies and frameworks. In my pursuit of excellence, I am driven
          by a profound passion for both creativity and functionality. I believe
          that design and user experience are two sides of the same coin, and my
          goal is to seamlessly blend them to create interfaces that leave a
          lasting impact on users.
        </p>
        <p className="px-[15px] text-justify indent-5">
          My dedication to self-improvement serves as the backbone of my career.
          Staying ahead in the fast-paced world of technology is my aim, and I
          am relentless in my pursuit of mastering the latest trends and
          techniques. This unyielding commitment ensures that my skills are
          always finely honed, enabling me to deliver top-notch results with
          every project.
        </p>
        <p className=" px-[15px] text-justify indent-5">
          With a forward-thinking approach, I am ready to tackle new challenges
          and create innovative solutions together. If you&apos;re searching for
          a versatile and dedicated developer to strengthen your team, I invite
          you to explore my portfolio.
        </p>
        <p className="pb-8 px-[15px] text-lg text-center">
          Let&apos;s connect and craft digital experiences that make a lasting
          impact!
        </p>
      </a.div>
    </Html>
  );
}
