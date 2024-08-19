import { atom } from "recoil";



export const NoteAtom = atom({
    key: 'NoteAtom', // unique ID (with respect to other atoms/selectors)
    default: 0, // default value (aka initial value)
  });