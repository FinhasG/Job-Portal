import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className=" bg-red-500">
        <div className="flex justify-between mx-aut0 items-center p-4">
      <h1>Job Portal</h1>
      <div className="flex gap-7">
            search
        <ul className="flex gap-3">
          <li>Home</li>
          <li>My Jobs</li>
          <li>About</li>
        </ul>
      </div>
      <div className="flex gap-3">
      <Link to={'/sign-in'}><button className="hover:underline">Sign In</button></Link>
      <Link to={'/sign-up'}><button className="hover:underline">Sign Up</button></Link>
      </div>
    </div>
    </header>
  );
};

export default Header;
