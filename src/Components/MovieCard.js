import React from "react";
import { IMG_CDN_URL } from "../Utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="mr-3 w-32 duration-500 hover:scale-95 hover:cursor-pointer md:w-44">
      <img
        className="rounded-md"
        src={IMG_CDN_URL + posterPath}
        alt="Movie Card"
      />
    </div>
  );
};

export default MovieCard;
