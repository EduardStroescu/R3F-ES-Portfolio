import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useMemo, useRef } from "react";
import { getActiveProject } from "../helpers/getActiveProject";
import { useTexture } from "@react-three/drei";
import { useAppStoreActions } from "../stores/useAppStore";
import { useScrollContext } from "../providers/ScrollProvider";
import { projectsData } from "../data/projectsData";

const projectsImages = projectsData.map((project) => project.image);
const PLANE_START_POSITION = 0;
const PLANE_OFFSET = 55;
const TOTAL_DISTANCE = (projectsData.length - 0.9) * 73;
const PLANE_Z_STARTS = projectsData.map((_, idx) => idx * TOTAL_DISTANCE);

export default function useProjectDetails() {
  const { setActiveProject } = useAppStoreActions();
  const planeGroupRef = useRef();
  const { scroll } = useScrollContext();
  const { size } = useThree();
  const viewport = { width: size.width, height: size.height };

  const images = useTexture(projectsImages);

  const planeCoords = useMemo(
    () => ({
      planeLeft: { x: viewport.width > 1110 ? -3 : 8, y: -5 },
      planeRight: { x: viewport.width > 1110 ? 27 : 16, y: -5 },
    }),
    [viewport.width]
  );

  // Helper function to calculate positions for left and right planes
  const calculatePlanePositions = useCallback(
    (index) => ({
      leftPlane: [
        planeCoords.planeLeft.x,
        planeCoords.planeLeft.y,
        PLANE_START_POSITION + index * -PLANE_OFFSET,
      ],
      rightPlane: [
        planeCoords.planeRight.x,
        planeCoords.planeRight.y,
        PLANE_START_POSITION + index * -PLANE_OFFSET - 5,
      ],
    }),
    [
      planeCoords.planeLeft.x,
      planeCoords.planeLeft.y,
      planeCoords.planeRight.x,
      planeCoords.planeRight.y,
    ]
  );

  const generalPlaneProps = useMemo(
    () => ({
      scaleX: viewport.width > 1110 ? 1.5 : 0.4,
      scaleY: viewport.width > 1110 ? 1.5 : 0.5,
      aspect: [15, 10],
    }),
    [viewport.width]
  );

  const planeGroups = useMemo(() => {
    return projectsData.map((project, idx) => [
      {
        position: calculatePlanePositions(idx).leftPlane,
        material: { map: images[idx] },
        ...generalPlaneProps,
      },
      {
        position: calculatePlanePositions(idx).rightPlane,
        material: project.video,
        delay: idx === 0 || idx === projectsData.length - 1 ? 0 : idx * 2000,
        ...generalPlaneProps,
      },
    ]);
  }, [calculatePlanePositions, images, generalPlaneProps]);

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

  return { planeGroupRef, planeGroups };
}
