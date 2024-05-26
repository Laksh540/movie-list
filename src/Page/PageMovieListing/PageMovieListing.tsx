import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useHref } from "react-router-dom";
import movieFixLogo from "../../assets/custom-moviefix-logo.svg";
import Button from "../../Components/Button/Button";
import {
  BUTTON_VARIANT,
  ICON_BUTTON_TYPE,
  IMG_BASE_URL,
  MOVIE_CREW_JOB,
} from "../../constants";
import IconButton from "../../Components/IconButton/IconButton";
import MovieService from "../../Services/MovieService";

interface IGenres {
  id: number;
  name: string;
}

interface IMovieDetails {
  id: string;
  title: string;
  poster_path: string;
  genre_ids: number[];
  overview: string;
}

interface ISelectedMovieCastAndDirector {
  cast: string[];
  director: string[];
}
interface IPageObj {
  allGenres: IGenres[];
  allGenresLoading: boolean;
  movieList: IMovieDetails[];
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
    cast: [],
    director: [],
  },
  selectedMovieCastAndDirectorLoading: false,
};
const PageMovieListing = () => {
  /*
    -----
    Use State
    -----
  */
  const [pageObj, setPageObj] = useState<IPageObj>({ ...initialPageObj });
  const filterContainerRef = useRef<HTMLDivElement>(null);

  /*
    -----
    Use Effect
    -----
  */
  useEffect(() => {
    getAllGenres();
    getMovies();
    getMovieCredits();
  }, []);

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

  const getMovies = async () => {
    setPageObj((prevObj) => ({
      ...prevObj,
      movieListLoading: true,
    }));
    try {
      const res: any = await MovieService.getMovieList(
        `&primary_release_year=2023&page=1&append_to_response=credits`
      );
      console.log("res for movie list", res);
      setPageObj((prevObj) => ({
        ...prevObj,
        movieList: res?.results ?? [],
        movieListLoading: false,
      }));
    } catch (error) {
      console.log("error ", error);
      setPageObj((prevObj) => ({
        ...prevObj,
        movieListLoading: false,
      }));
    }
  };

  const getMovieCredits = async () => {
    setPageObj((prevObj) => ({
      ...prevObj,
      selectedMovieCastAndDirectorLoading: true,
    }));
    try {
      const res: any = await MovieService.getMovieCredits(940721);
      console.log("res for movie Credits", res);
      setPageObj((prevObj) => ({
        ...prevObj,
        selectedMovieCastAndDirector: { ...getCastAndDirector(res) },
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
      filterContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* 
    -----
    Helper Functions:
    -----
  */
  // const sleep = (time: number) => {
  //   return new Promise((resolve) => setTimeout(resolve, time));
  // };
  const getCastAndDirector = (data: any): ISelectedMovieCastAndDirector => {
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
        <div className="w-24 h-24 mr-1">
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
        <div className=" w-24 h-24 ml-1">
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
  const renderMovies = () => {
    return (
      <div>
        <div className="movie-list-grid">
          {pageObj?.movieList?.map((movie: IMovieDetails) => (
            <div className="movie-card">
              <img
                src={`${IMG_BASE_URL}/w500${movie?.poster_path}`}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
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
    <div>
      {renderHeader()}
      {renderMovies()}
    </div>
  );
};

export default PageMovieListing;
