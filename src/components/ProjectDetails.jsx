import { Html } from "@react-three/drei";
import { GithubIcon, HyperlinkIcon, ScrollIcon } from "./Icons";

export function ProjectDetails({ viewport, activeProject }) {
  return (
    <Html
      transform
      pointerEvents={"none"}
      fullscreen
      style={{ pointerEvents: "none" }}
      as="projects-html"
      scale={viewport.width / 10 > 111 ? 1.1 : 1}
      position={[
        viewport.width / 10 > 111 ? 11 : 11.1,
        viewport.width / 10 > 111
          ? -viewport.width / viewport.height / 1.2
          : (-viewport.width / viewport.height) * 2.2,
        15,
      ]}
      wrapperClass="m-0 p-0 box-border font-[titleFont] text-white overflow-hidden"
    >
      <footer className="text-md w-[100vw] sm:w-[100vw] md:w-[100vw] xl:w-[80vw] 2xl:w-[60vw] sm:h-[10rem] flex flex-col justify-center items-center">
        <div className="absolute top-[73%] sm:top-[80%]">
          <ScrollIcon />
          <p className="text-center text-lg sm:text-sm">Scroll</p>
        </div>
        <div className="flex flex-row place-self-between gap-x-24 pb-2 sm:pb-6">
          <a
            href={activeProject.liveLink}
            rel="noreferrer"
            target="_blank"
            className={`${
              !activeProject.liveLink && "opacity-0"
            } pointer-events-auto text-black bg-white border-white rounded-full mb-2 flex flex-row`}
          >
            <span className="hoverShadow hover:text-[#f597e8] text-md pl-2">
              View Live
            </span>
            <span className="pr-2 pt-[3px]">
              <HyperlinkIcon />
            </span>
          </a>
          <a
            href={activeProject.codeLink}
            rel="noreferrer"
            target="_blank"
            className={`
            ${!activeProject.codeLink && "opacity-0"} 
            pointer-events-auto text-black bg-white border-white rounded-full mb-2 flex flex-row my-[2px]`}
          >
            <span className="hoverShadow hover:text-[#f597e8] text-md pl-2">
              View Code
            </span>
            <span className="text-black pl-2 mr-[-0.5px]">
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
          flex text-white w-[110vw] md:w-[75vw] h-full flex-row justify-around items-center gap-x-[20%] sm:gap-x-[40%] md:gap-x-[0%]
          `}
        >
          <div className="w-1/2 sm:w-1/3 h-full flex flex-row justify-end mb-4">
            <ul
              className="flex flex-wrap justify-end items-center"
              aria-label="Technologies used"
            >
              {activeProject.projectTags.map((tag, index) => (
                <li key={index} className="mr-1.5 mt-1">
                  <div className="flex rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">
                    {tag}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/2 sm:w-1/3 h-full flex flex-row justify-start self-center mb-2">
            <p className="flex items-center bg-teal-400/10 px-2 py-2 text-sm font-medium text-teal-300 text-center ml-1.5">
              {activeProject.projectDescription}
            </p>
          </div>
        </div>
      </footer>
    </Html>
  );
}
