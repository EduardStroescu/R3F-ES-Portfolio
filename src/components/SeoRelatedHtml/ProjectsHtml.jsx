import { projectsData } from "../../lib/data/projectsData";

export function ProjectsHtml() {
  return (
    <div className="relative -left-[9999px]">
      <h2>Projects</h2>
      <ul>
        {projectsData.map((project) => (
          <li key={project.title}>
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
    </div>
  );
}
