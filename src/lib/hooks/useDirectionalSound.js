import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSoundStoreActions } from "../stores/useSoundStore";
import { setupAmbientSoundListener } from "../helpers/setupAmbientSoundListener";

export function useDirectionalSound() {
  const location = useLocation();
  const { modifySoundSetting } = useSoundStoreActions();

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
        settingValue: [0, 15, 0],
      });
      modifySoundSetting({
        soundInstanceName: "ambientSound",
        settingType: "orientation",
        settingValue: [0, -10, 0],
      });
    } else {
      modifySoundSetting({
        soundInstanceName: "ambientSound",
        settingType: "pos",
        settingValue: [0, 0, 5],
      });
      modifySoundSetting({
        soundInstanceName: "ambientSound",
        settingType: "orientation",
        settingValue: [0, 0, 0],
      });
    }
  }, [location.pathname, modifySoundSetting]);
}
