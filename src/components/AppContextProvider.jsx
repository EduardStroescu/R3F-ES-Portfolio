import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import mySound from "/audios/audio.webm";
import fallbackSound from "/audios/audio.mp3";
import { Howl, Howler } from "howler";

const appContext = createContext();

export const useAppContext = () => useContext(appContext);

export function AppContextProvider({ children }) {
  const location = useLocation();
  const [flipped, setFlipped] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isMessageSent, setMessageSent] = useState(false);
  const [isMessageReceived, setMessageReceived] = useState(false);
  const [isAudioEnabled, setAudioEnabled] = useState(true);

  // Initialize location.state.data for first load
  useEffect(() => {
    if (!location.state) {
      location.state = { data: location.pathname };
    }
  }, [location, location.state]);

  Howler.autoUnlock = false;

  const hoverSound = useMemo(() => {
    return new Howl({
      src: [mySound, fallbackSound],
      autoplay: false,
      sprite: {
        hover: [166300, 500],
      },
      volume: 0.2,
    });
  }, []);

  const ambientSound = useMemo(() => {
    return new Howl({
      src: [mySound, fallbackSound],
      autoplay: false,
      sprite: {
        ambient: [0, 148000, true],
      },
      volume: 0.9,
    });
  }, []);

  const transitionSound = useMemo(() => {
    return new Howl({
      src: [mySound, fallbackSound],
      autoplay: false,
      sprite: {
        transition: [151300, 4000],
      },
    });
  }, []);

  const menuOpenCloseSound = useMemo(() => {
    return new Howl({
      src: [mySound, fallbackSound],
      autoplay: false,
      sprite: {
        menuOpenClose: [157500, 1000],
      },
    });
  }, []);

  const menuFlipSound = useMemo(() => {
    return new Howl({
      src: [mySound, fallbackSound],
      autoplay: false,
      sprite: {
        menuFlip: [161000, 2000],
      },
    });
  }, []);

  const underwaterTransitionSound = useMemo(() => {
    return new Howl({
      src: [mySound, fallbackSound],
      autoplay: false,
      sprite: {
        underwaterTransition: [163000, 3200],
      },
    });
  }, []);

  const playHoverSound = useCallback(() => {
    hoverSound.play("hover");
  }, [hoverSound]);

  const playAmbientSound = useCallback(() => {
    ambientSound.play("ambient");
  }, [ambientSound]);

  useEffect(() => {
    if (location.pathname === "/projects") {
      ambientSound.pos(0, 10, 0);
      ambientSound.orientation(0, -10, 0);
    } else ambientSound.pos(0, 0, 5);
    ambientSound.orientation(0, 0, 0);
  }, [location.pathname, ambientSound]);

  const playTransitionSound = useCallback(() => {
    transitionSound.play("transition");
  }, [transitionSound]);

  const playMenuOpenCloseSound = useCallback(() => {
    menuOpenCloseSound.play("menuOpenClose");
  }, [menuOpenCloseSound]);

  const playMenuFlipSound = useCallback(() => {
    menuFlipSound.play("menuFlip");
  }, [menuFlipSound]);

  const playUnderwaterTransitionSound = useCallback(() => {
    underwaterTransitionSound.play("underwaterTransition");
  }, [underwaterTransitionSound]);

  const switchAudio = useCallback(() => {
    if (isAudioEnabled) {
      Howler.stop();
      Howler.volume(0);
    } else {
      Howler.volume(0.5);
      ambientSound.play("ambient");
    }
  }, [isAudioEnabled, ambientSound]);

  // console.log(location.state.data);
  // if (
  //   location.state.data === "/R3F-ES-Portofolio/projects" &&
  //   location.pathname === "/R3F-ES-Portofolio/"
  // ) {
  //   playUnderwaterTransitionSound();
  // } else {
  //   console.log("hello");
  // }

  const contextValues = React.useMemo(
    () => ({
      location,
      flipped,
      setFlipped,
      visible,
      setVisible,
      isMessageSent,
      isMessageReceived,
      setMessageSent,
      setMessageReceived,
      playHoverSound,
      playAmbientSound,
      playTransitionSound,
      playMenuOpenCloseSound,
      playMenuFlipSound,
      playUnderwaterTransitionSound,
      switchAudio,
      isAudioEnabled,
      setAudioEnabled,
    }),
    [
      location,
      flipped,
      setFlipped,
      visible,
      setVisible,
      isMessageSent,
      isMessageReceived,
      setMessageSent,
      setMessageReceived,
      playHoverSound,
      playAmbientSound,
      playTransitionSound,
      playMenuOpenCloseSound,
      playMenuFlipSound,
      playUnderwaterTransitionSound,
      switchAudio,
      isAudioEnabled,
      setAudioEnabled,
    ]
  );

  return (
    <appContext.Provider value={contextValues}>{children}</appContext.Provider>
  );
}
