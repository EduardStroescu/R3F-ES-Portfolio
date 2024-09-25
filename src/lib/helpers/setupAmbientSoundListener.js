import { useSoundStore } from "../stores/useSoundStore";

export const setupAmbientSoundListener = () => {
  const handlePlayAmbientSound = async () => {
    if (window.localStorage.getItem("audioEnabled") === null) {
      useSoundStore.getState().actions.setAudioEnabled(true);
    }

    if (useSoundStore.getState().audioEnabled) {
      useSoundStore.getState().actions.playAmbientSound();
    }

    // Remove the listener after the first interaction (either click or touchstart)
    window.removeEventListener("click", handlePlayAmbientSound);
    window.removeEventListener("touchstart", handlePlayAmbientSound);
  };

  // Attach the listener for the first user interaction (either click or touchstart)
  window.addEventListener("click", handlePlayAmbientSound);
  window.addEventListener("touchstart", handlePlayAmbientSound);

  // Return a cleanup function to remove listeners if needed
  return () => {
    window.removeEventListener("click", handlePlayAmbientSound);
    window.removeEventListener("touchstart", handlePlayAmbientSound);
  };
};
