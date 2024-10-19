import { Route, Routes } from 'react-router-dom';
import Feed from './routes/Feed';
import Home from './routes/Home';
import LogIn from './routes/LogIn';
import NotFound from './routes/NotFound';
import Profile from './routes/Profile';
import SignUp from './routes/SignUp';

export default function App() {
  return (
    <div
      id="App"
      className="flex flex-col items-center min-h-screen bg-white dark:bg-zinc-900"
    >
      <h1 className="sr-only">Firebase Auth App</h1>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        >
          <Route
            index
            element={<Feed />}
          />
          <Route
            path="profile"
            element={<Profile />}
          />
        </Route>
        <Route
          path="/login"
          element={<LogIn />}
        />
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </div>
  );
}
