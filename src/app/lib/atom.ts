"use client"
import { atom } from 'jotai';
import { AppModal } from '../context/GlobalModalContextProvider';

export const sideBarOpen = atom(false);
export const appModalAtom = atom<AppModal[]>([]);
