import { atom } from "recoil";

export const userProfileAtom = atom<UserProfile>({
    key: "userProfile",
    default: undefined,
});