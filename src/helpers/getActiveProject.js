import { projectData } from "../data/projectsData";

export const getActiveProject = (offset) => {
  if (offset <= -0.8 && offset <= 0.09) {
    return {
      title: projectData.titles[0],
      liveLink: projectData.liveLinks[0],
      codeLink: projectData.codeLinks[0],
      color: projectData.titleColors[0],
      projectDescription: projectData.projectDescriptions[0],
      projectTags: projectData.projectTags[0],
    };
  } else if (offset >= 0.09 && offset <= 0.27) {
    return {
      title: projectData.titles[1],
      liveLink: projectData.liveLinks[1],
      codeLink: projectData.codeLinks[1],
      color: projectData.titleColors[1],
      projectDescription: projectData.projectDescriptions[1],
      projectTags: projectData.projectTags[1],
    };
  } else if (offset >= 0.27 && offset <= 0.48) {
    return {
      title: projectData.titles[2],
      liveLink: projectData.liveLinks[2],
      codeLink: projectData.codeLinks[2],
      color: projectData.titleColors[2],
      projectDescription: projectData.projectDescriptions[2],
      projectTags: projectData.projectTags[2],
    };
  } else if (offset >= 0.48 && offset <= 0.64) {
    return {
      title: projectData.titles[3],
      codeLink: projectData.codeLinks[3],
      color: projectData.titleColors[3],
      projectDescription: projectData.projectDescriptions[3],
      projectTags: projectData.projectTags[3],
    };
  } else if (offset >= 0.64 && offset <= 0.86) {
    return {
      title: projectData.titles[4],
      color: projectData.titleColors[4],
      projectDescription: projectData.projectDescriptions[4],
      projectTags: projectData.projectTags[4],
    };
  } else {
    return {
      title: projectData.titles[0],
      liveLink: projectData.liveLinks[0],
      codeLink: projectData.codeLinks[0],
      color: projectData.titleColors[0],
      projectDescription: projectData.projectDescriptions[0],
      projectTags: projectData.projectTags[0],
    };
  }
};
