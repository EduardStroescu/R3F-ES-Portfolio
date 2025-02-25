import { projectsData } from "../data/projectsData";

const THRESHOLDS = [0.08, 0.24, 0.38, 0.53, 0.67, 0.92];

export const getActiveProject = (offset) => {
  const activeIndex = THRESHOLDS.findIndex((threshold) => offset <= threshold);

  return projectsData[activeIndex === -1 ? 0 : activeIndex];
};
