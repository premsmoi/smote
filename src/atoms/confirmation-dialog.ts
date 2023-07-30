import { atom } from "recoil";

const defaultValue: ConfirmationDialog = {
  title: '',
  message: '',
  isShow: false,
  onConfirm: () => { return Promise.reject() },
  onClose: () => { return Promise.reject() },
};

export const confirmationDialog = atom({
  key: "confirmationDialog",
  default: defaultValue,
});