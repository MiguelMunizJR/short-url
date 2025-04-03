import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export const notyfInstance = () => {
    return new Notyf({
      duration: 8000,
      dismissible: true,
      ripple: true,
    });
  };