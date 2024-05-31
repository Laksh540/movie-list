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

export type TLoadDirection = "UP" | "DOWN";
export const LOAD_DIRECTION: Record<TLoadDirection, TLoadDirection> = {
  UP: "UP",
  DOWN: "DOWN",
};

export type TMovieFilterBy = "NAME" | "GENRES";

export const MOVIE_FILTER_BY: Record<TMovieFilterBy, TMovieFilterBy> = {
  GENRES: "GENRES",
  NAME: "NAME",
};

export const MOVIE_FILTER_OPTIONS: { label: string; value: TMovieFilterBy }[] =
  [
    {
      label: "Movie Name",
      value: MOVIE_FILTER_BY?.NAME,
    },
    {
      label: "Movie Genres",
      value: MOVIE_FILTER_BY?.GENRES,
    },
  ];
