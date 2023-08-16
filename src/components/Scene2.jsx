import {
  Html,
  MeshTransmissionMaterial,
  Text,
  useScroll,
  useTexture,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useRef, useState } from "react";
import * as THREE from "three";
import React from "react";

import { projectData } from "../data/projectsData";

const Plane = React.memo(({ position, material }) => {
  const ref = useRef();
  const { viewport } = useThree();

  return (
    <group
      position={position}
      scale-x={viewport.width > 70 ? 1.5 : 0.4}
      scale-y={viewport.width > 70 ? 1.5 : 0.5}
    >
      <mesh ref={ref}>
        <planeGeometry args={[15, 10]} />
        <meshBasicMaterial {...material} fog={true} />
      </mesh>
    </group>
  );
});

const material = new THREE.LineBasicMaterial({
  color: "white",
  depthTest: false,
  depthWrite: false,
});
const geometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0, -0.6, 0),
  new THREE.Vector3(0, 0.6, 0),
]);

const damp = THREE.MathUtils.damp;

function Minimap({ planeGroups }) {
  const ref = useRef();
  const scroll = useScroll();
  useFrame((delta) => {
    ref.current.children.forEach((child, index) => {
      // Give me a value between 0 and 1
      //   starting at the position of my item
      //   ranging across 4 / total length
      //   make it a sine, so the value goes from 0 to 1 to 0.
      const y = scroll.curve(
        index / planeGroups.length - 1.2 / planeGroups.length,
        4 / planeGroups.length
      );
      child.scale.y = damp(child.scale.y, 0.1 + y / 3, 8, 8, delta);
    });
  });
  return (
    <group ref={ref} scale-x={5} scale-y={2} scale-z={5}>
      {planeGroups.map((_, i) => (
        <line
          key={i}
          geometry={geometry}
          material={material}
          position={[i * 0.04 - planeGroups.length * -0.426, 0.7, 4.23]}
        />
      ))}
    </group>
  );
}

