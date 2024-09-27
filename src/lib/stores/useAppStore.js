import { create } from "zustand";
import { projectsData } from "../data/projectsData";

export const useAppStore = create((set, get) => ({
  sun: null,
  started: false,
  activeScene: location.pathname !== "/projects" ? "home" : "projects",
  activeProject: projectsData[0],
  actions: {
    setStarted: (newValue) =>
      set((prevState) => ({
        started:
          typeof newValue === "function"
            ? newValue(prevState.started)
            : newValue,
      })),
    setActiveScene: (newValue) =>
      set((prevState) => ({
        activeScene:
          typeof newValue === "function"
            ? newValue(prevState.activeScene)
            : newValue,
      })),
    setActiveProject: (newProject) => {
      if (get().activeProject !== newProject) {
        set({ activeProject: newProject });
      }
    },
    setSun: (newSun) => set(() => ({ sun: newSun })),
  },
}));

export const useAppStoreActions = () => useAppStore((state) => state.actions);
