import { Html } from "@react-three/drei";
import { useLocation, useNavigate } from "react-router-dom";
import { useAboutStore } from "../../lib/stores/useAboutStore";
import { EmailIcon, GithubIcon, HyperlinkIcon, LinkedInIcon } from "../Icons";
import { useSpring, a } from "@react-spring/web";
import { useSoundStoreActions } from "../../lib/stores/useSoundStore";
import { useContactStoreActions } from "../../lib/stores/useContactStore";
import { useAppStore } from "../../lib/stores/useAppStore";

export default function CallToAction() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const viewportWidth = useAppStore((state) => state.viewportWidth);
  const visible = useAboutStore((state) => state.visible);

  const { setFlipped } = useContactStoreActions();
  const { playHoverSound, playTransitionSound, playUnderwaterTransitionSound } =
    useSoundStoreActions();

  const handleNavigate = (location) => {
    navigate(location);
    pathname !== "/projects" && playUnderwaterTransitionSound();
  };

  const { opacity } = useSpring({
    from: { opacity: 0 },
    to: { opacity: pathname !== "/" ? 0 : 1 },
    config: { mass: 5, tension: 500, friction: 80, clamp: true },
    delay: pathname === "/" ? 750 : 0,
  });

  return (
    <Html
      pointerEvents={"none"}
      style={{ opacity }}
      as="nav"
      fullscreen
      transform
      scale={0.5}
      position={[
        11,
        viewportWidth > 667 ? 1.5 : 2,
        viewportWidth > 1110 ? 11 : 10,
      ]}
      wrapperClass={`font-[serif] text-white pointer-events-none`}
    >
      <a.div
        style={{
          opacity,
          transform: `${viewportWidth > 1110 ? "scale(2)" : "scale(2.5)"} `,
          pointerEvents: `${visible || pathname !== "/" ? "none" : "auto"}`,
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
          <a
            className="p-1 bg-white rounded-full group"
            aria-label="See Github Profile"
            title="See Github Profile"
            href={import.meta.env.VITE_GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            onPointerOver={playHoverSound}
          >
            <GithubIcon className="group-hover:scale-110 transition-all ease-in-out duration-500 pointer-events-none w-[30px] h-[30px]" />
          </a>
          <a
            className="p-1 bg-white rounded-full group"
            aria-label="See LinkedIn Profile"
            title="See LinkedIn Profile"
            href={import.meta.env.VITE_LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            onPointerOver={playHoverSound}
          >
            <LinkedInIcon className="group-hover:scale-110 transition-all ease-in-out duration-500 pointer-events-none w-[30px] h-[30px]" />
          </a>
          <button
            className="p-1 bg-white rounded-full group"
            aria-label="Navigate to Contact Section"
            title="Navigate to Contact Section"
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
