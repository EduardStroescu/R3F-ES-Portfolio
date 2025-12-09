import { memo } from "react";
import CallToAction from "./CallToAction";
import HomeTitle from "./HomeTitle";

const TitleWithCallToAction = memo(function TitleWithCallToAction() {
  return (
    <>
      <HomeTitle />
      <CallToAction />
    </>
  );
});

export default TitleWithCallToAction;
