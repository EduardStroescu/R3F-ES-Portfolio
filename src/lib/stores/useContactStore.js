import { create } from "zustand";

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

export const useContactStoreActions = () =>
  useContactStore((state) => state.actions);
