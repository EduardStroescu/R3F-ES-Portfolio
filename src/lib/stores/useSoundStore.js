import { create } from "zustand";
import { Howl, Howler } from "howler";

Howler.autoUnlock = false;

const SOUND_URLS = [
  "https://res.cloudinary.com/dgfe1xsgj/video/upload/v1705318256/Portfolio/Audio/vpyhhqd4mptue9miv1em.webm",
  "https://res.cloudinary.com/dgfe1xsgj/video/upload/v1705318256/Portfolio/Audio/vhabkhwneipxqm0zk4xs.mp3",
];

const SPRITE_CONFIG = {
  hover: [166300, 500],
  ambient: [0, 148000, true],
  transition: [151300, 4000],
  menuOpenClose: [157500, 1000],
  menuFlip: [161000, 2000],
  underwaterTransition: [163000, 3200],
};

const loadSound = (src, sprite) => {
  return new Promise((resolve, reject) => {
    const sound = new Howl({
      src,
      autoplay: false,
      sprite,
      onload: () => {
        // Set volumes after sound is loaded
        if (sprite?.ambient) sound.volume(0.9);
        if (sprite?.hover) sound.volume(0.4);
        resolve(sound);
      },
      onloaderror: (id, error) => reject(error),
    });
  });
};

let soundsInitialized = false;
const sounds = {
  hoverSound: null,
  ambientSound: null,
  howlerSprite: null,
};
const soundIds = {};

const initializeSounds = async (retryCount = 0) => {
  if (soundsInitialized) return true;
  useSoundStore.getState().actions.setIsLoadingSounds(true);
  try {
    const [hoverSound, ambientSound, howlerSprite] = await Promise.all([
      loadSound(SOUND_URLS, { hover: SPRITE_CONFIG.hover }),
      loadSound(SOUND_URLS, { ambient: SPRITE_CONFIG.ambient }),
      loadSound(SOUND_URLS, {
        transition: SPRITE_CONFIG.transition,
        menuOpenClose: SPRITE_CONFIG.menuOpenClose,
        menuFlip: SPRITE_CONFIG.menuFlip,
        underwaterTransition: SPRITE_CONFIG.underwaterTransition,
      }),
    ]);

    // Assign the loaded sounds to the sounds object
    sounds.hoverSound = hoverSound;
    sounds.ambientSound = ambientSound;
    sounds.howlerSprite = howlerSprite;

    soundsInitialized = true; // Set the initialization flag
    useSoundStore.getState().actions.setIsLoadingSounds(false);

    return true;
  } catch (error) {
    console.error(`Error loading sounds (attempt ${retryCount + 1}/3):`, error);
    if (retryCount < 2) {
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * (retryCount + 1))
      );
      return await initializeSounds(retryCount + 1);
    }
    useSoundStore.getState().actions.setIsLoadingSounds(false);
    return false;
  }
};

export const useSoundStore = create((set, get) => {
  // Initialize audioEnabled state
  const initialAudioEnabled =
    localStorage.getItem("audioEnabled") !== null
      ? JSON.parse(localStorage.getItem("audioEnabled"))
      : false;

  // Initialize sounds if audioEnabled is true
  if (initialAudioEnabled) {
    setTimeout(async () => {
      await initializeSounds();
    }, 100);
  }

  return {
    audioEnabled: initialAudioEnabled,
    isLoadingSounds: false,
    actions: {
      setIsLoadingSounds: (newValue) => set({ isLoadingSounds: newValue }),
      setAudioEnabled: async (newValue) => {
        if (newValue === true) {
          await initializeSounds(); // Await sound initialization
        }

        set((prevState) => {
          const updatedAudioEnabled =
            typeof newValue === "function"
              ? newValue(prevState.audioEnabled)
              : newValue;

          // Store the updated value in local storage
          window.localStorage.setItem(
            "audioEnabled",
            JSON.stringify(updatedAudioEnabled)
          );

          // Stop sound if audio is disabled
          if (updatedAudioEnabled === false) {
            Howler.stop();
          }

          return {
            audioEnabled: updatedAudioEnabled,
          };
        });
        if (newValue === true) {
          get().actions.playAmbientSound();
        }
      },
      playHoverSound: () =>
        get().audioEnabled && sounds?.hoverSound?.play("hover"),
      playAmbientSound: () => {
        if (get().audioEnabled) {
          soundIds.ambientSound = sounds?.ambientSound?.play(
            soundIds?.ambientSound || "ambient"
          );
        }
      },
      pauseAmbientSound: () =>
        sounds?.ambientSound?.pause(soundIds?.ambientSound || "ambient"),
      playTransitionSound: () =>
        get().audioEnabled && sounds?.howlerSprite?.play("transition"),
      playMenuOpenCloseSound: () =>
        get().audioEnabled && sounds?.howlerSprite?.play("menuOpenClose"),
      playMenuFlipSound: () =>
        get().audioEnabled && sounds?.howlerSprite?.play("menuFlip"),
      playUnderwaterTransitionSound: () =>
        get().audioEnabled &&
        sounds?.howlerSprite?.play("underwaterTransition"),
      modifySoundSetting: ({
        soundInstanceName,
        settingType,
        settingValue,
      }) => {
        const soundInstance = sounds[soundInstanceName];

        if (soundInstance && typeof soundInstance[settingType] === "function") {
          soundInstance[settingType](...settingValue);
        }
      },
    },
  };
});

export const useSoundStoreActions = () =>
  useSoundStore((state) => state.actions);
