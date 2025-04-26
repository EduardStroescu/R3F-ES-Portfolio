import { useProgress } from "@react-three/drei";
import { useSpring, a, easings } from "@react-spring/web";
import { useAppStore, useAppStoreActions } from "../lib/stores/useAppStore";
import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useShallow } from "zustand/react/shallow";

export default function LoadingScreen({ suspenseLoading = false }) {
  const started = useAppStore((state) => state.started);
  const { setStarted } = useAppStoreActions();
  const [loaded, setLoaded] = useState(false);

  const progressRef = useRef(0);
  const rafRef = useRef(0);
  const loadCompleteRef = useRef(false); // Ref to track if load is complete

  const { active, progress } = useProgress(
    useShallow((state) => ({
      active: state.active,
      progress: state.progress,
    }))
  );

  useEffect(() => {
    let t;
    // Only update `started` when progress is 100 and `active` becomes false
    if (!active && progress === 100 && !loaded) {
      t = setTimeout(() => {
        setLoaded(true);
        loadCompleteRef.current = true; // Mark as fully loaded
      }, 800); // Adding a slight delay to ensure smooth transition
    } else if (active && loaded && loadCompleteRef.current) {
      // If it becomes active again after the load, mark as not fully loaded
      loadCompleteRef.current = false;
    }
    return () => clearTimeout(t);
  }, [loaded, active, progress]);

  const updateProgress = useCallback(() => {
    progressRef.current += (progress - progressRef.current) / 2;
    if (progressRef.current > 0.95 * progress || progress === 100)
      progressRef.current = progress;
    if (progressRef.current < progress)
      rafRef.current = requestAnimationFrame(updateProgress);
  }, [progress]);

  useEffect(() => {
    updateProgress();
    return () => cancelAnimationFrame(rafRef.current);
  }, [updateProgress]);

  const loadingTextAnimation1 = useSpring({
    from: { opacity: 0 },
    to: { opacity: !loaded || suspenseLoading ? 1 : 0 },
    config: { mass: 5, tension: 500, friction: 80, clamp: true },
  });

  const loadingScreenFadeOut = useSpring({
    from: { opacity: 1 },
    to: {
      opacity: loaded && !suspenseLoading ? 0 : 1,
    },
    config: { duration: 200, easing: easings.easeInOut, clamp: true },
    onRest: (e) => {
      if (e.finished) {
        setStarted(true);
      }
    },
  });

  if (!suspenseLoading && started) return null;

  return (
    <a.div style={loadingScreenFadeOut} className="loading-screen bg-wave">
      <Spinner loaded={loaded} />
      <div className="loading-content">
        <h1 className="loading-title">
          E/S <span>Portfolio</span>
        </h1>
        <a.p style={loadingTextAnimation1} className="loading-subtitle">
          Please wait
        </a.p>
      </div>
    </a.div>
  );
}

function Spinner({ loaded }) {
  const { hueRotation } = useSpring({
    from: { hueRotation: -50 },
    to: { hueRotation: loaded ? 0 : -50 },
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <a.div
      className="spinner-box spinner-box1"
      style={{ backdropFilter: hueRotation.to((h) => `hue-rotate(${h}deg)`) }}
    >
      <div className="configure-border configure-border-1">
        <div className="configure-border configure-border-2">
          <div className="configure-border configure-border-2">
            <div className="configure-border configure-border-1">
              <div className="spinner-box">
                <div className="circle-border circle-border-1">
                  <div className="spinner-box">
                    <div className="circle-border circle-border-1">
                      <a.div
                        className="circle-core bg-wave"
                        style={{
                          filter: hueRotation.to((h) => `hue-rotate(${h}deg)`),
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="configure-border configure-border-2">
        <div className="configure-border configure-border-3">
          <div className="configure-core" />
        </div>
      </div>
      <div className="circle-border circle-border-2">
        <a.div
          className="circle-core bg-wave"
          style={{ filter: hueRotation.to((h) => `hue-rotate(${h}deg)`) }}
        />
      </div>
    </a.div>
  );
}

LoadingScreen.propTypes = {
  suspenseLoading: PropTypes.bool,
};

Spinner.propTypes = {
  loaded: PropTypes.bool.isRequired,
};
