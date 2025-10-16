import { useShallow } from "zustand/react/shallow";
import {
  useSoundStore,
  useSoundStoreActions,
} from "../lib/stores/useSoundStore";
import { AudioIcon } from "./Icons";

import { useLocation } from "react-router-dom";

function AudioButton() {
  const { pathname } = useLocation();
  const { audioEnabled, isLoadingSounds } = useSoundStore(
    useShallow((state) => ({
      audioEnabled: state.audioEnabled,
      isLoadingSounds: state.isLoadingSounds,
    }))
  );

  const { setAudioEnabled, playHoverSound } = useSoundStoreActions();

  const switchAudio = () => setAudioEnabled(!audioEnabled);

  const tooltipText = isLoadingSounds
    ? "Loading sounds..."
    : audioEnabled
    ? "Toggle all sounds Off"
    : "Toggle all sounds On";
  const tooltipClass = audioEnabled ? "audioOn" : "audioOff";
  const soundIconClass = audioEnabled
    ? "soundIconEnabled"
    : "soundIconDisabled";

  return (
    <aside
      data-projectsactive={pathname === "/projects"}
      className={`
        tooltipWrapper fixed left-4 sm:left-8 scale-[0.8] pointer-events-auto
        ${pathname === "/projects" ? "top-20" : "bottom-6"}
      `}
    >
      <button
        onClick={switchAudio}
        onPointerEnter={playHoverSound}
        className={`icon ${soundIconClass}`}
      >
        <span className={`tooltip ${tooltipClass}`}>{tooltipText}</span>
        <span>
          <AudioIcon
            className={`${audioEnabled ? "fill-white" : "fill-[#fc003f]"} ${
              isLoadingSounds ? "animate-pulse" : "animate-none"
            }`}
          />
        </span>
      </button>
    </aside>
  );
}

export default AudioButton;
