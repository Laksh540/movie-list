import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useHref } from "react-router-dom";
import movieFixLogo from "../../assets/custom-moviefix-logo.svg";
import Button from "../../Components/Button/Button";
import {
  BUTTON_VARIANT,
  ICON_BUTTON_TYPE,
  IMG_BASE_URL,
  LOAD_DIRECTION,
  MOVIE_CREW_JOB,
  TLoadDirection,
} from "../../constants";
import IconButton from "../../Components/IconButton/IconButton";
import MovieService from "../../Services/MovieService";

interface IGenres {
  id: number;
  name: string;
}

interface IMovieDetails {
  id: number;
  title: string;
  poster_path: string;
  genres: string[];
  overview: string;
}
interface IMovieListWithYear {
  year: number;
  list: IMovieDetails[];
}

interface ISelectedMovieCastAndDirector {
  isSelected?: boolean;
  movieId?: number;
  cast: string[];
  director: string[];
}
interface IPageObj {
  allGenres: IGenres[];
  allGenresLoading: boolean;
  movieList: IMovieListWithYear[];
  movieListLoading: boolean;
  selectedMovieCastAndDirector: ISelectedMovieCastAndDirector;
  selectedMovieCastAndDirectorLoading: boolean;
}

const initialPageObj: IPageObj = {
  allGenres: [],
  allGenresLoading: false,
  movieList: [],
  movieListLoading: false,
  selectedMovieCastAndDirector: {
    isSelected: false,
    cast: [],
    director: [],
  },
  selectedMovieCastAndDirectorLoading: false,
};
let isFirstRenderCheckToGetMovieList = true;

interface IScrollLoadRequest {
  toggle: boolean;
  direction: TLoadDirection;
}

