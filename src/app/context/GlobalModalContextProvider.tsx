
import React, { createContext, useCallback, useMemo } from 'react';
import { useAtom } from 'jotai';
import { appModalAtom } from '../lib/atom';

export enum ModalTypes {
  PREVIEW_IMAGE_MODAL = 'PREVIEW_IMAGE_MODAL',
}

export type AppModal = {
  modal: ModalTypes;
  modalProps: Record<string, any>;
};

type GlobalModalContextValue = {
  activeModals: AppModal[];
  openModal: (modal: ModalTypes, modalProps?: Record<string, any>) => void;
  closeModal: (modal: ModalTypes) => void;
};

export const GlobalModalContext = createContext<GlobalModalContextValue>({
  activeModals: [],
  closeModal: () => {},
  openModal: () => {},
});

type GlobalModalProviderProps = {
  children: React.ReactNode;
};

export const GlobalModalContextProvider = ({
  children,
}: GlobalModalProviderProps) => {
  const [activeModals, setActiveModals] = useAtom(appModalAtom);

  const openModal = useCallback(
    (modal: ModalTypes, modalProps = {}) => {
      if (activeModals.some((m) => m.modal === modal)) {
        return;
      }

      setActiveModals((val) => [...val, { modal, modalProps }]);
    },
    [activeModals]
  );

  const closeModal = (modal: ModalTypes) =>
    setActiveModals((val) => val.filter((m) => m.modal !== modal));

  const appContext = useMemo(
    () => ({ activeModals, closeModal, openModal }),
    [activeModals, openModal]
  );

  return (
    <GlobalModalContext.Provider value={appContext}>
      {children}
    </GlobalModalContext.Provider>
  );
};
