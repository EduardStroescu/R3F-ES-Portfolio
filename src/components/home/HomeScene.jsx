import { Suspense } from "react";
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

  const loadCondition =
    started || location.pathname === "/" || location.pathname === "/contact";

  return (
    <>
      <Camera position={[5, 0, 26]} />
      <Suspense fallback={null}>
        <ManualLazyComponent
          shouldLoad={loadCondition}
          delay={location.pathname !== "/projects" ? 0 : 500}
          loadComponent={() => import("./HomeModel")}
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
      </Suspense>
      <HomeSceneEnv />
      {started && activeScene !== "projects" && (
        <Suspense fallback={null}>
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
        </Suspense>
      )}
      <ManualLazyComponent
        shouldLoad={started || location.pathname === "/"}
        delay={location.pathname !== "/projects" ? 0 : 500}
        loadComponent={() => import("./Sun")}
      />
    </>
  );
}
