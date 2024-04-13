import { create } from "zustand";
import { projectsData } from "./data/projectsData";

export const useAppStore = create((set) => ({
  started: false,
  homeSceneActive: false,
  projectsSceneActive: false,
  activeProject: projectsData[0],
  actions: {
    setStarted: (newValue) =>
      set((prevState) => ({
        started:
          typeof newValue === "function"
            ? newValue(prevState.started)
            : newValue,
      })),
    setHomeSceneActive: (newValue) =>
      set((prevState) => ({
        homeSceneActive:
          typeof newValue === "function"
            ? newValue(prevState.homeSceneActive)
            : newValue,
      })),
    setProjectsSceneActive: (newValue) =>
      set((prevState) => ({
        projectsSceneActive:
          typeof newValue === "function"
            ? newValue(prevState.projectsSceneActive)
            : newValue,
      })),
    setActiveProject: (activeProject) => set({ activeProject }),
  },
}));

export const useContactStore = create((set) => ({
  flipped: false,
  messageSent: false,
  messageReceived: false,
  actions: {
    setFlipped: (newValue) =>
      set((prevState) => ({
        flipped:
          typeof newValue === "function"
            ? newValue(prevState.flipped)
            : newValue,
      })),
    setMessageSent: (newValue) =>
      set((prevState) => ({
        messageSent:
          typeof newValue === "function"
            ? newValue(prevState.messageSent)
            : newValue,
      })),
    setMessageReceived: (newValue) =>
      set((prevState) => ({
        messageReceived:
          typeof newValue === "function"
            ? newValue(prevState.messageReceived)
            : newValue,
      })),
  },
}));

export const useAboutStore = create((set) => ({
  visible: false,
  actions: {
    setVisible: (newValue) =>
      set((prevState) => ({
        visible:
          typeof newValue === "function"
            ? newValue(prevState.visible)
            : newValue,
      })),
  },
}));

export const useSoundStore = create((set) => ({
  audioEnabled: false,
  actions: {
    setAudioEnabled: (newValue) =>
      set((prevState) => ({
        audioEnabled:
          typeof newValue === "function"
            ? newValue(prevState.audioEnabled)
            : newValue,
      })),
  },
}));

export const useAppStoreActions = () => useAppStore((state) => state.actions);
export const useContactStoreActions = () =>
  useContactStore((state) => state.actions);
export const useAboutStoreActions = () =>
  useAboutStore((state) => state.actions);
export const useSoundStoreActions = () =>
  useSoundStore((state) => state.actions);
