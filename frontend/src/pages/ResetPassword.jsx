import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword= () => {
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id,token}=useParams();

  console.log(password)

  const handleChange = (e) => {
    e.preventDefault();
    setPassword({[e.target.id]:e.target.value})
  }
  const updatePassword= async()=>{
  
      try {
        const res = await fetch(`/api/auth/resetPassword/${id}/${token}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(password),
        });
        const data = await res.json();
      console.log(data)
        if (data.success === false) {
          setLoading(false);
          return;
        }
        setLoading(false);
        navigate('/login')
        
      
      } catch (error) {
        setError(error)
      }
    }

  return (
    <div className="p-4 max-w-lg mx-auto my-10">
      <form onSubmit={updatePassword} className="flex flex-col gap-5 mt-4">
        <input
          type="password"
          placeholder="new password"
          id="password"
          className="p-3 border rounded-xl outline-none"
          onChange={handleChange}
        />
        <button className="bg-slate-700 p-2 text-white text-center rounded-lg hover:opacity-70">
          Update
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
