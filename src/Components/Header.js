import React, { useEffect } from "react";
import { LOGO_URL, MOBILE_LOGO, SUPPORTED_LANGUAGES } from "../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { addUser, removeUser } from "../Utils/userSlice";
import { Home, LogOut, Search } from "lucide-react";
import { toggleGptSearchView } from "../Utils/gptSlice";
import { changeLanguage } from "../Utils/configSlice";
import mobileLogo from "../assets/mobileLogo.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
      });
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };
  const handleLogoClick = () => {
    if (showGptSearch === false) return;
    dispatch(toggleGptSearchView(false));
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute z-10 flex w-full flex-row items-center justify-between bg-gradient-to-b from-black px-3 md:flex-row">
      <img
        className="h-20 w-16 cursor-pointer md:hidden"
        src={mobileLogo}
        alt="Logo"
        onClick={handleLogoClick}
      />
      <img
        className="hidden cursor-pointer md:block md:w-56"
        src={LOGO_URL}
        alt="Logo"
        onClick={handleLogoClick}
      />
      {!user && (
        <select
          className="mr-4 rounded-md border border-slate-400 bg-gray-900 px-1 py-2 text-white "
          onChange={handleLanguageChange}
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.identifier} value={lang.identifier}>
              {lang.name}
            </option>
          ))}
        </select>
      )}

      {user && (
        <div className="flex items-center ">
          {showGptSearch && (
            <select
              className="mr-4 rounded-md border border-slate-400 bg-gray-900 px-1 py-2 text-white "
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="my-auto mr-4 flex items-center rounded-md bg-purple-600 px-3 py-2 font-semibold text-white"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? (
              <Home size={20} strokeWidth={2.75} className="mr-1" />
            ) : (
              <Search size={20} strokeWidth={2.75} className="mr-1" />
            )}
            <p className="hidden md:block">
              {showGptSearch ? "Homepage" : "GPT Search"}
            </p>
          </button>
          <button
            className="my-auto flex items-center rounded-md bg-red-600 px-3 py-2 font-semibold text-white"
            onClick={handleSignOut}
          >
            <LogOut size={20} strokeWidth={2.75} className="md:hidden" />
            <p className="hidden md:block">Sign Out</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
