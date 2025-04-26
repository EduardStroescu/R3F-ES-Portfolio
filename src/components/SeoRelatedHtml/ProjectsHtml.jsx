import { Helmet } from "react-helmet-async";
import { projectsData } from "../../lib/data/projectsData";

export function ProjectsHtml() {
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://eduardstroescu.com/projects" />
      </Helmet>
      <section className="relative flex flex-col items-center justify-center overflow-hidden w-full h-full select-none gap-4 text-[#000f3b]">
        <h1 className="text-xl">Projects</h1>
        <ul className="w-full h-full grid grid-cols-4 gap-4">
          {projectsData.map((project) => (
            <li key={project.title} className="col-span-1">
              <h2>{project.title}</h2>
              <p>{project.projectDescription}</p>
              <nav>
                <a
                  href={project.liveLink}
                  aria-label="Link to View Live Project"
                ></a>
                <a
                  href={project.codeLink}
                  aria-label="Link to View Project Code"
                ></a>
              </nav>
              <section>
                <ul>
                  {project?.projectTags?.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </section>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
