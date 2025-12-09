import { useEffect, useState } from "react";
import { ManualLazyComponent } from "./LazyComponent";
import { useAppStore } from "../lib/stores/useAppStore";
import { useShallow } from "zustand/react/shallow";

export const PostprocessingWrapper = (props) => {
  const { started, viewportWidth } = useAppStore(
    useShallow((state) => ({
      started: state.started,
      viewportWidth: state.viewportWidth,
    }))
  );

  const [composerEnabled, setComposerEnabled] = useState(
    () => viewportWidth >= 768
  );

  useEffect(() => {
    setComposerEnabled((prev) => {
      if (prev === true) return prev;
      return viewportWidth >= 768;
    });
  }, [viewportWidth]);

  if (!composerEnabled) return null;

  return (
    <ManualLazyComponent
      shouldLoad={composerEnabled}
      delay={0}
      loadComponent={() => import("./Postprocessing")}
      shouldOuterSuspend={!started}
      {...props}
    />
  );
};
