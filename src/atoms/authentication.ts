import { atom } from "recoil";

const defaultUserProfile: GoogleUserProfile = {
    name: '',
    email: '',
    image: '',
};

export const isAuthenticatedAtom = atom({
    key: "isAuthenticated",
    default: false,
});

export const userProfileAtom = atom({
    key: "userProfile",
    default: defaultUserProfile,
});