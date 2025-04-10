import desktopLogo from '../assets/desktoplogo.png';

export const LOGO_URL ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnQAbzCcLTULhlRw5YrnJdxpl5W09wvRj9JQhJk0sMD-qkc_lc5fg2HMS5UkmSJCIJdj8&usqp=CAU"
  

export const BG_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDBAPI,
    
    
  },
};

export const API_OPTIONS_1 = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: 
    "Bearer " + process.env.REACT_APP_TMDBAPI2,
    
    
  },
};
// console.log(process.env.REACT_APP_TMDB_API);

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// export const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;



export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hi", name: "Hindi" },
  { identifier: "sp", name: "Spanish" },
  { identifier: "fr", name: "French" },
];
