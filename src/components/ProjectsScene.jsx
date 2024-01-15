/* eslint-disable react/no-unknown-property */
/* eslint-disable react/display-name */
import {
  MeshTransmissionMaterial,
  Text,
  useScroll,
  useTexture,
  useVideoTexture,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import React from "react";

import { Minimap } from "./Minimap";
import { ProjectDetails } from "./ProjectDetails";
import { getActiveProject } from "../helpers/getActiveProject";
import titleFont from "../assets/fonts/Dosis.woff";

const Plane = React.memo(({ position, material }) => {
  const ref = useRef();
  const { size } = useThree();
  const viewport = { width: size.width / 10 };

  return (
    <group
      position={position}
      scale-x={viewport.width > 111 ? 1.5 : 0.4}
      scale-y={viewport.width > 111 ? 1.5 : 0.5}
    >
      <mesh ref={ref}>
        <planeGeometry args={[15, 10]} />
        <meshBasicMaterial {...material} fog={true} />
      </mesh>
    </group>
  );
});

export default function ProjectsScene({
  projectsSceneActive,
  textRef,
  renderTargetC,
}) {
  const [activeProject, setActiveProject] = useState({
    title: null,
    color: null,
    projectDescription: null,
    projectTags: null,
  });
  const [isVideoOnePlaying, setIsVideoOnePlaying] = useState(true);
  const [isVideoTwoPlaying, setIsVideoTwoPlaying] = useState(false);
  const [isVideoThreePlaying, setIsVideoThreePlaying] = useState(false);
  const [isVideoFourPlaying, setIsVideoFourPlaying] = useState(false);

  const scroll = useScroll();
  const ref = useRef();

  const [material1, material2, material3, material4, material5] = useTexture([
    "https://res.cloudinary.com/dgfe1xsgj/image/upload/f_auto,q_auto/v1/Portfolio/Photos/nq6wzkwk4igedfgfxzyu",
    "https://res.cloudinary.com/dgfe1xsgj/image/upload/f_auto,q_auto/v1/Portfolio/Photos/mdvltwawjll7babtkyia",
    "https://res.cloudinary.com/dgfe1xsgj/image/upload/f_auto,q_auto/v1/Portfolio/Photos/j9m7guleaptbuew2uihm",
    "https://res.cloudinary.com/dgfe1xsgj/image/upload/f_auto,q_auto/v1/Portfolio/Photos/rh1fhccz4sw7izpyy1uc",
    "https://res.cloudinary.com/dgfe1xsgj/image/upload/f_auto,q_auto/v1/Portfolio/Photos/n2zhusifwz47eufpilmq",
  ]);
  const videoTextureProps = {
    unsuspend: "canplaythrough",
    loop: true,
    muted: true,
  };

  const videoTexture = useVideoTexture(
    "https://res.cloudinary.com/dgfe1xsgj/video/upload/f_auto:video,q_auto/v1/Portfolio/Videos/f0lppekipaxjobit4jen",
    {
      ...videoTextureProps,
      start: isVideoOnePlaying,
    }
  );

  const videoTexture2 = useVideoTexture(
    "https://res.cloudinary.com/dgfe1xsgj/video/upload/f_auto:video,q_auto/v1/Portfolio/Videos/dmp4nnl23fl11yyvsqex",
    {
      ...videoTextureProps,
      start: isVideoTwoPlaying,
    }
  );

  const videoTexture3 = useVideoTexture(
    "https://res.cloudinary.com/dgfe1xsgj/video/upload/f_auto:video,q_auto/v1/Portfolio/Videos/hbmhctwlxvieqacvw0r3",
    {
      ...videoTextureProps,
      start: isVideoThreePlaying,
    }
  );

  const videoTexture4 = useVideoTexture(
    "https://res.cloudinary.com/dgfe1xsgj/video/upload/f_auto:video,q_auto/v1/Portfolio/Videos/ndfytt6vbfiysnril4i4",
    {
      ...videoTextureProps,
      start: isVideoFourPlaying,
    }
  );
  const { size } = useThree();
  const viewport = { width: size.width, height: size.height };
  const planeCoords = {
    planeLeft: { x: viewport.width / 10 > 111 ? -3 : 8, y: -5 },
    planeRight: { x: viewport.width / 10 > 111 ? 27 : 16, y: -5 },
  };

  const planeGroups = [
    [
      {
        position: [planeCoords.planeLeft.x, planeCoords.planeLeft.y, 5],
        material: { map: material1 },
      },
      {
        position: [planeCoords.planeRight.x, planeCoords.planeRight.y, 0],
        material: { map: videoTexture },
      },
    ],
    [
      {
        position: [planeCoords.planeLeft.x, planeCoords.planeLeft.y, -50],
        material: { map: material2 },
      },
      {
        position: [planeCoords.planeRight.x, planeCoords.planeRight.y, -55],
        material: { map: videoTexture2 },
      },
    ],
    [
      {
        position: [planeCoords.planeLeft.x, planeCoords.planeLeft.y, -110],
        material: { map: material3 },
      },
      {
        position: [planeCoords.planeRight.x, planeCoords.planeRight.y, -115],
        material: { map: videoTexture3 },
      },
    ],
    [
      {
        position: [planeCoords.planeLeft.x, planeCoords.planeLeft.y, -160],
        material: { map: material4 },
      },
      {
        position: [planeCoords.planeRight.x, planeCoords.planeRight.y, -165],
        material: { map: videoTexture4 },
      },
    ],
    [
      {
        position: [planeCoords.planeLeft.x, planeCoords.planeLeft.y, -220],
        material: { map: material5 },
      },
      {
        position: [planeCoords.planeRight.x, planeCoords.planeRight.y, -225],
        material: { map: material5 },
      },
    ],
  ];

  useEffect(() => {
    if (scroll.offset >= 0.09 && scroll.offset <= 0.27) {
      setIsVideoOnePlaying(false);
      setIsVideoTwoPlaying(true);
    } else if (scroll.offset >= 0.27 && scroll.offset <= 0.48) {
      setIsVideoTwoPlaying(false);
      setIsVideoThreePlaying(true);
    } else if (scroll.offset >= 0.48 && scroll.offset <= 0.64) {
      setIsVideoThreePlaying(false);
      setIsVideoFourPlaying(true);
    } else {
      setIsVideoOnePlaying(true);
      setIsVideoTwoPlaying(false);
      setIsVideoThreePlaying(false);
      setIsVideoFourPlaying(false);
    }
  }, [scroll.offset]);

  useFrame(() => {
    // Calculate the total distance covered by the planes in the scroll
    const totalDistance = (planeGroups.length - 0.9) * 73;

    // Calculate the adjusted offset to create a seamless loop
    let adjustedOffset = scroll.offset % 2;
    if (adjustedOffset < 0) {
      adjustedOffset += 1;
    }

    // Loop through each plane group and update its position based on the adjusted offset
    ref.current.children.forEach((group, index) => {
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
    const activeInfo = getActiveProject(scroll.offset);
    setActiveProject(activeInfo);
  });

  return (
    <>
      <Minimap planeGroups={planeGroups} />
      <Suspense>
        <group ref={ref}>
          {planeGroups.map((group, index) => (
            <group key={index}>
              {group.map((planeProps, planeIndex) => (
                <Plane key={planeIndex} {...planeProps} />
              ))}
            </group>
          ))}
        </group>
      </Suspense>
      <Text
        visible={projectsSceneActive}
        ref={textRef}
        anchorY="middle"
        font={titleFont}
        color={activeProject.color}
        characters={activeProject.title}
        position={[11, -5, 11]}
        fontSize={
          viewport.width / 10 > 111
            ? (viewport.width / viewport.height) * 3.5
            : (viewport.width / viewport.height) * 3.5
        }
      >
        <MeshTransmissionMaterial
          buffer={renderTargetC.texture}
          depthTest={false}
          depthWrite={false}
          fog={false}
          emissive={activeProject.color}
          transmission={0.8}
          backside
          ior={1.2}
          thickness={2.2}
          anisotropy={0.1}
          chromaticAberration={0.1}
        />
        {activeProject.title}
      </Text>
      {projectsSceneActive && (
        <ProjectDetails viewport={viewport} activeProject={activeProject} />
      )}
    </>
  );
}
