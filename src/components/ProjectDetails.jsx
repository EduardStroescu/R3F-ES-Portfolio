import { Html } from "@react-three/drei";
import { GithubIcon, HyperlinkIcon, ScrollIcon } from "./Icons";

export function ProjectDetails({ activeProject }) {
  return (
    <Html
      fullscreen
      pointerEvents={"none"}
      style={{
        pointerEvents: "none",
        // backgroundColor: "red",
        width: "100vw",
        position: "relative",
      }}
      as="projects-html"
      position={[11, 5, 0]}
      wrapperClass="font-[titleFont] text-white pointer-events-none"
    >
      <footer className="absolute bottom-0 sm:bottom-10 lg:bottom-8 2xl:bottom-14 left-0 lg:text-xl w-full flex flex-col justify-center items-center sm:px-4 lg:px-6 2xl:px-40">
        <div className="absolute bottom-0 sm:bottom-[-40px] lg:bottom-[-35px] 2xl:-bottom-14">
          <ScrollIcon />
          <p className="text-center text-sm lg:text-lg">Scroll</p>
        </div>
        <div className="flex flex-row gap-x-14 sm:gap-20 lg:gap-x-40 2xl:gap-x-60 justify-center items-center mb-2 lg:mb-6">
          <a
            href={activeProject.liveLink}
            rel="noreferrer"
            target="_blank"
            className={`${
              !activeProject.liveLink && "opacity-0"
            } pointer-events-auto text-black bg-white border-white rounded-full flex flex-row px-2`}
          >
            <span className="hoverShadow hover:text-[#f597e8] text-md">
              View Live
            </span>
            <span className="pt-[3px]">
              <HyperlinkIcon />
            </span>
          </a>
          <a
            href={activeProject.codeLink}
            rel="noreferrer"
            target="_blank"
            className={`
            ${!activeProject.codeLink && "opacity-0"} 
            pointer-events-auto text-black bg-white border-white rounded-full flex flex-row`}
          >
            <span className="hoverShadow hover:text-[#f597e8] text-md pl-2">
              View Code
            </span>
            <span className="text-black pl-2 mr-[-0.6px]">
              <GithubIcon />
            </span>
          </a>
        </div>
        <div
          className={`
          ${
            !activeProject.liveLink &&
            !activeProject.codeLink &&
            "opacity-0 pointer-events-none"
          } 
          flex text-white w-full flex-row justify-between items-center gap-20 lg:gap-x-40 2xl:gap-x-60 p-1 2xl:p-4
          `}
        >
          <div className="w-full flex flex-row justify-end">
            <ul
              className="flex flex-wrap justify-end items-center gap-1 lg:gap-2"
              aria-label="Technologies used"
            >
              {activeProject?.projectTags.map((tag, index) => (
                <li
                  key={index}
                  className="rounded-full bg-teal-400/10 px-2 lg:px-3 lg:py-1 text-xs lg:text-sm 2xl:text-xl font-medium leading-5 text-teal-300 "
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full">
            <p className="bg-teal-400/10 px-2 lg:px-4 py-2 lg:py-4 text-xs lg:text-sm 2xl:text-xl font-medium text-teal-300 text-center">
              {activeProject.projectDescription}
            </p>
          </div>
        </div>
      </footer>
    </Html>
  );
}
