import { useEffect } from "react";

export default function useSceneTransition(progress, location) {
  useEffect(() => {
    const targetProgress = location.pathname === "/projects" ? 2 : -2;
    const duration = 1000; // Duration in milliseconds for the progress to change
    const interval = 40; // Interval time in milliseconds for updating the progress

    let currentProgress = progress.current; // Start from the current progress value
    const increment =
      (targetProgress - currentProgress) / (duration / interval);

    const progressInterval = setInterval(() => {
      currentProgress += increment;
      progress.current = currentProgress;

      if (
        (increment > 0 && currentProgress >= targetProgress) ||
        (increment < 0 && currentProgress <= targetProgress)
      ) {
        clearInterval(progressInterval);
      }
    }, interval);

    return () => clearInterval(progressInterval);
  }, [location.pathname]);
}
