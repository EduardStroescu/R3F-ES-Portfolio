import { projectsData } from "../data/projectsData";

export const getActiveProject = (scrollProgress, totalProjects) => {
  const normalized = ((scrollProgress % 1) + 1) % 1; // keep in [0,1)
  const sectionSize = 0.88 / totalProjects;

  // Offset by half a section to switch at the midpoint between projects
  const adjusted = normalized + sectionSize / 2;

  // Don't wrap, clamp adjusted to max 1
  const clamped = adjusted > 1 ? 1 : adjusted;

  // Calculate index without wrap
  let index = Math.floor(clamped / sectionSize);

  // Clamp index to valid range (0 to totalProjects-1)
  if (index >= totalProjects) index = 0;
  if (index < 0) index = 0;

  return projectsData[index];
};
