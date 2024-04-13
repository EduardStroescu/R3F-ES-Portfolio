import { Suspense, lazy } from "react";
import Camera from "../Camera.jsx";
import { HomeSceneEnv } from "../Environments.jsx";
import { HomeModel } from "./HomeModel.jsx";
import { WaterComponent } from "./WaterComponent";
import { HomeTitle } from "./HomeTitle";
import Postprocessing from "./Postprocessing";
import { useAppStore } from "../../lib/store.js";
import { useShallow } from "zustand/react/shallow";

const AboutSection = lazy(() => import("./AboutSection.jsx"));
const ContactSection = lazy(() => import("./ContactSection.jsx"));

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
