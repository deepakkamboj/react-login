import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import dcLight from '../assets/devchallenges-light.svg';
import dc from '../assets/devchallenges.svg';
import { UserContext } from '../contexts/UserContext';
import { emailSignUp } from '../firebase';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const { currentUser, darkMode } = useContext(UserContext);
  const nav = useNavigate();

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    await emailSignUp(data);
  };
  const onError = (errors, e) => console.log(errors, e);

  useEffect(() => {
    if (currentUser) nav('/');
  }, [currentUser, nav]);

  return (
    <div
      id="SignUp"
      className="flex max-w-md flex-col gap-8 rounded-xl p-6 xs:m-auto xs:p-12 xs:outline xs:outline-1 xs:outline-slate-500"
    >
      <div
        id="form-header"
        className="flex flex-col gap-4"
      >
      <p>Softleo</p>
        <p className="text-xl font-bold">Join thousands of learners from around the world</p>
        <p>
          Master web development by making real-life projects. There are multiple paths for you to
          start your journey!
        </p>
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <label
          htmlFor="email"
          className="relative w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="absolute left-[10px] top-[10px] h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
          <input
            type="email"
            {...register('email')}
            id="email"
            placeholder="Email"
            className="w-full rounded bg-transparent py-2 pl-10 pr-4 outline outline-1 outline-slate-500 focus:outline-4 focus:outline-blue-500"
          />
        </label>
        <label
          htmlFor="password"
          className="relative w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="absolute left-[10px] top-[10px] h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          <input
            type="password"
            {...register('password')}
            id="password"
            placeholder="Password"
            className="w-full rounded bg-transparent py-2 pl-10 pr-4 outline outline-1 outline-slate-500 focus:outline-4 focus:outline-blue-500"
          />
        </label>
        <button
          type="button"
          className="btn-primary"
        >
          Sign Up
        </button>
      </form>
      <OAuth />
      <p className="text-center">
        Already a member?
        {' '}
        <Link
          to="/login"
          className="text-blue-500"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
