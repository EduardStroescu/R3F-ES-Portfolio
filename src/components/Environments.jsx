/* eslint-disable react/no-unknown-property */
import { Environment } from "@react-three/drei";

export function ProjectsSceneEnv() {
  return (
    <>
      <Environment
        files={
          "https://res.cloudinary.com/dgfe1xsgj/raw/upload/v1/Portfolio/Environment/o1aavxxiq6alk6xvwdmp.hdr"
        }
        background={false}
      />
      <color attach="background" args={["black"]} />
      <fog attach="fog" args={["#191920", 0, 55]} />
    </>
  );
}

export function HomeSceneEnv() {
  return (
    <>
      <Environment
        files={
          "https://res.cloudinary.com/dgfe1xsgj/raw/upload/v1/Portfolio/Environment/qldpzf7hd4mid2444htq.hdr"
        }
        background={"only"}
      />
      <Environment
        files={
          "https://res.cloudinary.com/dgfe1xsgj/raw/upload/v1/Portfolio/Environment/o1aavxxiq6alk6xvwdmp.hdr"
        }
        background={false}
      />
    </>
  );
}
