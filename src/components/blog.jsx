import useFetchBlogs from "./hooks/useFetchBlogs";
import PageSwitchAni from "./transitionAnimation/pageAni";
import { useEffect, useState } from "react";

function Blogpost() {
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf("/") + 1);
  const { data } = useFetchBlogs(`http://localhost:5000/api/v1/${id}`);

  const [contentlisttt] = useState([]);
  const useProgressiveImage = (src) => {
    const [sourceLoaded, setSourceLoaded] = useState(null);

    useEffect(() => {
      const img = new Image();
      img.src = src;
      img.onload = () => setSourceLoaded(src);
    }, [src]);

    return sourceLoaded;
  };

  const loaded = useProgressiveImage(data.image);

  useEffect(() => {
    let contentlist = data.content
      ? data.content.split(/(?!.)/g).filter(function (v, i) {
          return i % 2 == 0;
        })
      : false;
    if (contentlist) {
      contentlist.map((x, i) => {
        contentlisttt.push(
          <p className="mt-10" key={i}>
            {x}
          </p>
        ),
          console.log(contentlisttt);
      });
    }
  }, [data]);

  return (
    <div className="pb-[100rem] bg-gray-900">
      <PageSwitchAni />
      <div
        className="h-[32rem] rounded-lg -mt-[5rem] flex bg-cover bg-center justify-center"
        style={{
          backgroundImage: `url(${loaded || data.thumbnailImg})`,
        }}
      ></div>
      <div className="flex justify-end text-slate-300 mt-10 mr-20">
        <p>{data.date}</p>
      </div>
      <div className="flex">
        <div className="basis-5/6">
          <div className="text-white text-xl leading-10 px-28 mt-20">
            <h1 className="text-4xl text-center heading w-full justify-center flex items-center  rounded-xl mt-32 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              {data.title}
            </h1>
            {contentlisttt.map((x) => x)}
            <h1 className="text-center text-6xl mt-20">. . .</h1>
          </div>
        </div>
        <div className=" sticky top-0 text-white h-96 flex justify-center items-center flex-col pt-40">
          <img src={data.userimage} className="h-20 w-20 rounded-full" alt="" />
          <h1 className="mt-5">{data.name && "By " + data.name}</h1>
        </div>
      </div>
    </div>
  );
}

export default Blogpost;
