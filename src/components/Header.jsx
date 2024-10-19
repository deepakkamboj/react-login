import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { func } from 'prop-types';
import dcLight from '../assets/devchallenges-light.svg';
import dc from '../assets/devchallenges.svg';
import { UserContext } from '../contexts/UserContext';
import { firebaseSignOut } from '../firebase';

function Dropdown({ setIsDropDownOpen }) {
  const nav = useNavigate();

  function handleClickProfile(e) {
    e.stopPropagation();
    nav('/profile');
  }

  function handleClickLogOut(e) {
    e.stopPropagation();
    firebaseSignOut();
  }

  useEffect(() => {
    const closeDropdown = () => setIsDropDownOpen(false);
    window.addEventListener('click', closeDropdown);

    return () => {
      window.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <div className="absolute right-0 top-14 w-40 rounded p-2 flex flex-col gap-2 outline outline-1 outline-zinc-300 dark:outline-zinc-700 bg-slate-100 dark:bg-zinc-800">
      <button
        type="button"
        onClick={handleClickProfile}
        className="flex items-center p-2 rounded gap-2 hover:bg-slate-200 dark:hover:bg-zinc-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
            clipRule="evenodd"
          />
        </svg>
        <p>My Profile</p>
      </button>
      <hr className="opacity-20" />
      <button
        type="button"
        onClick={handleClickLogOut}
        className="flex items-center p-2 rounded gap-2 hover:bg-slate-200 dark:hover:bg-zinc-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 fill-red-500"
        >
          <path
            fillRule="evenodd"
            d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
            clipRule="evenodd"
          />
        </svg>
        <p>Log Out</p>
      </button>
    </div>
  );
}

export default function Header() {
  const { currentUser, darkMode } = useContext(UserContext);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  function handleClickDropdown(e) {
    e.stopPropagation();
    setIsDropDownOpen((prev) => !prev);
  }

  return (
    <header className="sticky flex w-full justify-between px-12 py-8">
      <Link to="/">
        <img
          src={darkMode ? dcLight : dc}
          alt="devchallenges logo"
          className="mb-4 max-w-[120px]"
        />
      </Link>
      <button
        type="button"
        onClick={handleClickDropdown}
        className="relative flex gap-4 items-center p-2 w-40 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded"
      >
        <img
          src={currentUser?.photoURL}
          alt=""
          className="w-8 h-8 object-cover rounded"
        />
        <p className="font-bold">{currentUser?.displayName || currentUser?.email}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 ml-auto"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
        {isDropDownOpen && <Dropdown setIsDropDownOpen={setIsDropDownOpen} />}
      </button>
    </header>
  );
}

Dropdown.propTypes = {
  setIsDropDownOpen: func.isRequired,
};
