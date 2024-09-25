import { Suspense, useMemo } from "react";
import Camera from "../Camera";
import { HomeSceneEnv } from "../Environments";
import Postprocessing from "./Postprocessing";
import { useAppStore } from "../../lib/stores/useAppStore";
import { useShallow } from "zustand/react/shallow";
import { ManualLazyComponent } from "../LazyComponent";

export default function HomeScene() {
  const { started, homeSceneActive } = useAppStore(
    useShallow((state) => ({
      started: state.started,
      homeSceneActive: state.homeSceneActive,
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
      {started && homeSceneActive && (
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
      <Postprocessing />
    </>
  );
}
