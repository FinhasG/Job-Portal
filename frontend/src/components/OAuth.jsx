import React, { useState } from "react";
import { app } from "../Firebase/firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const [error,setError]=useState();
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const res = await signInWithPopup(auth, provider);
      //console.log(res);
      
      const response=await fetch ('/api/auth/google',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:res.user.displayName,
          email:res.user.email,
          avatar:res.user.photoURL
        })
      });
      const data=await response.json();
      if(data.success===false){
        setLoading(false)
      }
     navigate('/')
    } catch (error) {
      console.log("error");
    }
  };

  const handleFacebookLogin= async()=>{
    try {
      const provider = new FacebookAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res=await fetch('/api/auth/facebook',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:result.user.displayName,
          photo:result.user.photoURL
        })
      });
      const data=await res.json();
      if(data.success===false){
        setLoading(false)
      }
      console.log(data)
      navigate('/')
    } catch (error) {
      console.log("error")
    }
  }

  const handleGithubLogin= async()=>{
    const provider=await new GithubAuthProvider();
    const auth=getAuth();
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    console.log(user)
    
  })
  }

  return (
    <div>
      <h1 className="text-xl text-center mt-1">OR</h1>
      <div className="flex flex-col gap-3 mt-3">
      <button onClick={handleGoogleLogin} className="text-lg bg-blue-500 p-2 text-white text-center rounded-lg hover:opacity-80 disabled:opacity-70">
          Continue with Google
        </button>
        <button onClick={handleFacebookLogin} className="bg-slate-700 p-2 text-white text-center rounded-lg hover:opacity-80 uppercase disabled:opacity-70">facebook</button>
        <button onClick={handleGithubLogin} className="bg-slate-700 p-2 text-white text-center rounded-lg hover:opacity-80 uppercase disabled:opacity-70">github</button>
      </div>
      </div>
   
  );
};

export default OAuth;
