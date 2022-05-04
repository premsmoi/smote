import { atom } from "recoil";

const defaultUserProfile: UserProfile = {
    uid: '',
    provider: '',
};

export const isAuthenticatedAtom = atom({
    key: "isAuthenticated",
    default: false,
});

export const userProfileAtom = atom({
    key: "userProfile",
    default: defaultUserProfile,
});