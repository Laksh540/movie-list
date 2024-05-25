import React from "react";
import { useHref } from "react-router-dom";
import movieFixLogo from "../../assets/custom-moviefix-logo.svg";
import Button from "../../Components/Button/Button";
import { BUTTON_VARIANT } from "../../constants";

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
  /*
    -----
    Use Effect
    -----
  */

  /*
    -----
    Handlers: Event handler for onChange, onBlur etc
    -----
  */

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
          stroke-width=".1"
          d="M 0 5 Q 15 0 30 5"
          pathLength="2"
        />
        <text
          font-size="5"
          fill="red"
          fontWeight="bold"
          letter-spacing="0.8"
          dominant-baseline="hanging"
          text-anchor="middle"
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
          {genres.map((genre: any, key: number) => (
            <div className="w-fit mr-1">
              <Button label={genre.name} variant={BUTTON_VARIANT.PRIMARY} />
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
  return <div>{renderHeader()}</div>;
};

export default PageMovieListing;
