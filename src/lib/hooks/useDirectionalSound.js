import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSoundStoreActions } from "../stores/useSoundStore";
import { setupAmbientSoundListener } from "../helpers/setupAmbientSoundListener";
import { useWindowVisibility } from "./useWindowVisibility";

export function useDirectionalSound() {
  const location = useLocation();
  const { modifySoundSetting, playAmbientSound, pauseAmbientSound } =
    useSoundStoreActions();
  const isWindowActive = useWindowVisibility();

  useEffect(() => {
    if (isWindowActive === false) {
      pauseAmbientSound();
    } else if (isWindowActive === true) {
      playAmbientSound();
    }
  }, [isWindowActive, pauseAmbientSound, playAmbientSound]);

  useEffect(() => {
    const cleanupListener = setupAmbientSoundListener();

    // Cleanup function to remove listener
    return () => {
      cleanupListener();
    };
  }, []);

  useEffect(() => {
    if (location.pathname === "/projects") {
      modifySoundSetting({
        soundInstanceName: "ambientSound",
        settingType: "pos",
        settingValue: [0, 3, 0],
      });
      modifySoundSetting({
        soundInstanceName: "ambientSound",
        settingType: "orientation",
        settingValue: [0, -1, 0],
      });
    } else {
      modifySoundSetting({
        soundInstanceName: "ambientSound",
        settingType: "pos",
        settingValue: [0, 0, 1],
      });
      modifySoundSetting({
        soundInstanceName: "ambientSound",
        settingType: "orientation",
        settingValue: [0, 0, 0],
      });
    }
  }, [location.pathname, modifySoundSetting]);
}
