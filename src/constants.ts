export type TButtonVariant = "PRIMARY" | "SECONDARY";
export const BUTTON_VARIANT: Record<TButtonVariant, TButtonVariant> = {
  PRIMARY: "PRIMARY",
  SECONDARY: "SECONDARY",
};

export type TIconButtonType = "LEFT_ARROW" | "RIGHT_ARROW" | "CLOSE";
export const ICON_BUTTON_TYPE: Record<TIconButtonType, TIconButtonType> = {
  LEFT_ARROW: "LEFT_ARROW",
  RIGHT_ARROW: "RIGHT_ARROW",
  CLOSE: "CLOSE",
};

export const TMDB_API_KEY = "2dca580c2a14b55200e784d157207b4d";

export const MOVIE_CREW_JOB = {
  Director: "Director",
};

export const IMG_BASE_URL = "http://image.tmdb.org/t/p";
