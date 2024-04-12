import { Link } from "react-router-dom";
import { useScrollPosition } from "./hooks/useScrollPosition";
import { RiBearSmileFill } from "react-icons/ri";

function Header({ isAuth, button, user, dark }) {
  const scrollPosition = useScrollPosition();
  const scrollColour = scrollPosition > 0 ? "anicol" : "aniRevcol ";
  const scrollColouricon =
    scrollPosition > 0 ? "text-[#007FFF]" : "text-black ";
  const scrollHeader = `sticky top-0 z-10 duration-[1s] transition-all ${scrollColour}`;
  const headericon = ` mb-4 inline-block transition-all duration-[1s]  text-5xl ${scrollColouricon}`;
  const darkcheck =
    scrollPosition > 0
      ? dark
        ? "bg-[#121212] text-white"
        : "bg-white text-black"
      : "";
  const darkstyle = `w-full h-20 hidden items-end px-10 justify-between transition-all duration-[1s] sm:flex  ${darkcheck}`;

  return (
    <div className={scrollHeader}>
      <div className={darkstyle}>
        <div className="font-[Open Sans]  ">
          <Link to="/">
            <button className="  font-semibold ">
              <RiBearSmileFill className={headericon} />
              <span className="text-4xl ml-2 font-bold">Chaylogs</span>
            </button>
          </Link>
        </div>
        <div className="font-[Open Sans]  ">
          {isAuth === true && user ? (
            <div className="mb-2 flex h-[5rem] items-center justify-end">
              <img
                src={user.photoURL}
                alt="profile pic"
                referrerPolicy="no-referrer"
                className="rounded-full h-10 mt-3 mr-3 w-10 "
              />
              <Link to="/userProfiledesdsf">
                <button className="text-[25px] mt-3  pr-5">
                  {user.displayName}
                </button>
              </Link>
              <button
                className="text-[25px] mt-3  hover:outline rounded-lg p-2  transition-all font-semibold"
                onClick={button}
              >
                Log out
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <button className="text-[25px] mb-3 ml-10 hover:outline rounded-lg p-2 transition-all font-semibold">
                  Sign in
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
