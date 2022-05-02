import { atom } from "recoil";
import { ConfirmationDialog } from "../common/components/dialogs/confirmation";

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