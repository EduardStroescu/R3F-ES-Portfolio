/* eslint-disable react/no-unknown-property */
import { Environment } from "@react-three/drei";
import { useDeferredValue, useMemo } from "react";
import { useAppStore } from "../lib/stores/useAppStore";

export function ProjectsSceneEnv() {
  return (
    <>
      <color attach="background" args={["black"]} />
      <fog attach="fog" args={["#191920", 0, 55]} />
    </>
  );
}

export function HomeSceneEnv() {
  const viewportWidth = useAppStore((state) => state.viewportWidth);

  const files = useMemo(
    () => [
      viewportWidth >= 1024
        ? "/environments/qldpzf7hd4mid2444htq-v1.webp"
        : "/environments/qldpzf7hd4mid2444htq-sm-v1.webp",
      "/environments/qldpzf7hd4mid2444htq-gainmap-v1.webp",
      "/environments/qldpzf7hd4mid2444htq-v1.json",
    ],
    [viewportWidth]
  );
  const deferred = useDeferredValue(files);
  return (
    <>
      <Environment files={deferred} background={"only"} />
      <Environment
        files={[
          "/environments/o1aavxxiq6alk6xvwdmp-v1.webp",
          "/environments/o1aavxxiq6alk6xvwdmp-gainmap-v1.webp",
          "/environments/o1aavxxiq6alk6xvwdmp-v1.json",
        ]}
        background={false}
      />
    </>
  );
}
