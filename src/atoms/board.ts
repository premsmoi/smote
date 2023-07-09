import { atom } from "recoil";

export const boardAtom = atom<Board>({
    key: "board",
    default: undefined,
});