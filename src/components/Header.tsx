import React from "react";
import { Link } from "react-router-dom";

export const Header = (): JSX.Element => {
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
      <div className="flex-grow block w-full lg:flex lg:items-center lg:w-auto" />
    </nav>
  );
};
