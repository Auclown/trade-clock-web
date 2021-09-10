import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Header = (): JSX.Element => {
  const { user, signout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between p-6 bg-gray-600 shadow-lg mb-4">
      <div className="flex items-center mr-6 text-white flex-no-shrink">
        <Link
          className="m-4 text-3xl font-semibold tracking-tight text-yellow-300"
          to="/"
        >
          TradeClock
        </Link>
        <div className="ml-12">
          <Link className="text-yellow-300" to="/auth">
            Download
          </Link>
        </div>
      </div>
      {user ? (
        <button className="text-yellow-300 w-28" onClick={signout}>
          Sign Out
        </button>
      ) : null}
    </nav>
  );
};
