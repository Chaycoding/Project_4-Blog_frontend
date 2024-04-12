import { useEffect, useState } from "react";

const useStorage = (file, userName) => {
  const [status, setUrl] = useState(null);

  useEffect(() => {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("userName", userName);

    fetch("https://project-4-blogsite-backend-1.onrender.com/api/v1/upload", {
      method: "POST",
      body: formData,
    }).then((data) => {
      setUrl(data.status);
    });
  }, [file, userName]);
  return { status };
};

export default useStorage;
