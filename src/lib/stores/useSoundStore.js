import { create } from "zustand";
import { Howl, Howler } from "howler";

Howler.autoUnlock = false;

const hoverSound = new Howl({
  src: [
    "https://res.cloudinary.com/dgfe1xsgj/video/upload/v1705318256/Portfolio/Audio/vpyhhqd4mptue9miv1em.webm",
    "https://res.cloudinary.com/dgfe1xsgj/video/upload/v1705318256/Portfolio/Audio/vhabkhwneipxqm0zk4xs.mp3",
  ],
  autoplay: false,
  sprite: {
    hover: [166300, 500],
  },
  volume: 0.2,
});

const ambientSound = new Howl({
  src: [
    "https://res.cloudinary.com/dgfe1xsgj/video/upload/v1705318256/Portfolio/Audio/vpyhhqd4mptue9miv1em.webm",
    "https://res.cloudinary.com/dgfe1xsgj/video/upload/v1705318256/Portfolio/Audio/vhabkhwneipxqm0zk4xs.mp3",
  ],
  autoplay: false,
  sprite: {
    ambient: [0, 148000, true],
  },
  volume: 0.9,
});

const howlerSprite = new Howl({
  src: [
    "https://res.cloudinary.com/dgfe1xsgj/video/upload/v1705318256/Portfolio/Audio/vpyhhqd4mptue9miv1em.webm",
    "https://res.cloudinary.com/dgfe1xsgj/video/upload/v1705318256/Portfolio/Audio/vhabkhwneipxqm0zk4xs.mp3",
  ],
  autoplay: false,
  sprite: {
    transition: [151300, 4000],
    menuOpenClose: [157500, 1000],
    menuFlip: [161000, 2000],
    underwaterTransition: [163000, 3200],
  },
});

const sounds = {
  hoverSound,
  ambientSound,
  howlerSprite,
};

export const useSoundStore = create((set, get) => ({
  audioEnabled: JSON.parse(localStorage.getItem("audioEnabled")) || true,
  actions: {
    setAudioEnabled: (newValue) =>
      set((prevState) => ({
        audioEnabled:
          typeof newValue === "function"
            ? newValue(prevState.audioEnabled)
            : newValue,
      })),
    playHoverSound: () => get().audioEnabled && sounds.hoverSound.play("hover"),
    playAmbientSound: () =>
      get().audioEnabled && sounds.ambientSound.play("ambient"),
    playTransitionSound: () =>
      get().audioEnabled && sounds.howlerSprite.play("transition"),
    playMenuOpenCloseSound: () =>
      get().audioEnabled && sounds.howlerSprite.play("menuOpenClose"),
    playMenuFlipSound: () =>
      get().audioEnabled && sounds.howlerSprite.play("menuFlip"),
    playUnderwaterTransitionSound: () =>
      get().audioEnabled && howlerSprite.play("underwaterTransition"),
    modifySoundSetting: ({ soundInstanceName, settingType, settingValue }) => {
      const soundInstance = sounds[soundInstanceName];

      if (soundInstance && typeof soundInstance[settingType] === "function") {
        soundInstance[settingType](...settingValue);
      }
    },
  },
}));

export const useSoundStoreActions = () =>
  useSoundStore((state) => state.actions);
