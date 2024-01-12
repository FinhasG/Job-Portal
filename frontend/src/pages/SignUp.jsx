import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData]=useState([]);
  const [error, setError]=useState(null);
  const [loading, setLoading]=useState(false);
  const navigate=useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res=await fetch('/api/auth/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData)
      });
      const data=await res.json();
      if(data.success===false){
        setLoading(false)
        return;
      }
      setLoading(false);
      navigate('/sign-in')
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  return (
    <div className="p-4 max-w-lg mx-auto my-4">
      <h1 className="text-3xl text-center font-semibold my-8">Create a new account</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="First Name"
          id="firstname"
          className="p-3 border rounded-xl outline-none"
          onChange={handleChange}
        />
         <input
          type="text"
          placeholder="Last Name"
          id="lastname"
          className="p-3 border rounded-xl outline-none"
          onChange={handleChange}
        />
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
        <button className="bg-slate-600 p-2 text-white text-center rounded-lg hover:opacity-70 uppercase">Sign Up</button>
      </form>
      <div className="flex gap-3 mt-2 ml-2">
        <h1>Already have an account ?</h1>
        <Link to={'/sign-in'}>
          <span className="text-slate-700">Sign In</span>
          </Link>
      </div>
    </div>
  );
};

export default SignUp;
