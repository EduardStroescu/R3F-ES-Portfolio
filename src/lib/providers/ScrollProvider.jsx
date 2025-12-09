import { createContext, useRef, useContext, useEffect } from "react";
import { addEffect } from "@react-three/fiber";
import Lenis from "@studio-freight/lenis";
import PropTypes from "prop-types";

function lerp(a, b, t) {
  return a + (b - a) * t;
}

const scrollContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useScrollContext = () => {
  const context = useContext(scrollContext);
  if (context === undefined) {
    throw new Error("useScrollContext must be used within a ScrollProvider");
  }
  return context;
};

const scroll = {
  progress: 0,
  direction: 0,
  velocity: 0,
  influence: 0,

  // Calculate range between from and distance with optional margin
  range(from, distance, margin = 0) {
    const start = from - margin;
    const end = start + distance + margin * 2;
    return this.progress < start
      ? 0
      : this.progress > end
      ? 1
      : (this.progress - start) / (end - start);
  },

  // Calculate a smooth curve for a range between from and distance
  curve(from, distance, margin = 0) {
    return Math.sin(this.range(from, distance, margin) * Math.PI);
  },
};

export function ScrollProvider({ children }) {
  const content = useRef(null);
  const wrapper = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      wrapper: wrapper.current,
      content: content.current,
      lerp: 0.02,
      direction: "vertical", // vertical, horizontal
      gestureDirection: "vertical", // vertical, horizontal, both
      smooth: true,
      smoothTouch: true,
      touchMultiplier: 1,
      infinite: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ({ progress, velocity, direction }) => {
      scroll.progress = progress;
      scroll.velocity = velocity;
      scroll.direction = direction;
    });

    const effectSub = addEffect((time) => {
      lenis.raf(time);
      scroll.influence = lerp(
        scroll.influence,
        Math.abs(scroll.velocity),
        0.12
      );
    });
    return () => {
      effectSub();
      lenis.destroy();
    };
  }, []);

  return (
    <div
      ref={wrapper}
      style={{
        position: "absolute",
        zIndex: 100,
        overflow: "hidden",
        width: "100%",
        height: "100%",
        top: 0,
      }}
    >
      <div
        ref={content}
        style={{
          position: "relative",
          minHeight: "400vh",
          overflowX: "hidden",
        }}
      >
        <div className="w-full h-full fixed top-0 left-0">
          <scrollContext.Provider value={{ scroll, lenisRef }}>
            {children}
          </scrollContext.Provider>
        </div>
      </div>
    </div>
  );
}

ScrollProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
