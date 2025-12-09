import { memo, Suspense, useMemo } from "react";
import useProjectDetails from "../../lib/hooks/useProjectDetails";
import { DelayedPlane } from "../DelayedPlane";
import { useAppStore } from "../../lib/stores/useAppStore";

const ProjectsScenePlanes = memo(function ProjectsScenePlanes() {
  const { planeGroupRef, planeGroups, allProjects } = useProjectDetails();
  const activeProject = useAppStore((state) => state.activeProject);

  // helper: get indices of previous, current, and next project. similar to a virtualized list.
  const visibleIndices = useMemo(() => {
    const activeProjectIndex = allProjects.findIndex(
      (project) => project.title === activeProject.title
    );
    const totalProjectsLength = allProjects.length;

    return [
      (activeProjectIndex - 1 + totalProjectsLength) % totalProjectsLength, // previous
      activeProjectIndex, // current
      (activeProjectIndex + 1) % totalProjectsLength, // next
    ];
  }, [activeProject.title, allProjects]);

  return (
    <group ref={planeGroupRef}>
      {planeGroups.map((group, groupIndex) => {
        const isProjectVisible = visibleIndices.includes(groupIndex);
        return (
          <group key={`planeGroup-${groupIndex}`}>
            {group.map((planeProps, planeIndex) => (
              <Suspense
                key={`planeGroup-${groupIndex}-plane-${planeIndex}`}
                fallback={null}
              >
                <DelayedPlane
                  isPlaneInView={isProjectVisible}
                  {...planeProps}
                />
              </Suspense>
            ))}
          </group>
        );
      })}
    </group>
  );
});

export default ProjectsScenePlanes;
