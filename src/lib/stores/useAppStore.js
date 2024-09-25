import { create } from "zustand";
import { projectsData } from "../data/projectsData";

export const useAppStore = create((set) => ({
  started: false,
  homeSceneActive: location.pathname !== "/projects",
  projectsSceneActive: location.pathname === "/projects",
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

export const useAppStoreActions = () => useAppStore((state) => state.actions);
