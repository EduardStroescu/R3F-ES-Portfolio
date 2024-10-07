import { Html } from "@react-three/drei";
import { GithubIcon, HyperlinkIcon, ScrollIcon } from "../Icons";
import { memo } from "react";
import { useAppStore } from "../../lib/stores/useAppStore";
import { useSoundStoreActions } from "../../lib/stores/useSoundStore";

export const ProjectDetails = memo(function ProjectDetails() {
  const activeProject = useAppStore((state) => state.activeProject);
  const { playHoverSound } = useSoundStoreActions();

  if (!activeProject || !activeProject.codeLink || !activeProject.liveLink)
    return;

  return (
    <Html
      fullscreen
      pointerEvents={"none"}
      style={{
        pointerEvents: "none",
        width: "100vw",
        position: "relative",
      }}
      as="projects-html"
      position={[11, 5, 0]}
      wrapperClass="font-[titleFont] text-white pointer-events-none"
    >
      <section className="absolute bottom-0 sm:bottom-10 lg:bottom-8 2xl:bottom-14 left-0 lg:text-xl w-full flex flex-col justify-center items-center sm:px-4 lg:px-6 2xl:px-40">
        <div className="absolute flex flex-row items-center bottom-0 sm:bottom-[-30px] lg:bottom-[-10px] 2xl:-bottom-6">
          <p className="text-xs lg:text-lg">SCR</p>
          <ScrollIcon />
          <p className="text-xs lg:text-lg">LL</p>
        </div>
        <div className="flex flex-row gap-x-20 sm:gap-20 lg:gap-x-40 2xl:gap-x-60 justify-center items-center mb-2 lg:mb-6">
          <a
            href={activeProject?.liveLink}
            rel="noreferrer"
            target="_blank"
            className="group
            viewButtonTransition
            viewLiveTransition
            overflow-hidden
            items-center relative
            pointer-events-auto text-[#f00] border-[2px] border-[#f00] rounded-full flex flex-row"
            onPointerOver={playHoverSound}
            aria-label="View Live"
          >
            <span className="text-xs sm:text-base font-bold py-1 pl-2 pr-7 pointer-events-none">
              View Live
            </span>
            <span className="ml-2 pointer-events-none">
              <HyperlinkIcon />
            </span>
          </a>
          <a
            href={activeProject?.codeLink}
            rel="noreferrer"
            target="_blank"
            className="
            group
            viewButtonTransition
            viewCodeTransition
            overflow-hidden
            items-center relative
            pointer-events-auto text-[#0ef] border-[2px] border-[#0ef] rounded-full flex flex-row"
            onPointerOver={playHoverSound}
            aria-label="View Code"
          >
            <span className="text-xs sm:text-base font-bold py-1 pl-2 pr-7 pointer-events-none">
              View Code
            </span>
            <span className="ml-2 pointer-events-none">
              <GithubIcon />
            </span>
          </a>
        </div>
        <div
          className="
          flex text-white w-full flex-row justify-between items-center gap-20 lg:gap-x-40 2xl:gap-x-60 p-1 2xl:p-4"
        >
          <div className="w-full flex flex-row justify-end">
            <ul
              className="flex flex-wrap justify-end items-center gap-1 lg:gap-2"
              aria-label="Technologies used"
            >
              {activeProject?.projectTags?.map((tag, index) => (
                <li
                  key={index}
                  className="rounded-full bg-teal-400/10 px-2 lg:px-3 lg:py-1 text-xs lg:text-sm 2xl:text-xl font-medium leading-5 text-teal-300 "
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full hyphens-auto text-center break-words leading-tight">
            <p className="bg-teal-400/10 px-2 lg:px-4 py-2 lg:py-4 text-xs lg:text-sm 2xl:text-xl text-teal-300">
              {activeProject?.projectDescription}
            </p>
          </div>
        </div>
      </section>
    </Html>
  );
});
