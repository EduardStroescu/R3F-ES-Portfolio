import { useFrame } from "@react-three/fiber";
import { useCallback, useMemo, useRef } from "react";
import { getActiveProject } from "../helpers/getActiveProject";
import { useAppStore, useAppStoreActions } from "../stores/useAppStore";
import { useScrollContext } from "../providers/ScrollProvider";
import { projectsData } from "../data/projectsData";
import { useShallow } from "zustand/react/shallow";

const PLANE_ARGS = [15, 10, 24, 24]; // Width, Height, Width Segments, Height Segments
const PLANE_START_POSITION = 0;
const PLANE_OFFSET = 55;
const TOTAL_DISTANCE = (projectsData.length - 0.9) * 73;
const PLANE_Z_STARTS = projectsData.map((_, idx) => idx * TOTAL_DISTANCE);
const CENTER_XY = [11, -5];

export default function useProjectDetails() {
  const { viewportWidth, viewportHeight } = useAppStore(
    useShallow((state) => ({
      viewportWidth: state.viewportWidth,
      viewportHeight: state.viewportHeight,
    }))
  );

  const { setActiveProject } = useAppStoreActions();
  const planeGroupRef = useRef();
  const { scroll } = useScrollContext();

  // Helper function to calculate positions for left and right planes
  const calculatePlanePositionsAndDelay = useCallback(
    (index) => {
      if (viewportWidth > viewportHeight) {
        if (viewportWidth > 1110) {
          const gapX = 16;
          return {
            leftPlane: {
              position: [
                CENTER_XY[0] - gapX + 2,
                -5,
                PLANE_START_POSITION + index * -PLANE_OFFSET,
              ],
              animationDelay: 1.2,
            },
            rightPlane: {
              position: [
                CENTER_XY[0] + gapX,
                -5,
                PLANE_START_POSITION + index * -PLANE_OFFSET - 5,
              ],
              animationDelay: 0,
            },
          };
        } else {
          const gapX = 8;
          return {
            leftPlane: {
              position: [
                CENTER_XY[0] - gapX + 1,
                -5,
                PLANE_START_POSITION + index * -PLANE_OFFSET,
              ],
              animationDelay: 1.2,
            },
            rightPlane: {
              position: [
                CENTER_XY[0] + gapX,
                -5,
                PLANE_START_POSITION + index * -PLANE_OFFSET - 2,
              ],
              animationDelay: 0,
            },
          };
        }
      } else {
        const gapY = 5;
        return {
          leftPlane: {
            position: [
              11,
              CENTER_XY[1] - gapY,
              PLANE_START_POSITION + index * -PLANE_OFFSET - 4,
            ],
            animationDelay: 0,
          },
          rightPlane: {
            position: [
              11,
              CENTER_XY[1] + gapY,
              PLANE_START_POSITION + index * -PLANE_OFFSET,
            ],
            animationDelay: 1.0,
          },
        };
      }
    },
    [viewportWidth, viewportHeight]
  );

  const generalPlaneProps = useMemo(() => {
    if (viewportWidth > viewportHeight) {
      if (viewportWidth > 1110) {
        return {
          scaleX: viewportWidth > 1110 ? 1.5 : 0.85,
          scaleY: viewportWidth > 1110 ? 1.5 : 0.85,
          args: PLANE_ARGS,
        };
      }
    }
    return {
      scaleX: 0.85,
      scaleY: 0.85,
      args: PLANE_ARGS,
    };
  }, [viewportWidth, viewportHeight]);

  const planeGroups = useMemo(() => {
    return projectsData.map((project, idx) => {
      const planeConfig = calculatePlanePositionsAndDelay(idx);
      return [
        {
          position: planeConfig.leftPlane.position,
          type: "image",
          material: project.image,
          animationDelay: planeConfig.leftPlane.animationDelay,
          ...generalPlaneProps,
        },
        {
          position: planeConfig.rightPlane.position,
          type: "video",
          material: project.video,
          animationDelay: planeConfig.rightPlane.animationDelay,
          ...generalPlaneProps,
        },
      ];
    });
  }, [calculatePlanePositionsAndDelay, generalPlaneProps]);

  // Calculate the total distance covered by the planes in the scroll
  useFrame(() => {
    const groupChildren = planeGroupRef.current?.children;
    if (!groupChildren) return;

    // Calculate the adjusted offset once per frame
    let adjustedOffset = scroll.progress % 2;
    if (adjustedOffset < 0) adjustedOffset += 1;

    // Precompute commonly used constants
    const halfDistance = TOTAL_DISTANCE / 1.2;

    // Loop through each plane group and update its position
    for (let i = 0; i < groupChildren.length; i++) {
      let zPosition =
        (PLANE_Z_STARTS[i] + adjustedOffset * TOTAL_DISTANCE) % TOTAL_DISTANCE;
      if (zPosition > halfDistance) zPosition -= TOTAL_DISTANCE;

      groupChildren[i].position.z = zPosition;
    }

    // Update active project only once per frame
    const activeInfo = getActiveProject(scroll.progress, projectsData.length);
    setActiveProject(activeInfo);
  });

  return { planeGroupRef, planeGroups, allProjects: projectsData };
}
