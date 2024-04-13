import { projectsData } from "../data/projectsData";

export const getActiveProject = (offset) => {
  let activeIndex = 0;
  if (offset <= -0.8 && offset <= 0.08) {
    activeIndex = 0;
  } else if (offset > 0.08 && offset <= 0.24) {
    activeIndex = 1;
  } else if (offset > 0.24 && offset <= 0.38) {
    activeIndex = 2;
  } else if (offset > 0.38 && offset <= 0.53) {
    activeIndex = 3;
  } else if (offset > 0.53 && offset <= 0.67) {
    activeIndex = 4;
  } else if (offset > 0.67 && offset <= 0.92) {
    activeIndex = 5;
  } else {
    activeIndex = 0;
  }
  const activeProject = projectsData[activeIndex];
  return activeProject;
};
