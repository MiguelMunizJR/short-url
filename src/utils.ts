import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export const notyfInstance = () => {
    return new Notyf({
      duration: 4000,
      dismissible: true,
      ripple: true,
    });
  };