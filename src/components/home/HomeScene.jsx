import { Suspense, lazy } from "react";
import Camera from "../Camera";
import { HomeSceneEnv } from "../Environments";
import { HomeModel } from "./HomeModel";
import { WaterComponent } from "./WaterComponent";
import { HomeTitle } from "./HomeTitle";
import Postprocessing from "./Postprocessing";
import { useAppStore } from "../../lib/stores/useAppStore";
import { useShallow } from "zustand/react/shallow";

const AboutSection = lazy(() => import("./AboutSection"));
const ContactSection = lazy(() => import("./ContactSection"));

export default function HomeScene() {
  const { started, homeSceneActive } = useAppStore(
    useShallow((state) => ({
      started: state.started,
      homeSceneActive: state.homeSceneActive,
    }))
  );

  return (
    <>
      <Camera position={[5, 0, 26]} />
      <HomeModel />
      <HomeTitle />
      <WaterComponent />
      <HomeSceneEnv />
      {started && homeSceneActive && (
        <Suspense fallback={null}>
          <AboutSection />
          <ContactSection />
        </Suspense>
      )}
      <Postprocessing />
    </>
  );
}
