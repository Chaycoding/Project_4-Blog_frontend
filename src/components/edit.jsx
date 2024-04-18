import React, { useState } from "react";
import Progressbar from "./progressBar";
import PageSwitchAni from "./transitionAnimation/pageAni";
import useRetrieveUrl from "./hooks/useRetrieveUrl";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdOutlineCancel } from "react-icons/md";
function Editcontent({ user, seteditcheck, editcheck, data, id }) {
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const [files, setFiles] = useState(null);
  const [imgurl, setimgurl] = useState({ mainImg: null, thumbnailImg: null });
  const [imageUrl, setImageUrl] = useState(false);

  const MainimgUrl = useRetrieveUrl(imgurl.mainImg);
  const ThumbimgUrl = useRetrieveUrl(imgurl.thumbnailImg);
  useEffect(() => {
    if (ThumbimgUrl && MainimgUrl) {
      setImageUrl({ MainimgUrl, ThumbimgUrl });
    }
  }, [MainimgUrl, ThumbimgUrl]);

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    let dicone = {
      name: name || user.displayName,
      content: content,
      email: email || user.email,
      title: title,
    };
    let dictwo = {
      name: name || user.displayName,

      title: title,
      id: id,
    };
    if (imageUrl) {
      dicone[image] = imageUrl.MainimgUrl;
      dicone[thumbnailImg] = imageUrl.ThumbimgUrl;

      dictwo[thumbnailImg] = imageUrl.ThumbimgUrl;
    }

    fetch(`https://project-4-blogsite-backend-1.onrender.com/api/v1/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dicone),
    })
      .then((res) => res.json())
      .then((json) =>
        fetch(
          `https://project-4-blogsite-backend-1.onrender.com/api/v1/thumb/${id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dictwo),
          }
        )
      )
      .catch((error) => console.log(error));

    navigate("/");
  };
  const updateItem = (e) => {
    let selected = e.target.files[0];
    if (selected && files != selected) {
      setFiles(selected);
    }
  };
  console.log(user);
  return (
    <div className=" mt-20">
      <PageSwitchAni />

      <div>
        <div className="flex justify-end pr-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="font-semibold hover:cursor-pointer  bg-white border-black hover:bg-black text-black hover:text-white text-2xl transition-all duration-[200ms] border  rounded-xl px-5 p-2 "
            onClick={() => seteditcheck(!editcheck)}
          >
            <MdOutlineCancel />
          </motion.button>
        </div>
        <h1 className="text-center text-6xl  pb-28">Make your own blog</h1>
        <form
          method="POST"
          id="form"
          onSubmit={(e) => submit(e)}
          className="text-2xl px-36 grid text-black gap-y-10 grid-cols-2"
        >
          <p className="col-span-2 text-[2.7rem] ">Author details</p>
          <hr />
          <span />

          <label htmlFor="name">What's your name?</label>
          <input
            className="border border-[#237477]  rounded-3xl pl-5"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="name">What's your email?</label>
          <input
            className="border border-[#237477]  rounded-3xl pl-5"
            type="text"
            name="name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="col-span-2 text-[2.7rem] mt-10">Blog</p>
          <hr />
          <span />
          <label htmlFor="name">What's your blog title?</label>
          <input
            className="border border-[#237477]  rounded-3xl pl-5"
            type="text"
            name="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="content">What's your story?</label>
          <textarea
            className="border col-span-2 h-80 border-[#237477] rounded-3xl pl-5 pt-5"
            type="text"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <p>
            You can upload an image if you'd like.
            <br />
            It should be horizontally wide.
          </p>
          <label className="hover:cursor-pointer flex justify-center items-center hover:bg-black hover:text-white transition-all duration-[300ms] border border-[#237477] rounded-3xl text-3xl pb-2">
            Upload file
            <input
              type="file"
              name="content"
              accept="image/*"
              onChange={updateItem}
            />
          </label>
          {files && <div>{files.name}</div>}
          {files && (
            <Progressbar
              file={files}
              setimgurl={setimgurl}
              imageUrl={imageUrl}
              userName={"edited"}
            />
          )}
          {imageUrl && <h1>Everything's ready </h1>}

          <button className="hover:bg-black hover:text-white text-4xl col-span-2 border border-white hover:border-transparent transition-all duration-[300ms] rounded-r-3xl rounded-l-3xl py-2 px-4 pb-[12px]">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Editcontent;
