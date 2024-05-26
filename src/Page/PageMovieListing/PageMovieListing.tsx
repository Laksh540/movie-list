import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useHref } from "react-router-dom";
import movieFixLogo from "../../assets/custom-moviefix-logo.svg";
import Button from "../../Components/Button/Button";
import { BUTTON_VARIANT, ICON_BUTTON_TYPE } from "../../constants";
import IconButton from "../../Components/IconButton/IconButton";

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];
const PageMovieListing = () => {
  /*
    -----
    Use State
    -----
  */
  const [isLeftScrollButtonPressed, setIsLeftScrollButtonPressed] =
    useState(false);
  const [isRightScrollButtonPressed, setIsRightScrollButtonPressed] =
    useState(false);

  const filterContainerRef = useRef<HTMLDivElement>(null);
  /*
    -----
    Use Effect
    -----
  */

  //   useEffect(() => {
  //     while (isLeftScrollButtonPressed) {
  //       if (filterContainerRef.current) {
  //         filterContainerRef.current.scrollLeft -= 1;
  //       }
  //     }
  //   }, [isLeftScrollButtonPressed]);

  //   useEffect(() => {
  //     while (isRightScrollButtonPressed) {
  //       if (filterContainerRef.current) {
  //         filterContainerRef.current.scrollLeft += 1;
  //       }
  //     }
  //   }, [isRightScrollButtonPressed]);

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

  const onPressScrollLeftForFilter = () => {
    setIsLeftScrollButtonPressed(true);
  };

  const onReleaseScrollLeftForFilter = () => {
    setIsLeftScrollButtonPressed(false);
  };

  const onScrollRightForFilter = () => {
    console.log(filterContainerRef?.current?.scrollLeft, "scrollRight");
    if (filterContainerRef.current) {
      filterContainerRef.current.scrollLeft += 240;
      filterContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onPressScrollRightForFilter = () => {
    setIsRightScrollButtonPressed(true);
  };

  const onReleaseScrollRightForFilter = () => {
    setIsRightScrollButtonPressed(false);
  };
  /* 
    -----
    Helper Functions:
    -----
  */

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
  const renderHeader = () => {
    return (
      <div className="bg-dark-gray px-1">
        <div className="mb-2">
          <div className=" w-140">{renderCustomMovifixLogo()}</div>
        </div>
        {/* red color #ff4747 */}
        <div className="flex">
          <div className="w-24 h-24 mr-1">
            <IconButton
              type={ICON_BUTTON_TYPE.LEFT_ARROW}
              onClick={onScrollLeftForFilter}
              onMouseDown={onPressScrollLeftForFilter}
              onMouseUp={onReleaseScrollLeftForFilter}
              imgClassName="w-24 h-24"
            />
          </div>
          <div
            className="flex overflow-x-auto filter-container pb-1"
            ref={filterContainerRef}
          >
            {genres.map((genre: any, key: number) => (
              <div className="w-fit mr-1 flex-shrink-0 " key={key}>
                <Button label={genre.name} variant={BUTTON_VARIANT.PRIMARY} />
              </div>
            ))}
          </div>
          <div className=" w-24 h-24 ml-1">
            <IconButton
              type={ICON_BUTTON_TYPE.RIGHT_ARROW}
              onClick={onScrollRightForFilter}
              onMouseDown={onPressScrollRightForFilter}
              onMouseUp={onReleaseScrollRightForFilter}
              imgClassName="w-24 h-24"
            />
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
  return <div>{renderHeader()}</div>;
};

export default PageMovieListing;
