import Camera from "../Camera";
import { HomeSceneEnv } from "../Environments";
import { useAppStore } from "../../lib/stores/useAppStore";
import { ManualLazyComponent } from "../LazyComponent";
import { useLocation } from "react-router-dom";
import Sun from "./Sun";
import { useGLTF } from "@react-three/drei";
import { memo } from "react";

useGLTF.setDecoderPath("/draco/");

const HomeScene = memo(function HomeScene() {
  return (
    <>
      <HomeSceneEnv />
      <Sun />
      <Camera />
      <HomeSceneContent />
    </>
  );
});

export default HomeScene;

const HomeSceneContent = () => {
  const { pathname } = useLocation();
  const started = useAppStore((state) => state.started);

  return (
    <>
      <ManualLazyComponent
        shouldLoad={started || pathname !== "/projects"}
        delay={pathname !== "/projects" ? 0 : 40000}
        loadComponent={() => import("./HomeSceneEssentials")}
        shouldOuterSuspend={!started}
      />
      <ManualLazyComponent
        shouldLoad={started || pathname === "/"}
        delay={pathname === "/" ? 0 : 40000}
        loadComponent={() => import("./TitleWithCallToAction")}
        shouldOuterSuspend={!started}
      />
      <ManualLazyComponent
        shouldLoad={started && pathname === "/"}
        delay={pathname === "/" ? 250 : 40000}
        loadComponent={() => import("./AboutSection")}
      />
      <ManualLazyComponent
        shouldLoad={started && pathname === "/contact"}
        delay={pathname === "/contact" ? 0 : 40000}
        loadComponent={() => import("./ContactSection")}
        shouldOuterSuspend={!started}
      />
    </>
  );
};