const PageMovieListing = () => {
  /*
    -----
    Use State
    -----
  */
  const [pageObj, setPageObj] = useState<IPageObj>({ ...initialPageObj });
  const [timeoutLocal, setTimeOutLocal] = useState<any>(undefined);
  const [scrollLoadRequest, setScrollLoadRequest] =
    useState<IScrollLoadRequest>({
      toggle: false,
      direction: LOAD_DIRECTION.DOWN,
    });

  const filterContainerRef = useRef<HTMLDivElement>(null);
  const movieListContainerRef = useRef<any>(null);
  const yearContainerRef = useRef<any[]>([]);

  /*
    -----
    Use Effect
    -----
  */
  useEffect(() => {
    getAllGenres();
  }, []);

  useEffect(() => {
    if (pageObj?.allGenres.length > 0) {
      getMovies(2012);
      // getMovieCredits();
    }
  }, [pageObj?.allGenres]);

  useEffect(() => {
    if (pageObj?.selectedMovieCastAndDirector.movieId) {
      debounce(() => {
        getMovieCredits(pageObj?.selectedMovieCastAndDirector?.movieId ?? 0);
      }, 1000);
    }
  }, [pageObj?.selectedMovieCastAndDirector.movieId]);

  useEffect(() => {
    if (pageObj?.movieList?.length === 1) {
      movieListContainerRef.current.scrollTop = 30;
    } else if (
      pageObj?.movieList?.length > 1 &&
      scrollLoadRequest?.direction === LOAD_DIRECTION.UP
    ) {
      // movieListContainerRef.current.scrollTop = 30;
      // setTimeout(() => {
      movieListContainerRef.current.scrollTop =
        yearContainerRef?.current?.[0]?.clientHeight;
      // }, 50);
    }
  }, [pageObj?.movieList]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const { scrollTop, clientHeight, scrollHeight } =
  //       document.documentElement;
  //     // console.log("scrollTop", scrollTop);
  //     // console.log("clientHeight", clientHeight);
  //     // console.log("scrollHeight", scrollHeight);
  //     if (scrollTop + clientHeight >= scrollHeight - 20) {
  //       setToggleToRequestMoreData((prev) => !prev);
  //     }
  //   };

  //   getJobList();
  //   movieListContainerRef?.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    let getData: any;
    // debugger;
    // ignore for first render
    if (!isFirstRenderCheckToGetMovieList) {
      // setIsListLoading(true);
      let todaysDate = new Date();
      getData = setTimeout(() => {
        if (
          pageObj?.movieList?.[pageObj?.movieList.length - 1]?.year <
          todaysDate.getFullYear()
        ) {
          let year;
          if (scrollLoadRequest.direction === LOAD_DIRECTION.DOWN) {
            year = pageObj.movieList[pageObj.movieList.length - 1].year + 1;
          } else {
            year = pageObj.movieList[0].year - 1;
          }
          getMovies(year);
        }
      }, 2000);
    }
    if (isFirstRenderCheckToGetMovieList) {
      isFirstRenderCheckToGetMovieList = false;
    }

    return () => {
      clearTimeout(getData);
    };
  }, [scrollLoadRequest.toggle]);

  /*
    -----
    Service
    -----
  */
  const getAllGenres = async () => {
    setPageObj((prevObj) => ({
      ...prevObj,
      allGenresLoading: true,
    }));
    try {
      const res: any = await MovieService.getGenresList();
      // console.log("res ", res);
      setPageObj((prevObj) => ({
        ...prevObj,
        allGenres: res?.genres ?? [],
        allGenresLoading: false,
      }));
    } catch (error) {
      console.log("error ", error);
      setPageObj((prevObj) => ({
        ...prevObj,
        allGenresLoading: false,
      }));
    }
  };

  const getMovies = async (year: number) => {
    const doesDataAlreadyExistForSameYear = pageObj?.movieList?.some(
      (record) => record?.year === year
    );

    if (doesDataAlreadyExistForSameYear) {
      return;
    }
    setPageObj((prevObj) => ({
      ...prevObj,
      movieListLoading: true,
    }));
    try {
      const res: any = await MovieService.getMovieList(
        `&primary_release_year=${year}&page=1&append_to_response=credits`
      );
      console.log("res for movie list", res);
      setPageObj((prevObj) => {
        let newList = getMovieListData(res?.results);
        let updatedMovieList: IMovieListWithYear[] = [];

        if (prevObj?.movieList?.length === 0) {
          updatedMovieList.push({
            year: year,
            list: newList,
          });
        } else {
          if (year < prevObj.movieList[0].year) {
            console.log("yearRef", yearContainerRef?.current?.[0]);
            console.log(
              "yearRef height",
              yearContainerRef?.current?.[0]?.clientHeight
            );
            console.log(
              "current scroll top",
              movieListContainerRef.current.scrollTop
            );
            movieListContainerRef.current.scrollTop = 2000;
            // yearContainerRef?.current?.[0]?.height;
            updatedMovieList = [
              { year: year, list: newList },
              ...JSON.parse(JSON.stringify(prevObj.movieList)),
            ];
          } else {
            updatedMovieList = [
              ...JSON.parse(JSON.stringify(prevObj.movieList)),
              { year: year, list: newList },
            ];
          }
        }
        return {
          ...prevObj,
          movieList: updatedMovieList,
          movieListLoading: false,
        };
      });
    } catch (error) {
      console.log("error ", error);
      setPageObj((prevObj) => ({
        ...prevObj,
        movieListLoading: false,
      }));
    }
  };

  const getMovieCredits = async (movieId: number) => {
    setPageObj((prevObj) => ({
      ...prevObj,
      selectedMovieCastAndDirectorLoading: true,
      selectedMovieCastAndDirector: {
        ...prevObj.selectedMovieCastAndDirector,
        isSelected: true,
      },
    }));
    try {
      const res: any = await MovieService.getMovieCredits(movieId);
      console.log("res for movie Credits", res);
      setPageObj((prevObj) => ({
        ...prevObj,
        selectedMovieCastAndDirector: {
          ...prevObj.selectedMovieCastAndDirector,
          movieId: movieId,
          ...getCastAndDirectorData(res),
        },
        selectedMovieCastAndDirectorLoading: false,
      }));
    } catch (error) {
      console.log("error ", error);
      setPageObj((prevObj) => ({
        ...prevObj,
        selectedMovieCastAndDirectorLoading: false,
      }));
    }
  };

  /*
    -----
    Handlers: Event handler for onChange, onBlur etc
    -----
  */
  const onScrollLeftForFilter = () => {
    console.log(filterContainerRef?.current?.scrollLeft, "scrollLeft");

    if (filterContainerRef.current) {
      filterContainerRef.current.scrollLeft -= 240;
    }
  };

  const onScrollRightForFilter = () => {
    console.log(filterContainerRef?.current?.scrollLeft, "scrollRight");
    if (filterContainerRef.current) {
      filterContainerRef.current.scrollLeft += 240;
    }
  };

  const onShowAdditionalMovieDetails = (movie: IMovieDetails) => {
    if (movie?.id !== pageObj?.selectedMovieCastAndDirector?.movieId) {
      setPageObj((prevPageObj) => ({
        ...prevPageObj,
        selectedMovieCastAndDirector: {
          ...prevPageObj.selectedMovieCastAndDirector,
          movieId: movie?.id,
          cast: [],
          director: [],
        },
      }));
    }
  };

  const onCloseSelectedMovie = () => {
    setPageObj((prevPageObj) => ({
      ...prevPageObj,
      selectedMovieCastAndDirector: {
        ...prevPageObj.selectedMovieCastAndDirector,
        isSelected: false,
        cast: [],
        director: [],
      },
    }));
  };

  const onScrollMovieList = (e: any) => {
    // e?.currentTarget?.scrollTop
    const { scrollTop, clientHeight, scrollHeight } = e?.currentTarget;
    console.log("scroll top ", scrollTop);

    if (scrollTop + clientHeight >= scrollHeight - 20) {
      console.log("load direction down");
      setScrollLoadRequest((prevData) => ({
        ...prevData,
        toggle: !prevData.toggle,
        direction: LOAD_DIRECTION.DOWN,
      }));
    } else if (scrollTop === 0) {
      console.log("load direction up");
      setScrollLoadRequest((prevData) => ({
        ...prevData,
        toggle: !prevData.toggle,
        direction: LOAD_DIRECTION.UP,
      }));
    }
  };

  /* 
    -----
    Helper Functions:
    -----
  */

  const debounce = (func: () => void, delay: number) => {
    clearTimeout(timeoutLocal);
    setTimeOutLocal(setTimeout(func, delay));
  };
  // const sleep = (time: number) => {
  //   return new Promise((resolve) => setTimeout(resolve, time));
  // };

  const getMovieListData = (data: any): IMovieDetails[] => {
    // data;
    let movies: IMovieDetails[] = [];
    data.forEach((record: any) => {
      let genres: string[] = [];
      for (const genreId of record?.genre_ids) {
        const genre = pageObj?.allGenres?.find((item) => item.id === genreId);
        genres.push(genre?.name ?? "");
      }

      movies.push({
        id: record?.id,
        title: record?.title,
        poster_path: record?.poster_path,
        genres: genres,
        overview: record?.overview,
      });
    });
    return movies;
  };

  const getCastAndDirectorData = (data: any): ISelectedMovieCastAndDirector => {
    let castList: string[] = [];
    let directors: string[] = [];
    data?.cast?.forEach((record: any) => {
      castList.push(record?.name);
    });

    //  const directors =data?.crew?.filter((record:any)=>record?.job ===MOVIE_CREW_JOB.Director);
    data?.crew?.forEach((record: any) => {
      if (record?.job === MOVIE_CREW_JOB.Director) {
        directors.push(record?.name);
      }
    });
    return {
      director: directors,
      cast: castList,
    };
  };
  /*
    -----
    Sectional Render :
    -----
  */

  const renderCustomMovifixLogo = () => {
    return (
      <svg viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg">
        <path
          id="MyPath"
          fill="none"
          stroke="none"
          strokeWidth=".1"
          d="M 0 5 Q 15 0 30 5"
          pathLength="2"
        />
        <text
          fontSize="5"
          fill="red"
          fontWeight="bold"
          letterSpacing="0.8"
          dominantBaseline="hanging"
          textAnchor="middle"
          className="title"
        >
          <textPath href="#MyPath" startOffset="1">
            MOVIEFIX
          </textPath>
        </text>
      </svg>
    );
  };

  const renderAllGenres = () => {
    if (pageObj?.allGenresLoading) {
      return (
        <div className="flex justify-center pb-2 ">
          <div className="">Genres Loading ...</div>
        </div>
      );
    }
    return (
      <div className="flex">
        <div className="w-24 h-24 mr-1 mobile-hidden">
          <IconButton
            type={ICON_BUTTON_TYPE.LEFT_ARROW}
            onClick={onScrollLeftForFilter}
            imgClassName="w-24 h-24"
          />
        </div>
        <div
          className="flex overflow-x-auto filter-container pb-1"
          ref={filterContainerRef}
        >
          {pageObj?.allGenres.map((genre: IGenres) => (
            <div className="w-fit mr-1 flex-shrink-0 " key={genre?.id}>
              <Button label={genre.name} variant={BUTTON_VARIANT.PRIMARY} />
            </div>
          ))}
        </div>
        <div className=" w-24 h-24 ml-1  mobile-hidden">
          <IconButton
            type={ICON_BUTTON_TYPE.RIGHT_ARROW}
            onClick={onScrollRightForFilter}
            imgClassName="w-24 h-24"
          />
        </div>
      </div>
    );
  };
  const renderHeader = () => {
    return (
      <div className="bg-dark-gray px-1">
        <div className="mb-2">
          <div className=" w-140">{renderCustomMovifixLogo()}</div>
        </div>
        {/* red color #ff4747 */}
        {renderAllGenres()}
      </div>
    );
  };

  const renderMovieGenres = (movie: IMovieDetails) => {
    //  forof
    return movie?.genres.map((genre, index: number) => (
      <div key={index} className="mr-1">
        &#x2022;<span className="text-xs">{genre}</span>
      </div>
    ));
  };

  const renderCasteAndDirector = (movie: IMovieDetails) => {
    if (
      !(
        movie.id === pageObj.selectedMovieCastAndDirector.movieId &&
        pageObj.selectedMovieCastAndDirector.isSelected
      )
    ) {
      return <></>;
    }
    if (pageObj.selectedMovieCastAndDirectorLoading) {
      return <div className=" h-100 text-sm">Loading...</div>;
    }
    return (
      <div className="">
        <div>
          <div className="text-left mb-0_5">
            <span className="text-xs  ">Caste :</span>
          </div>
          <div className="   mb-1 flex flex-wrap  ">
            {pageObj?.selectedMovieCastAndDirector?.cast?.map(
              (name: string, index: number) => (
                <div className="text-left text-xs" key={index}>{`${
                  index + 1 ===
                  pageObj?.selectedMovieCastAndDirector?.cast?.length
                    ? name
                    : `${name} , `
                } `}</div>
              )
            )}
          </div>
          <div className="text-left mb-0_5 ">
            <span className="text-xs ">Director :</span>
          </div>
          <div className=" text-left text-xs  mb-1   ">
            {pageObj?.selectedMovieCastAndDirector?.director?.map(
              (name: string, index: number) => (
                <div>{`${
                  index + 1 ===
                  pageObj?.selectedMovieCastAndDirector?.director?.length
                    ? name
                    : `${name} ,`
                } `}</div>
              )
            )}
          </div>
        </div>
      </div>
    );
  };

  console.log("pageObj?.movieList", pageObj?.movieList);

  // {year: }
  const renderMovies = () => {
    // let movieListByYear = [];

    return (
      <div
        className="movie-list-container"
        ref={movieListContainerRef}
        onScroll={onScrollMovieList}
      >
        {
          <div className="h-24 pt-0_5 flex justify-center">
            <div>
              {pageObj?.movieListLoading &&
              scrollLoadRequest.direction === LOAD_DIRECTION.UP
                ? "Loading..."
                : ""}
            </div>
          </div>
        }
        {pageObj?.movieList?.map(
          (yearData: IMovieListWithYear, index: number) => (
            <div
              className=""
              key={yearData?.year}
              ref={(ref) => {
                yearContainerRef.current[index] = ref;
              }}
            >
              <div className="text-left text-md font-bold mb-1 text-white pt-2 pl-2 ">
                {yearData?.year}
              </div>
              <div className="movie-list-grid">
                {yearData?.list?.map((movie: IMovieDetails, index: number) => (
                  <div
                    className="movie-card"
                    // ref={(ref) => {
                    //   movieCardRef.current[index] = ref;
                    // }}
                    key={movie.id}
                    onClick={() => onShowAdditionalMovieDetails(movie)}
                  >
                    <img
                      src={`${IMG_BASE_URL}/w500${movie?.poster_path}`}
                      className="object-contain w-full h-full"
                    />
                    <div
                      className={`absolute  left-0 right-0 bottom-0  ${
                        movie.id ===
                          pageObj.selectedMovieCastAndDirector.movieId &&
                        pageObj.selectedMovieCastAndDirector.isSelected
                          ? " bg-white text-mid-dark-gray p-1  "
                          : "text-gray-light"
                      }`}
                    >
                      <div
                        className={`flex justify-between ${
                          movie.id ===
                            pageObj.selectedMovieCastAndDirector.movieId &&
                          pageObj.selectedMovieCastAndDirector.isSelected
                            ? ""
                            : "pl-1"
                        } `}
                      >
                        <div className=" text-left text-sm font-bold mb-1   ">
                          {movie?.title}
                        </div>
                        <div className={"w-12 h-12"}>
                          <IconButton
                            type="CLOSE"
                            imgClassName={
                              movie.id ===
                                pageObj.selectedMovieCastAndDirector.movieId &&
                              pageObj.selectedMovieCastAndDirector.isSelected
                                ? "w-12 h-12"
                                : " hidden"
                            }
                            onClick={onCloseSelectedMovie}
                          />
                        </div>
                      </div>

                      <div
                        className={
                          movie.id ===
                            pageObj.selectedMovieCastAndDirector.movieId &&
                          pageObj.selectedMovieCastAndDirector.isSelected
                            ? "h-movie-overview overflow-y-auto scrollbar"
                            : " px-1 pb-1"
                        }
                      >
                        <div
                          className={" text-left text-xs flex flex-wrap  mb-1"}
                        >
                          {renderMovieGenres(movie)}
                        </div>
                        <div
                          className={`text-left text-xs mb-1 ${
                            movie.id ===
                              pageObj.selectedMovieCastAndDirector.movieId &&
                            pageObj.selectedMovieCastAndDirector.isSelected
                              ? " "
                              : "overview-truncate"
                          }`}
                        >
                          {movie?.overview}
                        </div>
                        {renderCasteAndDirector(movie)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
        <div className="h-24 pb-0_5 flex justify-center">
          <div>
            {pageObj.movieListLoading &&
            scrollLoadRequest.direction === LOAD_DIRECTION.DOWN
              ? "Loading..."
              : ""}
          </div>
        </div>
      </div>
    );
  };
  /*
    -----
    Main Render  :
    -----
  */
  return (
    <div className="overflow-hidden max-h-100vh">
      {renderHeader()}
      {renderMovies()}
    </div>
  );
};

export default PageMovieListing;
