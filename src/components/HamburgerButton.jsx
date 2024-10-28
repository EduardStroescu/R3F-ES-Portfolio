import { a, useSpring } from "@react-spring/web";
import PropTypes from "prop-types";
import { useSoundStoreActions } from "../lib/stores/useSoundStore";

export function HamburgerButton({ menuOpen, setMenuOpen }) {
  const { playMenuOpenCloseSound } = useSoundStoreActions();

  const {
    backgroundColor,
    svgColor,
    rotateSvg,
    transformTop,
    opacityMiddle,
    transformBottom,
    circleRadius,
  } = useSpring({
    rotateSvg: menuOpen ? "rotate(1080deg)" : "rotate(0deg)",
    svgColor: menuOpen ? "#f1edeb" : "#212121",
    backgroundColor: menuOpen ? "#212121" : "#f1edeb",
    transformTop: menuOpen
      ? "rotate(45deg) translate(-15px, 0px)"
      : "rotate(0deg) translate(0px, 0px)",
    opacityMiddle: menuOpen ? 0 : 1,
    transformBottom: menuOpen
      ? "rotate(-45deg) translate(-15px, 10px)"
      : "rotate(0deg) translate(0px, 0px)",
    circleRadius: menuOpen ? 0 : 282.74,

    config: { mass: 5, tension: 400, friction: 70, precision: 0.0001 },
  });

  const handleClick = () => {
    setMenuOpen((s) => !s);
    playMenuOpenCloseSound();
  };

  return (
    <a.button
      onClick={handleClick}
      className="absolute z-[50] right-4 rounded-full p-0.5 pointer-events-auto"
      style={{ backgroundColor }}
      aria-label="Toggle menu"
      title="Toggle menu"
    >
      <a.svg
        style={{ fill: svgColor, transform: rotateSvg }}
        width="24"
        height="24"
        viewBox="-20 0 140 75"
      >
        <a.circle
          cx="50"
          cy="38"
          r="45" // Radius of the circle
          strokeDasharray={circleRadius}
          strokeDashoffset={circleRadius}
          stroke="white"
          strokeWidth="5"
          fill="none"
        />
        {/* Top Line */}
        <a.rect
          rx="5"
          width="90"
          height="6"
          x="5"
          className="origin-left"
          style={{ transform: transformTop }}
        />

        {/* Middle Line */}
        <a.rect
          y="30"
          x="5"
          width="90"
          height="6"
          rx="5"
          style={{ opacity: opacityMiddle }}
        />

        {/* Bottom Line */}
        <a.rect
          y="60"
          x="5"
          width="90"
          height="6"
          rx="5"
          className="origin-left"
          style={{
            transform: transformBottom,
          }}
        />
      </a.svg>
    </a.button>
  );
}

HamburgerButton.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
};
