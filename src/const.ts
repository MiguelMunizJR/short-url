const isDev = process.env.NODE_ENV === "development";

export const URL_REGEX = /^(https?:\/\/)?(localhost|([a-z0-9-]+(\.[a-z]{2,})+))(:\d{1,5})?(\/[^\s]*)?$/i;
export const API_URL_SUBMIT = "api/shorten";
export const API_URL_TRACK_CLICK = "api/track-click";