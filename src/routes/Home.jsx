import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Header from '../components/Header';

export default function Home() {
  const { currentUser } = useContext(UserContext);
  const nav = useNavigate();

  useEffect(() => {
    if (!currentUser) nav('/signup');
  }, [currentUser, nav]);

  return (
    <div
      id="Home"
      className="flex flex-col items-center w-screen max-w-6xl"
    >
      <Header />
      <div className="px-12 pb-8">
        <Outlet />
      </div>
    </div>
  );
}
