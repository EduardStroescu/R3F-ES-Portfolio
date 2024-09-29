/* eslint-disable react/no-unknown-property */
import { Fragment, Suspense, forwardRef, memo } from "react";
import PropTypes from "prop-types";

import Minimap from "./Minimap";
import { ProjectDetails } from "./ProjectDetails";
import { Plane } from "../ProjectsPlane";
import { useAppStore } from "../../lib/stores/useAppStore";
import useProjectDetails from "../../lib/hooks/useProjectDetails";
import ProjectsScene3DTitle from "./ProjectsScene3DTitle";
import { DelayedPlane } from "../DelayedPlane";

const ProjectsSceneContent = memo(
  forwardRef(function ProjectsSceneContent({ renderTargetC }, textRef) {
    const activeScene = useAppStore((state) => state.activeScene);

    const { planeGroupRef, planeGroups } = useProjectDetails();

    return (
      <Suspense>
        <group visible={activeScene !== "home"}>
          <Minimap planeGroups={planeGroups} />
          <group ref={planeGroupRef}>
            {planeGroups.map((group, index) => (
              <group key={index}>
                {group.map((planeProps, planeIndex) => {
                  return (
                    <Fragment key={planeIndex}>
                      {planeIndex % 2 !== 0 ? (
                        <Suspense>
                          <DelayedPlane
                            delay={planeProps.delay}
                            {...planeProps}
                          />
                        </Suspense>
                      ) : (
                        <Plane {...planeProps} />
                      )}
                    </Fragment>
                  );
                })}
              </group>
            ))}
          </group>
          <ProjectsScene3DTitle renderTargetC={renderTargetC} ref={textRef} />
          {activeScene === "projects" && <ProjectDetails />}
        </group>
      </Suspense>
    );
  })
);

export default ProjectsSceneContent;

ProjectsSceneContent.propTypes = {
  renderTargetC: PropTypes.object.isRequired,
};
