import { a, useSpring } from "@react-spring/web";
import { Html } from "@react-three/drei";

export default function AboutSection({
  visible,
  setVisible,
  playHoverSound,
  playMenuOpenCloseSound,
}) {
  const { clipPath } = useSpring({
    clipPath: visible
      ? "polygon(0% 0%,100% 0%,100% 40%,0% 40%,0% 40%,100% 40%,100% 75%,0% 75%,0% 75%,100% 75%,100% 100%,0% 100%)"
      : "polygon(0% 0%,100% 0%,100% 0%,0% 0%,0% 60%,100% 61%,100% 61%,0% 60%,0% 100%,100% 100%,100% 100%,0% 100%)",
    config: { mass: 1, tension: 500, friction: 60 },
  });

  return (
    <Html
      pointerEvents={"none"}
      style={{ pointerEvents: "none" }}
      as="aboutSectionWrapper"
      fullscreen
      transform
      scale={0.5}
      position={[11, 6, 15]}
      wrapperClass="m-0 p-0 box-border text-white overflow-hidden h-full w-full"
    >
      <a.div
        style={{ clipPath, pointerEvents: "none", transform: "scale(2)" }}
        className="MainFont z-[-5] mx-[0px] sm:mx-[150px] md:mx-[200px] lg:mx-[30%] 2xl:mx-[35%] flex flex-col justify-center items-center gap-6 bg-[#10D9E182]/[0.80] rounded-xl border border-[#10D9E182]/[1] bg-gradient-to-t from-[#11e8bb]/[0.6] to-[#8200c9]/[0.7]"
      >
        <button
          style={{ pointerEvents: visible ? "auto" : "none" }}
          className="hover:text-[#f597e8] hover:italic hoverShadow hover:-translate-x-1 flex flex-row self-start pl-4 pt-4"
          onClick={() => {
            setVisible(false);
            playMenuOpenCloseSound();
          }}
          onPointerEnter={playHoverSound}
        >
          &#10094; Back
        </button>
        <h1 className="font-bold titleColor text-4xl pb-6 mt-[-20px]">About</h1>
        <p className="py-0 px-[15px] text-lg text-justify indent-5">
          I&apos;m Eduard, a Front-End developer specializing in web-based
          technologies and frameworks. I am driven by an insatiable passion for
          learning, which keeps me at the forefront of technological
          advancements. My commitment to continuous improvement ensures that my
          skills remain sharp and effective.
        </p>

        <p className="py-[15px] px-[15px] text-justify indent-5">
          If you&apos;re searching for a versatile and dedicated developer to
          strengthen your team, I invite you to explore my portfolio. With a
          wealth of knowledge and a forward-thinking approach, I am ready to
          tackle new challenges and create innovative solutions together.
          Let&apos;s connect and uncover the exciting possibilities that lie
          ahead!
        </p>
      </a.div>
    </Html>
  );
}
