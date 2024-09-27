import { projectsData } from "../../lib/data/projectsData";

export function ProjectsHtml() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden w-full h-full select-none gap-4 text-[#220140]">
      <h2 className="text-xl">Projects</h2>
      <ul className="w-full h-full grid grid-cols-4 gap-4">
        {projectsData.map((project) => (
          <li key={project.title} className="col-span-1">
            <h2>{project.title}</h2>
            <p>{project.projectDescription}</p>
            <a href={project.liveLink}>View Live</a>
            <a href={project.codeLink}>View Code</a>
            <ul>
              {project?.projectTags?.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
