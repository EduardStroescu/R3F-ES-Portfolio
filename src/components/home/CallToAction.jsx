import { Html } from "@react-three/drei";
import { useLocation, useNavigate } from "react-router-dom";
import { useAboutStore } from "../../lib/stores/useAboutStore";
import { EmailIcon, GithubIcon, HyperlinkIcon, LinkedInIcon } from "../Icons";
import { useSpring, a } from "@react-spring/web";
import { useSoundStoreActions } from "../../lib/stores/useSoundStore";
import { useContactStoreActions } from "../../lib/stores/useContactStore";
import { useThree } from "@react-three/fiber";

export default function CallToAction() {
  const location = useLocation();
  const navigate = useNavigate();
  const visible = useAboutStore((state) => state.visible);
  const { size } = useThree();
  const viewport = { width: size.width / 10 };

  const { setFlipped } = useContactStoreActions();
  const { playHoverSound, playTransitionSound, playUnderwaterTransitionSound } =
    useSoundStoreActions();

  const handleNavigate = (location) => {
    navigate(location);
    location.pathname !== "/projects" && playUnderwaterTransitionSound();
  };

  const { opacity } = useSpring({
    from: { opacity: 0 },
    to: { opacity: location.pathname !== "/" ? 0 : 1 },
    config: { mass: 5, tension: 500, friction: 80 },
    delay: location.pathname === "/" ? 750 : 0,
  });

  return (
    <Html
      pointerEvents={"none"}
      style={{ opacity, pointerEvents: "none", fontFamily: "serif" }}
      as="calltoActionSectionWrapper"
      fullscreen
      transform
      scale={0.5}
      position={[
        11,
        viewport.width > 111 ? 1.5 : 1.8,
        viewport.width > 111 ? 11 : 10,
      ]}
      wrapperClass={`text-white`}
    >
      <a.div
        style={{
          opacity,
          transform: `${viewport.width > 111 ? "scale(2)" : "scale(2.5)"} `,
          pointerEvents: `${visible ? "none" : "auto"}`,
        }}
        className="flex justify-center items-center gap-4"
      >
        <button
          className="flex gap-0.5 hover:bg-black bg-white hover:text-white transition-all ease-in-out duration-1000 text-2xl border-white border-[1.5px] text-black py-1 px-3 rounded-full group text-nowrap"
          onClick={() => handleNavigate("/projects")}
          onPointerOver={playHoverSound}
        >
          View projects
          <HyperlinkIcon className="rotate-90 w-[24px] h-[24px] self-center group-hover:fill-white pointer-events-none" />
        </button>
        <div className="flex gap-1">
          <button
            className="p-1 bg-white rounded-full group"
            aria-label="See Github Profile"
            title="See Github Profile"
            onClick={() =>
              window.open(
                import.meta.env.VITE_GITHUB_URL,
                "_blank",
                "noopener,noreferrer"
              )
            }
            onPointerOver={playHoverSound}
          >
            <GithubIcon className="group-hover:scale-110 transition-all ease-in-out duration-500 pointer-events-none w-[30px] h-[30px]" />
          </button>
          <button
            className="p-1 bg-white rounded-full group"
            aria-label="See LinkedIn Profile"
            title="See LinkedIn Profile"
            onPointerOver={playHoverSound}
            onClick={() =>
              window.open(
                import.meta.env.VITE_LINKEDIN_URL,
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <LinkedInIcon className="group-hover:scale-110 transition-all ease-in-out duration-500 pointer-events-none w-[30px] h-[30px]" />
          </button>
          <button
            className="p-1 bg-white rounded-full group"
            aria-label="Contact me"
            title="Contact me"
            onClick={() => {
              navigate("/contact");
              setFlipped(false);
              playTransitionSound();
            }}
            onPointerOver={playHoverSound}
          >
            <EmailIcon className="group-hover:scale-110 transition-all ease-in-out duration-500 pointer-events-none w-[30px] h-[30px]" />
          </button>
        </div>
      </a.div>
    </Html>
  );
}
