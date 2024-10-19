import {Link} from 'react-router-dom';

export default function NotFound() {
  return (
    <div id="NotFound">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}
