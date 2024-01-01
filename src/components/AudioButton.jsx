import { AudioIcon } from "./Icons";

export function AudioButton({
  isAudioEnabled,
  switchAudio,
  setAudioEnabled,
  playHoverSound,
}) {
  return (
    <section className="tooltipWrapper fixed bottom-6 left-4 ">
      <button
        onClick={() => {
          switchAudio();
          setAudioEnabled((state) => !state);
        }}
        onPointerEnter={playHoverSound}
        className={`icon ${
          isAudioEnabled ? "soundIconEnabled" : "soundIconDisabled"
        }`}
      >
        {isAudioEnabled ? (
          <span className="tooltip audioOn">Toggle all sounds Off</span>
        ) : (
          <span className="tooltip audioOff">Toggle all sounds On</span>
        )}
        <span>
          <AudioIcon isAudioEnabled={isAudioEnabled} />
        </span>
      </button>
    </section>
  );
}
