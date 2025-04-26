import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { ManualLazyComponent } from "./LazyComponent";
import { useAppStore } from "../lib/stores/useAppStore";

export const PostprocessingWrapper = (props) => {
  const started = useAppStore((state) => state.started);
  const { size } = useThree();
  const viewport = { width: size.width };
  const [composerEnabled, setComposerEnabled] = useState(
    () => viewport.width >= 768
  );

  useEffect(() => {
    setComposerEnabled((prev) => {
      if (prev === true) return prev;
      return viewport.width >= 768;
    });
  }, [viewport.width]);

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
