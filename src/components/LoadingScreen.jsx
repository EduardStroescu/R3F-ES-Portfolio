import { useProgress } from "@react-three/drei";
import { useSpring, a } from "@react-spring/web";
import { useAppStore, useAppStoreActions } from "../lib/stores/useAppStore";
import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

export default function LoadingScreen({ suspenseLoading }) {
  const started = useAppStore((state) => state.started);
  const { setStarted } = useAppStoreActions();
  const [loaded, setLoaded] = useState(false);

  const progressRef = useRef(0);
  const rafRef = useRef(0);
  const loadCompleteRef = useRef(false); // Ref to track if load is complete

  const { active, progress } = useProgress();

  useEffect(() => {
    let t;
    // Only update `started` when progress is 100 and `active` becomes false
    if (!active && progress === 100 && !loaded) {
      t = setTimeout(() => {
        setLoaded(true);
        loadCompleteRef.current = true; // Mark as fully loaded
      }, 2000); // Adding a slight delay to ensure smooth transition
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
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const loadingScreenFadeOut = useSpring({
    from: { opacity: 1 },
    to: {
      opacity: loaded ? 0 : 1,
    },
    config: { mass: 5, tension: 500, friction: 80 },
    delay: 500,
    onRest: (e) => {
      if (e.finished) {
        setStarted(true);
      }
    },
  });

  const { hueRotation } = useSpring({
    from: { hueRotation: -50 },
    to: { hueRotation: loaded ? 0 : -50 },
    config: { mass: 5, tension: 500, friction: 80 },
  });

  if (started) return null;

  return (
    <a.div style={loadingScreenFadeOut} className="loadingScreen">
      <Spinner hueRotation={hueRotation} />
      <div className="absolute inset-0 flex flex-col gap-4 lg:gap-16 justify-center items-center">
        <h1 className="titleColor font-extrabold uppercase text-[15vw] lg:text-[10vw] landscape:text-[13dvh] flex flex-col whitespace-nowrap leading-none tracking-wider">
          E/S <span>Portfolio</span>
        </h1>
        <a.p
          style={loadingTextAnimation1}
          className="text-[6vw] md:text-[5vw] landscape:text-[3dvh] lg:text-4xl font-bold text-white"
        >
          Please wait
        </a.p>
      </div>
    </a.div>
  );
}

function Spinner({ hueRotation }) {
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
                <div className="circle-border circle-border1">
                  <a.div
                    className="circle-core"
                    style={{
                      filter: hueRotation.to((h) => `hue-rotate(${h}deg)`),
                    }}
                  />
                  <div className="spinner-box">
                    <div className="circle-border circle-border1">
                      <a.div
                        className="circle-core"
                        style={{
                          filter: hueRotation.to((h) => `hue-rotate(${h}deg)`),
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="configure-core" />
            </div>
          </div>
        </div>
      </div>
      <div className="configure-border configure-border-2">
        <div className="configure-border configure-border-3">
          <div className="configure-core" />
        </div>
      </div>
      <div className="circle-border circle-border2">
        <a.div
          className="circle-core"
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
  hueRotation: PropTypes.object,
};
