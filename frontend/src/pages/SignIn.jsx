import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/userSlice";

const SignIn = () => {
  const [formData, setFormData] = useState([]);
  const { error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto my-4">
      <h1 className="text-3xl text-center font-semibold my-8">Sign In</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="p-3 border rounded-xl outline-none"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="p-3 border rounded-xl outline-none"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-green-700 p-2 text-white text-center rounded-lg hover:opacity-80 uppercase disabled:opacity-70"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <p className="text-md text-red-500">{error}</p>
      <Link to={"/forgot-password"}>
        <button className="text-lg  text-center mt-4">Forgot Password ?</button>
      </Link>
      <OAuth />
      <div className="flex gap-3 mt-7 ml-2">
        <h1>I don't have an account ?</h1>
        <Link to={"/sign-up"}>
          <span className="text-slate-700">Sign Up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
