import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useMemo, useRef } from "react";
import { getActiveProject } from "../helpers/getActiveProject";
import { useTexture } from "@react-three/drei";
import { useAppStoreActions } from "../stores/useAppStore";
import { useScrollContext } from "../providers/ScrollProvider";
import { projectsData } from "../data/projectsData";

export default function useProjectDetails() {
  const { setActiveProject } = useAppStoreActions();
  const planeGroupRef = useRef();
  const { scroll } = useScrollContext();
  const { size } = useThree();
  const viewport = { width: size.width, height: size.height };

  const projectsImages = projectsData.map((project) => project.image);
  const images = useTexture(projectsImages);

  const planeCoords = {
    planeLeft: { x: viewport.width > 1110 ? -3 : 8, y: -5 },
    planeRight: { x: viewport.width > 1110 ? 27 : 16, y: -5 },
  };

  const planeStartPosition = 0;
  const planeOffset = 55;

  // Helper function to calculate positions for left and right planes
  const calculatePlanePositions = useCallback(
    (index) => ({
      leftPlane: [
        planeCoords.planeLeft.x,
        planeCoords.planeLeft.y,
        planeStartPosition + index * -planeOffset,
      ],
      rightPlane: [
        planeCoords.planeRight.x,
        planeCoords.planeRight.y,
        planeStartPosition + index * -planeOffset - 5,
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
  const totalDistance = (planeGroups.length - 0.9) * 73;
  useFrame(() => {
    if (planeGroupRef.current) {
      // Calculate the adjusted offset to create a seamless loop
      let adjustedOffset = scroll.progress % 2;
      if (adjustedOffset < 0) {
        adjustedOffset += 1;
      }

      // Loop through each plane group and update its position based on the adjusted offset
      planeGroupRef.current.children.forEach((group, index) => {
        // Calculate the position of the group based on the adjusted offset
        let zPosition =
          (index * totalDistance + adjustedOffset * totalDistance) %
          totalDistance;

        // Adjust the z-axis position of the group to loop back to the beginning when reaching the last group
        if (zPosition > totalDistance / 1.2) {
          zPosition -= totalDistance;
        }
        group.position.z = zPosition;
      });

      // Set Project Details according to the scroll offset
      const activeInfo = getActiveProject(scroll.progress, projectsData.length);
      setActiveProject(activeInfo);
    }
  });

  return { planeGroupRef, planeGroups };
}
