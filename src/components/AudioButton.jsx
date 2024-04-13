import { useSoundStore, useSoundStoreActions } from "../lib/store";
import { AudioIcon } from "./Icons";
import { Howler } from "howler";
import { useSoundContext } from "../lib/providers/SoundContextProvider";

export function AudioButton() {
  const audioEnabled = useSoundStore((state) => state.audioEnabled);
  const { setAudioEnabled } = useSoundStoreActions();
  const { playAmbientSound, playHoverSound } = useSoundContext();

  const switchAudio = () => {
    if (audioEnabled) {
      Howler.stop();
      Howler.volume(0);
    } else {
      Howler.volume(0.5);
      playAmbientSound();
    }
  };

  return (
    <aside className="tooltipWrapper fixed bottom-6 left-4 scale-[0.8]">
      <button
        onClick={() => {
          switchAudio();
          setAudioEnabled((prev) => !prev);
        }}
        onPointerEnter={playHoverSound}
        className={`icon ${
          audioEnabled ? "soundIconEnabled" : "soundIconDisabled"
        }`}
      >
        {audioEnabled ? (
          <span className="tooltip audioOn">Toggle all sounds Off</span>
        ) : (
          <span className="tooltip audioOff">Toggle all sounds On</span>
        )}
        <span>
          <AudioIcon audioEnabled={audioEnabled} />
        </span>
      </button>
    </aside>
  );
}
