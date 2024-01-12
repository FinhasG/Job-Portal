import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  

  const handleChange = (e) => {
    e.preventDefault();
    setEmail({[e.target.id]:e.target.value})
  }
  const sendLink= async()=>{
  
      try {
        const res = await fetch("/api/auth/forgotPassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(email),
        });
        const data = await res.json();
      console.log(data)
        if (data.success === false) {
          setLoading(false);
          return;
        }
        setLoading(false);
        
      
      } catch (error) {
        setError(error)
      }
    }

  return (
    <div className="p-4 max-w-lg mx-auto my-10">
      <h1 className="text-3xl text-center font-semibold my-5">
        Trouble loggin in
      </h1>
      <p>
        Enter your email and we'll send you a link to get back into your
        account.
      </p>
      <form onSubmit={sendLink} className="flex flex-col gap-5 mt-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="p-3 border rounded-xl outline-none"
          onChange={handleChange}
        />
        <button className="bg-slate-700 p-2 text-white text-center rounded-lg hover:opacity-70">
          Send login link
        </button>
      </form>
      <p>{error}</p>
    </div>
  );
};

export default ForgotPassword;
