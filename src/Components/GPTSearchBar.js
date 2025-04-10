import React, { useRef, useState } from "react";
import openai from "../Utils/openAi";
import { API_OPTIONS_1 } from "../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addGptMovieResult } from "../Utils/gptSlice";
import lang from "../Utils/languageConstants";

const GPTSearchBar = () => {
  const searchText = useRef(null);
  const langKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();

  const [showLimitModal, setShowLimitModal] = useState(false);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS_1
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    try {
      const gptQuery =
        "Act as a Movie Recommadation System and suggest some movies for the query :" +
        searchText.current.value +
        ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Koi Mil Gya, Golmaal";

      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      const gptMovies = gptResults.choices[0]?.message.content.split(",");

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      console.error("OpenAI API error:", error);

      // Show modal on API limit or quota error
      if (
        error.message.toLowerCase().includes("quota") ||
        error.message.toLowerCase().includes("limit") ||
        error.message.toLowerCase().includes("exceeded")
      ) {
        setShowLimitModal(true);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="mx-2 grid w-screen grid-cols-12 bg-black p-4 md:w-1/2"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="col-span-9 mr-3 rounded-sm p-3 text-sm md:text-base"
          placeholder={lang[langKey].gptSearchPlaceHolder}
        />
        <button
          className="col-span-3 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white md:text-base"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>

      {/* Modal */}
      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="rounded-lg bg-white p-6 shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold text-red-600 mb-2">Limit Exceeded</h2>
            <p className="text-gray-700 mb-4">
              You have exhausted your ChatGPT usage limit. Please try again later.
            </p>
            <button
              onClick={() => setShowLimitModal(false)}
              className="mt-2 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GPTSearchBar;
