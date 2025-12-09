import { useEffect } from "react";
import { useAppStoreActions } from "../lib/stores/useAppStore";

export function ViewportSync() {
  const { setViewportWidth, setViewportHeight } = useAppStoreActions();

  useEffect(() => {
    let timeout;
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setViewportWidth(window.innerWidth);
        setViewportHeight(window.innerHeight);
      }, 120); // throttle to 120ms
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setViewportHeight, setViewportWidth]);

  return null;
}
