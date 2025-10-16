import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useSoundStoreActions } from "../stores/useSoundStore";
import { setupAmbientSoundListener } from "../helpers/setupAmbientSoundListener";
import { useWindowVisibility } from "./useWindowVisibility";

const SOUND_SETTINGS = {
  projects: {
    pos: [0, 3, 0],
    orientation: [0, -1, 0],
  },
  default: {
    pos: [0, 0, 1],
    orientation: [0, 0, 0],
  },
};

export function useDirectionalSound() {
  const { pathname } = useLocation();
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
    return setupAmbientSoundListener();
  }, []);

  // Memoize the current settings based on pathname
  const currentSettings = useMemo(() => {
    return pathname === "/projects"
      ? SOUND_SETTINGS.projects
      : SOUND_SETTINGS.default;
  }, [pathname]);

  // Update sound settings effect
  useEffect(() => {
    modifySoundSetting({
      soundInstanceName: "ambientSound",
      settingType: "pos",
      settingValue: currentSettings.pos,
    });
    modifySoundSetting({
      soundInstanceName: "ambientSound",
      settingType: "orientation",
      settingValue: currentSettings.orientation,
    });
  }, [currentSettings, modifySoundSetting]);
}
