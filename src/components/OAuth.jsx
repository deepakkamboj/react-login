import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth';
import Github from '../assets/Github.svg';
import Google from '../assets/Google.svg';
import Twitter from '../assets/Twitter.svg';
import Facebook from '../assets/Facebook.svg';
import { oAuthSignIn } from '../firebase';

export default function OAuth() {
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const twitterProvider = new TwitterAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  return (
    <div id="OAuth">
      <p className="mb-4 text-center">or continue with these social profiles</p>
      <div
        id="providers"
        className="flex justify-center gap-4"
      >
        <button
          type="button"
          onClick={() => oAuthSignIn(googleProvider)}
          className="rounded-full hover:bg-blue-500/10 dark:hover:bg-white/10"
        >
          <img
            src={Google}
            alt="google logo"
          />
        </button>
        <button
          type="button"
          onClick={() => oAuthSignIn(githubProvider)}
          className="rounded-full hover:bg-blue-500/10 dark:hover:bg-white/10"
        >
          <img
            src={Github}
            alt="github logo"
          />
        </button>
        <button
          type="button"
          onClick={() => oAuthSignIn(twitterProvider)}
          className="rounded-full hover:bg-blue-500/10 dark:hover:bg-white/10"
        >
          <img
            src={Twitter}
            alt="twitter logo"
          />
        </button>
        <button
          type="button"
          onClick={() => oAuthSignIn(facebookProvider)}
          className="rounded-full hover:bg-blue-500/10 dark:hover:bg-white/10"
        >
          <img
            src={Facebook}
            alt="facebook logo"
          />
        </button>
      </div>
    </div>
  );
}
