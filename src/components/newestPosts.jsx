import { Link } from "react-router-dom";
import img from "./images/high quality/bal.webp";
import Game from "./thegame";
import { useEffect, useState } from "react";

function Newestposts() {
  const [data, setData] = useState([]);
  const [firstpost, setfirstpost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stat, setStat] = useState(0);

  useEffect(() => {
    fetch(
      "https://project-4-blogsite-backend-1.onrender.com/api/v1/blogOverview"
    )
      .then((res) => res.json())
      .then((json) => {
        let inter = json["blogs"];
        let interfirst = inter.pop();
        let intersecond = inter.pop();
        let interthird = inter.pop();
        setfirstpost([interfirst, intersecond, interthird]);
        setData(inter);
      })
      .catch((error) => console.log(error));
  }, [stat]);

  useEffect(() => {
    if (data.length !== 0) {
      setLoading(true);
    }
  }, [data]);

  if (loading == false) {
    setTimeout(() => {
      setStat(stat + 1);
    }, 5000);
  }

  const content =
    loading == true ? (
      <div className="px-10">
        <div className="grid grid-cols-3 gap-x-10">
          <div className="col-span-2 content-center grid transition-all">
            <Link
              className="hover:cursor-pointer h-full"
              to={`/post/${firstpost[0].id}`}
            >
              <div className="bg-black rounded-md">
                <img
                  className="h-96 rounded-md w-full   transition-all duration-200 hover:opacity-80"
                  loading="lazy"
                  src={firstpost[0].thumbnailImg || img}
                  alt="Something went wrong"
                ></img>
              </div>
              <div className="flex flex-col mt-2 ">
                <div className="flex  items-center justify-end">
                  <p className="text-lg pr-2">By {firstpost[0].name}</p>
                  <img
                    src={firstpost[0].userimage}
                    alt=""
                    loading="lazy"
                    className="rounded-full h-7 w-7"
                  />
                </div>
                <p className="text-2xl font-semibold ">{firstpost[0].title}</p>
              </div>
            </Link>
          </div>
          <div className="grid gap-5">
            <Link
              className="hover:cursor-pointer "
              to={`/post/${firstpost[1].id}`}
            >
              <div className="bg-black  rounded-md">
                <img
                  className=" rounded-md  transition-all duration-200 hover:opacity-80"
                  loading="lazy"
                  src={firstpost[1].thumbnailImg || img}
                  alt="Something went wrong"
                ></img>
              </div>

              <div className="flex flex-col">
                <p className="text-lg font-semibold ml-2 ">
                  {firstpost[1].title}
                </p>
              </div>
            </Link>
            <Link
              className="hover:cursor-pointer "
              to={`/post/${firstpost[2].id}`}
            >
              <div className="bg-black  rounded-md">
                <img
                  className=" rounded-md  transition-all duration-200 hover:opacity-80"
                  loading="lazy"
                  src={firstpost[2].thumbnailImg || img}
                  alt="Something went wrong"
                ></img>
              </div>

              <div className="flex flex-col ">
                <p className="text-lg font-semibold ml-2 ">
                  {firstpost[2].title}
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="mt-40 grid grid-cols-3 gap-x-10 gap-y-32">
          {data.map((x) => {
            const link = `/post/${x.id}`;
            return (
              <div className=" transition-all  rounded-lg " key={x._id}>
                <Link className="hover:cursor-pointer " to={link}>
                  <div className="bg-black h-56 rounded-md">
                    <img
                      className=" rounded-md h-full w-full transition-all duration-200 hover:opacity-80"
                      loading="lazy"
                      src={x.thumbnailImg || img}
                      alt="Something went wrong"
                    ></img>
                  </div>

                  <div className="flex flex-col mt-2 mr-2">
                    <div className="flex w-full items-center justify-end">
                      <p className="text-sm pr-2">By {x.name}</p>
                      <img
                        src={x.userimage}
                        alt=""
                        loading="lazy"
                        className="rounded-full  h-5 w-5"
                      />
                    </div>
                    <p className="text-xl font-bold ml-2 ">{x.title}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      <div className="flex  flex-col items-center">
        <span className="text-3xl">Loading... Enjoy a game while you wait</span>
        <div class="flex space-x-2 justify-center items-center bg-white h-20 dark:invert">
          <div class="h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.075s]"></div>
          <div class="h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.037s]"></div>
          <div class="h-3 w-3 bg-black rounded-full animate-bounce"></div>
        </div>
        <Game />;
      </div>
    );

  return <div>{content}</div>;
}

export default Newestposts;
