import { Suspense, forwardRef, memo } from "react";
import PropTypes from "prop-types";

import Minimap from "./Minimap";
import { ProjectDetails } from "./ProjectDetails";
import { Plane } from "../ProjectsPlane";
import { useAppStore } from "../../lib/store";
import useProjectDetails from "../../lib/hooks/useProjectDetails";
import ProjectsScene3DTitle from "./ProjectsScene3DTitle";

const ProjectsSceneContent = memo(
  forwardRef(function ProjectsSceneContent({ renderTargetC }, textRef) {
    const projectsSceneActive = useAppStore(
      (state) => state.projectsSceneActive
    );

    const { planeGroupRef, planeGroups } = useProjectDetails();

    return (
      <Suspense>
        {projectsSceneActive && (
          <>
            <Minimap planeGroups={planeGroups} />
            <group ref={planeGroupRef}>
              {planeGroups.map((group, index) => (
                <group key={index}>
                  {group.map((planeProps, planeIndex) => (
                    <Plane key={planeIndex} {...planeProps} />
                  ))}
                </group>
              ))}
            </group>
            <ProjectsScene3DTitle renderTargetC={renderTargetC} ref={textRef} />
            <ProjectDetails />
          </>
        )}
      </Suspense>
    );
  })
);

export default ProjectsSceneContent;

ProjectsSceneContent.propTypes = {
  renderTargetC: PropTypes.object.isRequired,
};
