import {
  useSoundStore,
  useSoundStoreActions,
} from "../lib/stores/useSoundStore";
import { AudioIcon } from "./Icons";

import { useLocation } from "react-router-dom";

function AudioButton() {
  const { pathname } = useLocation();
  const audioEnabled = useSoundStore((state) => state.audioEnabled);
  const { setAudioEnabled, playHoverSound } = useSoundStoreActions();

  const switchAudio = () => {
    if (audioEnabled) {
      setAudioEnabled(false);
    } else {
      setAudioEnabled(true);
    }
  };

  return (
    <aside
      data-projectsactive={pathname === "/projects"}
      className={`
        ${pathname !== "/projects" ? "bottom-6" : "top-20"}
        tooltipWrapper fixed left-4 sm:left-8 scale-[0.8] pointer-events-auto`}
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

export default AudioButton;
