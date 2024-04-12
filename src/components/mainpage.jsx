import { Link } from "react-router-dom";
import React from "react";
import EntranceAni from "./transitionAnimation/entranceAni";
import PageSwitchAni from "./transitionAnimation/pageAni";
import { motion } from "framer-motion";
const Newestposts = React.lazy(() => import("./newestPosts"));

function Mainpage({ isAuth, isFirstMount, user, dark }) {
  const darkcheck = dark ? "bg-[#121212] text-white" : "bg-white text-black";
  const darkstyle = `-mt-[5rem] pb-[150rem] ${darkcheck}`;
  const darkcheck1 = dark
    ? "bg-black border-white text-white hover:text-black hover:bg-white"
    : "bg-white border-black hover:bg-black text-black hover:text-white";
  const darkstyle1 = ` font-semibold hover:cursor-pointer   transition-all duration-[200ms] border  rounded-xl text-2xl px-10 p-2 mr-10 ${darkcheck1}`;
  return (
    <div className={darkstyle}>
      {isFirstMount ? <EntranceAni /> : <PageSwitchAni />}
      <div className="h-[100rem]">
        <div className="bg-balloons bg-cover bg-center">
          <div className="w-full h-screen  flex bg-gradient-to-tr to-amber-500 via-pink-500/70 from-pink-500 pl-48 ">
            <div className="mt-44  text-white text-left glass-effect absolute ">
              <h1 className="text-8xl ">Publish your passions!</h1>
              <p className=" mt-10 text-3xl">
                Colour the page with your words. It's your canvas afterall
              </p>
            </div>
          </div>
        </div>
        {isAuth && user && (
          <div className="w-full justify-end flex pt-10">
            <Link to="/createpost">
              <motion.button whileHover={{ scale: 1.1 }} className={darkstyle1}>
                Create post
              </motion.button>
            </Link>
            <Link to="/game">
              <motion.button whileHover={{ scale: 1.1 }} className={darkstyle1}>
                Play a game!
              </motion.button>
            </Link>
          </div>
        )}
        <div className="mt-7 ">
          <h1 className="text-5xl ml-20 ">Newest</h1>
        </div>
        <div className="flex mt-10">
          <Newestposts />
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
