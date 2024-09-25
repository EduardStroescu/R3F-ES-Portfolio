import {
  useSoundStore,
  useSoundStoreActions,
} from "../lib/stores/useSoundStore";
import { AudioIcon } from "./Icons";
import { Howler } from "howler";

import { useLocation } from "react-router-dom";

export function AudioButton() {
  const location = useLocation();
  const audioEnabled = useSoundStore((state) => state.audioEnabled);
  const { setAudioEnabled, playAmbientSound, playHoverSound } =
    useSoundStoreActions();

  const switchAudio = () => {
    if (audioEnabled) {
      setAudioEnabled(false);
      localStorage.setItem("audioEnabled", false);
      Howler.stop();
      Howler.volume(0);
    } else {
      setAudioEnabled(true);
      localStorage.setItem("audioEnabled", true);
      Howler.volume(0.5);
      playAmbientSound();
    }
  };

  return (
    <aside
      data-projectsactive={location.pathname === "/projects"}
      className={`
        ${location.pathname !== "/projects" ? "bottom-6" : "top-20"}
        tooltipWrapper fixed left-4 sm:left-8 scale-[0.8]`}
    >
      <button
        onClick={switchAudio}
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
