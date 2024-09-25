import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { getActiveProject } from "../helpers/getActiveProject";
import { useTexture } from "@react-three/drei";
import useVideoTextures from "./useVideoTextures";
import { useAppStoreActions } from "../stores/useAppStore";
import { useScrollContext } from "../providers/ScrollProvider";

export default function useProjectDetails() {
  const { setActiveProject } = useAppStoreActions();
  const planeGroupRef = useRef();
  const { scroll } = useScrollContext();

  const [material1, material2, material3, material4, material5, material6] =
    useTexture([
      "https://res.cloudinary.com/dgfe1xsgj/image/upload/dpr_auto,fl_immutable_cache,q_auto/v1705318299/Portfolio/Photos/nq6wzkwk4igedfgfxzyu",
      "https://res.cloudinary.com/dgfe1xsgj/image/upload/dpr_auto,fl_immutable_cache,q_auto/v1705318299/Portfolio/Photos/ws9l0i09h7yhxuijemgm",
      "https://res.cloudinary.com/dgfe1xsgj/image/upload/dpr_auto,fl_immutable_cache,q_auto/v1705318299/Portfolio/Photos/expoDash_s8ipv9",
      "https://res.cloudinary.com/dgfe1xsgj/image/upload/dpr_auto,fl_immutable_cache,q_auto/v1705318299/Portfolio/Photos/mdvltwawjll7babtkyia",
      "https://res.cloudinary.com/dgfe1xsgj/image/upload/dpr_auto,fl_immutable_cache,q_auto/v1705318299/Portfolio/Photos/j9m7guleaptbuew2uihm",
      "https://res.cloudinary.com/dgfe1xsgj/image/upload/dpr_auto,fl_immutable_cache,q_auto/v1705318299/Portfolio/Photos/rh1fhccz4sw7izpyy1uc",
      // Uncomment for Coming Soon Placeholder
      // "https://res.cloudinary.com/dgfe1xsgj/image/upload/dpr_auto,fl_immutable_cache,q_auto/v1705318299/Portfolio/Photos/n2zhusifwz47eufpilmq",
    ]);

  const {
    videoTexture,
    videoTexture2,
    videoTexture3,
    videoTexture4,
    videoTexture5,
    videoTexture6,
  } = useVideoTextures();

  const { size } = useThree();
  const viewport = { width: size.width, height: size.height };
  const planeCoords = {
    planeLeft: { x: viewport.width / 10 > 111 ? -3 : 8, y: -5 },
    planeRight: { x: viewport.width / 10 > 111 ? 27 : 16, y: -5 },
  };

  const planeStartPosition = 0;
  const planeGroups = useMemo(
    () => [
      [
        {
          position: [
            planeCoords.planeLeft.x,
            planeCoords.planeLeft.y,
            planeStartPosition + 5,
          ],
          material: { map: material1 },
        },
        {
          position: [
            planeCoords.planeRight.x,
            planeCoords.planeRight.y,
            planeStartPosition,
          ],
          material: { map: videoTexture },
        },
      ],
      [
        {
          position: [
            planeCoords.planeLeft.x,
            planeCoords.planeLeft.y,
            planeStartPosition - 55,
          ],
          material: { map: material2 },
        },
        {
          position: [
            planeCoords.planeRight.x,
            planeCoords.planeRight.y,
            planeStartPosition - 60,
          ],
          material: { map: videoTexture2 },
        },
      ],
      [
        {
          position: [
            planeCoords.planeLeft.x,
            planeCoords.planeLeft.y,
            (planeStartPosition - 55) * 2,
          ],
          material: { map: material3 },
        },
        {
          position: [
            planeCoords.planeRight.x,
            planeCoords.planeRight.y,
            (planeStartPosition - 55) * 2 - 5,
          ],
          material: { map: videoTexture3 },
        },
      ],
      [
        {
          position: [
            planeCoords.planeLeft.x,
            planeCoords.planeLeft.y,
            (planeStartPosition - 55) * 3,
          ],
          material: { map: material4 },
        },
        {
          position: [
            planeCoords.planeRight.x,
            planeCoords.planeRight.y,
            (planeStartPosition - 55) * 3 - 5,
          ],
          material: { map: videoTexture4 },
        },
      ],
      [
        {
          position: [
            planeCoords.planeLeft.x,
            planeCoords.planeLeft.y,
            (planeStartPosition - 55) * 4,
          ],
          material: { map: material5 },
        },
        {
          position: [
            planeCoords.planeRight.x,
            planeCoords.planeRight.y,
            (planeStartPosition - 55) * 4 - 5,
          ],
          material: { map: videoTexture5 },
        },
      ],
      [
        {
          position: [
            planeCoords.planeLeft.x,
            planeCoords.planeLeft.y,
            (planeStartPosition - 55) * 5,
          ],
          material: { map: material6 },
        },
        {
          position: [
            planeCoords.planeRight.x,
            planeCoords.planeRight.y,
            (planeStartPosition - 55) * 5 - 5,
          ],
          material: { map: videoTexture6 },
        },
      ],
    ],
    [
      material1,
      material2,
      material3,
      material4,
      material5,
      material6,
      videoTexture,
      videoTexture2,
      videoTexture3,
      videoTexture4,
      videoTexture5,
      videoTexture6,
      planeCoords.planeLeft.x,
      planeCoords.planeRight.x,
      planeCoords.planeLeft.y,
      planeCoords.planeRight.y,
    ]
  );

  useFrame(() => {
    if (planeGroupRef.current) {
      // Calculate the total distance covered by the planes in the scroll
      const totalDistance = (planeGroups.length - 0.9) * 73;

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
      const activeInfo = getActiveProject(scroll.progress);
      setActiveProject(activeInfo);
    }
  });

  return { planeGroupRef, planeGroups };
}
