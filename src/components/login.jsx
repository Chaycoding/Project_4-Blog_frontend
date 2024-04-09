import { auth, provider } from "./firebase/config";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ setIsAuth }) {
  const navigate = useNavigate();

  const signUp = () => {
    signInWithPopup(auth, provider).then(() => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <div className="h-[80rem]  flex  justify-center">
      <div className="flex h-[30rem] w-[35%]  items-center justify-center rounded-xl bg-bottom bg-loginn bg-cover">
        <div
          className="flex text-3xl  hover:cursor-pointer hover:bg-black hover:text-white duration-300 transition-all font-extrabold items-center justify-center h-32 w-[90%] bg-white-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl  bg-opacity-100 border border-gray-100"
          onClick={signUp}
        >
          Sign in with google
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
