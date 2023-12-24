import { create } from "zustand";

interface useRentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useRentModal = create<useRentModalProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
