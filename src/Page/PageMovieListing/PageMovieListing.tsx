import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useHref } from "react-router-dom";
import movieFixLogo from "../../assets/custom-moviefix-logo.svg";
import Button from "../../Components/Button/Button";
import { BUTTON_VARIANT, ICON_BUTTON_TYPE } from "../../constants";
import IconButton from "../../Components/IconButton/IconButton";
import MovieService from "../../Services/MovieService";

interface IGenres {
  id: number;
  name: string;
}

interface IPageObj {
  allGenres: IGenres[];
  allGenresLoading: boolean;
}

const initialPageObj: IPageObj = {
  allGenres: [],
  allGenresLoading: false,
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
      console.log("res ", res);
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

  /*
    -----
    Main Render  :
    -----
  */
  return <div>{renderHeader()}</div>;
};

export default PageMovieListing;
