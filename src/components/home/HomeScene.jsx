import Camera from "../Camera";
import { HomeSceneEnv } from "../Environments";
import { useAppStore } from "../../lib/stores/useAppStore";
import { ManualLazyComponent } from "../LazyComponent";
import { useShallow } from "zustand/react/shallow";
import { useLocation } from "react-router-dom";
import Sun from "./Sun";

export default function HomeScene() {
  const { pathname } = useLocation();
  const { started, activeScene } = useAppStore(
    useShallow((state) => ({
      started: state.started,
      activeScene: state.activeScene,
    }))
  );

  const loadCondition = started || pathname !== "/projects";

  return (
    <>
      <Camera position={[5, 0, 26]} />
      <ManualLazyComponent
        shouldLoad={loadCondition}
        delay={pathname !== "/projects" ? 0 : 500}
        loadComponent={() => import("./HomeModel")}
      />
      <Sun />
      <ManualLazyComponent
        shouldLoad={loadCondition}
        delay={pathname !== "/projects" ? 0 : 500}
        loadComponent={() => import("./WaterComponent")}
      />
      <ManualLazyComponent
        shouldLoad={started || pathname === "/"}
        delay={pathname !== "/projects" ? 0 : 500}
        loadComponent={() => import("./HomeTitle")}
      />
      <ManualLazyComponent
        shouldLoad={started || pathname === "/"}
        delay={pathname === "/" ? 0 : 500}
        loadComponent={() => import("./CallToAction")}
      />
      <HomeSceneEnv />
      {started && activeScene !== "projects" && (
        <>
          <ManualLazyComponent
            shouldLoad={started || pathname === "/"}
            delay={pathname === "/" ? 0 : 500}
            loadComponent={() => import("./AboutSection")}
          />
          <ManualLazyComponent
            shouldLoad={started || pathname === "/contact"}
            delay={pathname === "/contact" ? 0 : 500}
            loadComponent={() => import("./ContactSection")}
          />
        </>
      )}
    </>
  );
}
