import Camera from "../Camera";
import { HomeSceneEnv } from "../Environments";
import { useAppStore } from "../../lib/stores/useAppStore";
import { ManualLazyComponent } from "../LazyComponent";
import { useShallow } from "zustand/react/shallow";

export default function HomeScene() {
  const { started, activeScene } = useAppStore(
    useShallow((state) => ({
      started: state.started,
      activeScene: state.activeScene,
    }))
  );

  const loadCondition = started || location.pathname !== "/projects";

  return (
    <>
      <Camera position={[5, 0, 26]} />
      <ManualLazyComponent
        shouldLoad={loadCondition}
        delay={location.pathname !== "/projects" ? 0 : 500}
        loadComponent={() => import("./HomeModel")}
      />
      <ManualLazyComponent
        shouldLoad={started || location.pathname === "/"}
        delay={location.pathname !== "/projects" ? 0 : 500}
        loadComponent={() => import("./Sun")}
      />
      <ManualLazyComponent
        shouldLoad={loadCondition}
        delay={location.pathname !== "/projects" ? 0 : 500}
        loadComponent={() => import("./WaterComponent")}
      />
      <ManualLazyComponent
        shouldLoad={started || location.pathname === "/"}
        delay={location.pathname !== "/projects" ? 0 : 500}
        loadComponent={() => import("./HomeTitle")}
      />
      <ManualLazyComponent
        shouldLoad={started || location.pathname === "/"}
        delay={location.pathname === "/" ? 0 : 500}
        loadComponent={() => import("./CallToAction")}
      />
      <HomeSceneEnv />
      {started && activeScene !== "projects" && (
        <>
          <ManualLazyComponent
            shouldLoad={started || location.pathname === "/"}
            delay={location.pathname === "/" ? 0 : 500}
            loadComponent={() => import("./AboutSection")}
          />
          <ManualLazyComponent
            shouldLoad={started || location.pathname === "/contact"}
            delay={location.pathname === "/contact" ? 0 : 500}
            loadComponent={() => import("./ContactSection")}
          />
        </>
      )}
    </>
  );
}
