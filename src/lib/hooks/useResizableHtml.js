import { useAppStore } from "../stores/useAppStore";
import { useShallow } from "zustand/react/shallow";

export function useResizableHtml() {
  return useAppStore(
    useShallow((state) => {
      const heightFactor = 1 / (state.viewportHeight / 1500);
      const scale = Math.max(1.8, Math.min(5, heightFactor));

      return {
        scale: scale,
        viewportWidth: state.viewportWidth,
        viewportHeight: state.viewportHeight,
      };
    })
  );
}