export default function Scene2({ active2, textRef, titleFont, renderTargetC }) {
  const [activeProject, setActiveProject] = useState({
    title: null,
    color: null,
    projectDescription: null,
    projectTags: null,
  });
  const scroll = useScroll();
  const ref = useRef();

  const [material1, material2] = useTexture([
    "./models/Material1.jpg",
    "./models/Material2.jpg",
  ]);
  const { viewport } = useThree();

  const planeGroups = [
    [
      {
        position: [viewport.width > 70 ? -3 : 8, 5, 5],
        material: { map: material1 },
      },
      {
        position: [viewport.width > 70 ? 27 : 16, 5, 0],
        material: { map: material2 },
      },
    ],
    [
      {
        position: [viewport.width > 70 ? -3 : 8, 5, -50],
        material: { map: material2 },
      },
      {
        position: [viewport.width > 70 ? 27 : 16, 5, -55],
        material: { map: material1 },
      },
    ],
    [
      {
        position: [viewport.width > 70 ? -3 : 8, 5, -110],
        material: { map: material1 },
      },
      {
        position: [viewport.width > 70 ? 27 : 16, 5, -115],
        material: { map: material2 },
      },
    ],
    [
      {
        position: [viewport.width > 70 ? -3 : 8, 5, -160],
        material: { map: material2 },
      },
      {
        position: [viewport.width > 70 ? 27 : 16, 5, -165],
        material: { map: material1 },
      },
    ],
    [
      {
        position: [viewport.width > 70 ? -3 : 8, 5, -220],
        material: { map: material1 },
      },
      {
        position: [viewport.width > 70 ? 27 : 16, 5, -225],
        material: { map: material2 },
      },
    ],
  ];

  const getActiveProject = useCallback((offset) => {
    if (offset <= -0.8 && offset <= 0.09) {
      return {
        title: projectData.titles[0],
        color: projectData.titleColors[0],
        projectDescription: projectData.projectDescriptions[0],
        projectTags: projectData.projectTags[0],
      };
    } else if (offset >= 0.09 && offset <= 0.27) {
      return {
        title: projectData.titles[1],
        color: projectData.titleColors[1],
        projectDescription: projectData.projectDescriptions[1],
        projectTags: projectData.projectTags[1],
      };
    } else if (offset >= 0.27 && offset <= 0.48) {
      return {
        title: projectData.titles[2],
        color: projectData.titleColors[2],
        projectDescription: projectData.projectDescriptions[2],
        projectTags: projectData.projectTags[2],
      };
    } else if (offset >= 0.48 && offset <= 0.64) {
      return {
        title: projectData.titles[3],
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
        color: projectData.titleColors[0],
        projectDescription: projectData.projectDescriptions[0],
        projectTags: projectData.projectTags[0],
      };
    }
  });

  useFrame(() => {
    const activeInfo = getActiveProject(scroll.offset);
    setActiveProject(activeInfo);
  });

  useFrame((state, delta) => {
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
  });

  return (
    <>
      <Minimap planeGroups={planeGroups} />
      <group ref={ref}>
        {planeGroups.map((group, index) => (
          <group key={index}>
            {group.map((planeProps, planeIndex) => (
              <Plane key={planeIndex} {...planeProps} />
            ))}
          </group>
        ))}
      </group>
      <Text
        visible={active2}
        ref={textRef}
        anchorY="middle"
        font={titleFont}
        color={activeProject.color}
        characters={activeProject.title}
        position={[11, 5, 11]}
        fontSize={viewport.width > 70 ? 13 : 4}
      >
        {/* <shaderMaterial
               uniforms={{
                tDiffuse: { value: renderTargetC.texture }
              }}
              fog={false}
              depthTest={false}
              depthWrite={false}
              transparent
              vertexShader={textVertexShader}
              fragmentShader={textFragmentShader}
              /> */}
        <MeshTransmissionMaterial
          buffer={renderTargetC.texture}
          depthTest={false}
          depthWrite={false}
          fog={false}
          emissive={activeProject.color}
          transmission={0.8}
          // color={[0.5, 0, 0]}
          backside
          ior={1.2}
          thickness={2.2}
          anisotropy={0.1}
          chromaticAberration={0.1}
        />
        {activeProject.title}
      </Text>
      {active2 ? (
        <Html
          transform
          pointerEvents={"none"}
          fullscreen
          style={{ pointerEvents: "none" }}
          as="projects-html"
          scale={viewport.width > 70 ? 1.1 : 1}
          position={[11, viewport.width > 70 ? -2 : -1.1, 15]}
          wrapperClass="m-0 p-0 box-border font-[titleFont] text-white overflow-hidden"
        >
          <footer
            // style={{ transform: "scale(1)" }}
            className="text-md w-[110vw] sm:w-[100vw] md:w-[110vw] xl:w-[80vw] 2xl:w-[60vw] sm:h-[10rem] flex flex-col justify-center items-center"
          >
            <div className="absolute top-[75%]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width={viewport.width > 70 ? 40.903 : 50.903}
                height="47.395"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M12 6V14"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M15 11L12 14L9 11"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
              <p className="text-center text-lg sm:text-sm">Scroll</p>
            </div>
            <div className="flex flex-row justify-center align-center pb-2 sm:pb-6">
              <button className="pointer-events-auto text-black bg-white border-white rounded-full mb-2 flex flex-row justify-center align-center my-[2px] mr-12">
                <span className="hoverShadow hover:text-[#f597e8] text-md pl-2">
                  View Live
                </span>
                <span className="pr-2 pt-[3px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z" />
                  </svg>
                </span>
              </button>
              <button className="pointer-events-auto text-black bg-white border-white rounded-full mb-2 flex flex-row justify-center align-center my-[2px] ml-12">
                <span className="hoverShadow hover:text-[#f597e8] text-md pl-2">
                  View Code
                </span>
                <span className="text-black pl-2 pr-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="black"
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <div className="flex text-white w-full h-full flex-row justify-around items-center gap-x-[25%] sm:gap-x-[40%] md:gap-x-[25%]">
              <div className="w-1/2 sm:w-1/3 h-full flex flex-row justify-end mb-4">
                <ul
                  className="flex flex-wrap justify-end items-center"
                  aria-label="Technologies used"
                >
                  {activeProject.projectTags.map((tag, index) => (
                    <li key={index} className="mr-1.5 mt-2">
                      <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">
                        {tag}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-1/2 sm:w-1/3 h-full flex flex-row justify-start self-center mb-0">
                <p className="flex items-center bg-teal-400/10 px-2 py-1 text-sm font-medium text-teal-300 text-center ">
                  {activeProject.projectDescription}
                  {/* Freelancing project and a personal experiment consisting in a
                  small E-Commerce Website that seamlessly merges 3D and
                  Headless Shopify to deliver an interactive customer
                  experience. */}
                </p>
              </div>
            </div>
          </footer>
        </Html>
      ) : null}
    </>
  );
}
