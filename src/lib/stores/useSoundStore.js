import { create } from "zustand";
import { Howl, Howler } from "howler";

Howler.autoUnlock = false;

const loadSound = (src, sprite) => {
  return new Promise((resolve, reject) => {
    const sound = new Howl({
      src,
      autoplay: false,
      sprite,
      onload: () => resolve(sound),
      onloaderror: (id, error) => reject(error),
    });

    if (sprite.ambient) sound.volume(0.9);
    if (sprite.hover) sound.volume(0.4);
  });
};

let soundsInitialized = false;
const sounds = {
  hoverSound: null,
  ambientSound: null,
  howlerSprite: null,
};
const soundIds = {};

const initializeSounds = async () => {
  if (!soundsInitialized) {
    try {
      const [hoverSound, ambientSound, howlerSprite] = await Promise.all([
        loadSound(
          [
            "https://res.cloudinary.com/dgfe1xsgj/video/upload/v1705318256/Portfolio/Audio/vpyhhqd4mptue9miv1em.webm",
            "https://res.cloudinary.com/dgfe1xsgj/video/upload/v1705318256/Portfolio/Audio/vhabkhwneipxqm0zk4xs.mp3",
          ],
          { hover: [166300, 500] }
        ),
        loadSound(
          [
            "https://res.cloudinary.com/dgfe1xsgj/video/upload/v1705318256/Portfolio/Audio/vpyhhqd4mptue9miv1em.webm",
            "https://res.cloudinary.com/dgfe1xsgj/video/upload/v1705318256/Portfolio/Audio/vhabkhwneipxqm0zk4xs.mp3",
          ],
          { ambient: [0, 148000, true] }
        ),
        loadSound(
          [
            "https://res.cloudinary.com/dgfe1xsgj/video/upload/v1705318256/Portfolio/Audio/vpyhhqd4mptue9miv1em.webm",
            "https://res.cloudinary.com/dgfe1xsgj/video/upload/v1705318256/Portfolio/Audio/vhabkhwneipxqm0zk4xs.mp3",
          ],
          {
            transition: [151300, 4000],
            menuOpenClose: [157500, 1000],
            menuFlip: [161000, 2000],
            underwaterTransition: [163000, 3200],
          }
        ),
      ]);

      // Assign the loaded sounds to the sounds object
      sounds.hoverSound = hoverSound;
      sounds.ambientSound = ambientSound;
      sounds.howlerSprite = howlerSprite;

      soundsInitialized = true; // Set the initialization flag
    } catch (error) {
      console.error("Error loading sounds: ", error);
    }
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
    setTimeout(() => initializeSounds(), 100);
  }

  return {
    audioEnabled: initialAudioEnabled,
    actions: {
      setAudioEnabled: async (newValue) => {
        if (newValue === true) {
          await initializeSounds(); // Await sound initialization
        }

        // Use the updater function to ensure you get the latest state
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
        get().audioEnabled &&
        sounds.hoverSound &&
        sounds.hoverSound.play("hover"),
      playAmbientSound: () => {
        if (get().audioEnabled && sounds.ambientSound) {
          soundIds.ambientSound = sounds.ambientSound.play(
            soundIds.ambientSound || "ambient"
          );
        }
      },
      pauseAmbientSound: () =>
        sounds.ambientSound && sounds.ambientSound.pause(),
      playTransitionSound: () =>
        get().audioEnabled &&
        sounds.howlerSprite &&
        sounds.howlerSprite.play("transition"),
      playMenuOpenCloseSound: () =>
        get().audioEnabled &&
        sounds.howlerSprite &&
        sounds.howlerSprite.play("menuOpenClose"),
      playMenuFlipSound: () =>
        get().audioEnabled &&
        sounds.howlerSprite &&
        sounds.howlerSprite.play("menuFlip"),
      playUnderwaterTransitionSound: () =>
        get().audioEnabled &&
        sounds.howlerSprite &&
        sounds.howlerSprite.play("underwaterTransition"),
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
