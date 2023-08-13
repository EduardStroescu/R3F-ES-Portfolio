import React, {
  createContext,
  useCallback,
  useContext,
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
  // Initialize Howler globally with options

  const location = useLocation();
  const [flipped, setFlipped] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isMessageSent, setMessageSent] = useState(false);
  const [isAudioEnabled, setAudioEnabled] = useState(true);

  const hoverSound = useMemo(() => {
    return new Howl({
      src: [mySound, fallbackSound],
      autoplay: false,
      sprite: {
        hover: [47500, 1000],
      },
    });
  }, []);

  const ambientSound = useMemo(() => {
    return new Howl({
      src: [mySound, fallbackSound],
      autoplay: false,
      sprite: {
        ambient: [0, 30000, true],
      },
      volume: 0.5,
    });
  }, []);

  const transitionSound = useMemo(() => {
    return new Howl({
      src: [mySound, fallbackSound],
      autoplay: false,
      sprite: {
        transition: [33000, 4000],
      },
    });
  }, []);

  const underwaterTransitionSound = useMemo(() => {
    return new Howl({
      src: [mySound, fallbackSound],
      autoplay: false,
      sprite: {
        underwaterTransition: [44000, 2000],
      },
    });
  }, []);

  const playHoverSound = useCallback(() => {
    hoverSound.play("hover");
  }, [hoverSound]);

  const playAmbientSound = useCallback(() => {
    ambientSound.play("ambient");
  }, [ambientSound]);

  const playTransitionSound = useCallback(() => {
    transitionSound.play("transition");
  }, [transitionSound]);

  const playUnderwaterTransitionSound = useCallback(() => {
    underwaterTransitionSound.play("underwaterTransition");
  }, [underwaterTransitionSound]);

  const switchAudio = useCallback(() => {
    if (isAudioEnabled) {
      hoverSound.stop();
      hoverSound.volume(0);
      ambientSound.stop();
      ambientSound.volume(0);
      transitionSound.stop();
      transitionSound.volume(0);
      underwaterTransitionSound.stop();
      underwaterTransitionSound.volume(0);
    } else {
      hoverSound.volume(1);
      ambientSound.play("ambient");
      ambientSound.volume(0.5);
      transitionSound.volume(1);
      underwaterTransitionSound.volume(1);
    }
  }, [
    isAudioEnabled,
    hoverSound,
    ambientSound,
    transitionSound,
    underwaterTransitionSound,
  ]);

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
      setMessageSent,
      playHoverSound,
      playAmbientSound,
      playTransitionSound,
      playUnderwaterTransitionSound,
      switchAudio,
      isAudioEnabled,
      setAudioEnabled,
    }),
    [
      location,
      flipped,
      visible,
      isMessageSent,
      playHoverSound,
      playAmbientSound,
      playTransitionSound,
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
