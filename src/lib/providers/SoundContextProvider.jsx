import { createContext, useContext, useEffect } from "react";
import { Howl, Howler } from "howler";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const soundContext = createContext();

export const useSoundContext = () => useContext(soundContext);

const hoverSound = new Howl({
  src: [
    "https://res.cloudinary.com/dgfe1xsgj/video/upload/v1705318256/Portfolio/Audio/vpyhhqd4mptue9miv1em.webm",
    "https://res.cloudinary.com/dgfe1xsgj/video/upload/v1705318256/Portfolio/Audio/vhabkhwneipxqm0zk4xs.mp3",
  ],
  autoplay: false,
  sprite: {
    hover: [166300, 500],
  },
  volume: 0.2,
});

const ambientSound = new Howl({
  src: [
    "https://res.cloudinary.com/dgfe1xsgj/video/upload/v1705318256/Portfolio/Audio/vpyhhqd4mptue9miv1em.webm",
    "https://res.cloudinary.com/dgfe1xsgj/video/upload/v1705318256/Portfolio/Audio/vhabkhwneipxqm0zk4xs.mp3",
  ],
  autoplay: false,
  sprite: {
    ambient: [0, 148000, true],
  },
  volume: 0.9,
});

const howlerSprite = new Howl({
  src: [
    "https://res.cloudinary.com/dgfe1xsgj/video/upload/v1705318256/Portfolio/Audio/vpyhhqd4mptue9miv1em.webm",
    "https://res.cloudinary.com/dgfe1xsgj/video/upload/v1705318256/Portfolio/Audio/vhabkhwneipxqm0zk4xs.mp3",
  ],
  autoplay: false,
  sprite: {
    transition: [151300, 4000],
    menuOpenClose: [157500, 1000],
    menuFlip: [161000, 2000],
    underwaterTransition: [163000, 3200],
  },
});

export function SoundContextProvider({ children }) {
  const location = useLocation();

  Howler.autoUnlock = false;

  const playHoverSound = () => {
    hoverSound.play("hover");
  };

  const playAmbientSound = () => {
    ambientSound.play("ambient");
  };

  useEffect(() => {
    if (location.pathname === "/projects") {
      ambientSound.pos(0, 15, 0);
      ambientSound.orientation(0, -10, 0);
    } else ambientSound.pos(0, 0, 5);
    ambientSound.orientation(0, 0, 0);
  }, [location.pathname]);

  const playTransitionSound = () => {
    howlerSprite.play("transition");
  };

  const playMenuOpenCloseSound = () => {
    howlerSprite.play("menuOpenClose");
  };

  const playMenuFlipSound = () => {
    howlerSprite.play("menuFlip");
  };

  const playUnderwaterTransitionSound = () => {
    howlerSprite.play("underwaterTransition");
  };

  const contextValues = {
    playHoverSound,
    playAmbientSound,
    playTransitionSound,
    playMenuOpenCloseSound,
    playMenuFlipSound,
    playUnderwaterTransitionSound,
  };

  return (
    <soundContext.Provider value={contextValues}>
      {children}
    </soundContext.Provider>
  );
}

SoundContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
