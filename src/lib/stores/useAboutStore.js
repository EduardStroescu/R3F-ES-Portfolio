import { create } from "zustand";

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

export const useAboutStoreActions = () =>
  useAboutStore((state) => state.actions);
