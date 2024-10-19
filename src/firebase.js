// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  fetchSignInMethodsForEmail,
  getAuth,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxmhz-2HQMek9kIi3a7GJd0TnfDcpT_HM",
  authDomain: "sociallogin-dd739.firebaseapp.com",
  projectId: "sociallogin-dd739",
  storageBucket: "sociallogin-dd739.appspot.com",
  messagingSenderId: "197075812521",
  appId: "1:197075812521:web:632d3bd54033d1fd2a69b8",
  measurementId: "G-KBERK72EHB"
  /*
  apiKey: 'AIzaSyCz9X0WxeOGoRvdbIf22favHrAWqvcWFbQ',
  authDomain: 'dc-auth-app.firebaseapp.com',
  projectId: 'dc-auth-app',
  storageBucket: 'dc-auth-app.appspot.com',
  messagingSenderId: '717092564249',
  appId: '1:717092564249:web:f6ba4bed303391b2536988',
  */
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export async function emailSignUp({ email, password }) {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
  }
}

export async function emailSignIn({ email, password }) {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
  }
}

export async function oAuthSignIn(provider) {
  try {
    // Attempt to sign in with the provider
    const result = await signInWithPopup(auth, provider);
    // Handle the sign-in result
    // ...
  } catch (error) {
    if (error.code === 'auth/account-exists-with-different-credential') {
      // Fetch the list of sign-in methods for the conflicting email
      const {email} = error.customData;
      const methods = await fetchSignInMethodsForEmail(auth, email);
      
       // Check if methods array is empty
       if (methods.length === 0) {
        console.error('No associated sign-in methods found for this email.');
      } else {
        // Inform the user they should use another sign-in method
        console.error(`Please sign in using one of the following methods: ${methods.join(', ')}`);
      }
      
      
      // Optionally, offer to link the accounts
      // This part depends on your application's flow and user experience
    } else {
      // Handle other errors
      console.error(error);
    }
  }
}

export async function firebaseSignOut() {
  try {
    await signOut(auth);
  } catch (err) {
    console.log(err);
  }
}
