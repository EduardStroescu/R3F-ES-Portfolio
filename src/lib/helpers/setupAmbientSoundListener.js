import { useSoundStore } from "../stores/useSoundStore";

export const setupAmbientSoundListener = () => {
  const isAudioEnabled = useSoundStore.getState().audioEnabled;
  if (!isAudioEnabled) return;

  const handlePlayAmbientSound = () => {
    useSoundStore.getState().actions.playAmbientSound();

    // Setup listener to remove after first click for both touch and click
    window.removeEventListener("click", handlePlayAmbientSound);
    window.removeEventListener("touchstart", handlePlayAmbientSound);
  };

  // Add the event listener for both touch and click
  window.addEventListener("click", handlePlayAmbientSound);
  window.addEventListener("touchstart", handlePlayAmbientSound);

  return () => {
    window.removeEventListener("click", handlePlayAmbientSound);
    window.removeEventListener("touchstart", handlePlayAmbientSound);
  };
};
