import { useSoundStore } from "../stores/useSoundStore";

export const setupAmbientSoundListener = () => {
  const handlePlayAmbientSound = async () => {
    if (window.localStorage.getItem("audioEnabled") === null) {
      useSoundStore.getState().actions.setAudioEnabled(true);
    }

    if (useSoundStore.getState().audioEnabled) {
      useSoundStore.getState().actions.playAmbientSound();
    }
  };

  // Attach the listener for the first user interaction (either click or touchstart)
  const root = document.getElementById("root");
  root.addEventListener("click", handlePlayAmbientSound, {
    once: true,
    passive: true,
  });
  root.addEventListener("touchstart", handlePlayAmbientSound, {
    once: true,
    passive: true,
  });

  // Return a cleanup function to remove listeners if needed
  return () => {
    root.removeEventListener("click", handlePlayAmbientSound);
    root.removeEventListener("touchstart", handlePlayAmbientSound);
  };
};
