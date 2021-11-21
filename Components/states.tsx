// recoil states
import { atom } from "recoil";

export const pubkeyState = atom({
  key: "pubkey",
  default: "",
});

export const chainIdState = atom({
    key: "chainId",
    default: "",
  });