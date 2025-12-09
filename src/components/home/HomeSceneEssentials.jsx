import { memo } from "react";
import HomeModel from "./HomeModel";
import WaterComponent from "./WaterComponent";

const HomeSceneEssentials = memo(function HomeSceneEssentials() {
  return (
    <>
      <HomeModel />
      <WaterComponent />
    </>
  );
});

export default HomeSceneEssentials;
