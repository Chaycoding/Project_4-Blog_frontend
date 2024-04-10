function Footer({ dark }) {
  let darkcheck = dark ? "bg-gray-900 text-white" : "bg-white text-black";
  let darkmode = `w-full h-72 transition-all duration-500 ${darkcheck}`;
  return (
    <div className="w-full h-11 ">
      <div className={darkmode}></div>

      <div className="w-full h-20 bg-slate-600">
        <p className="text-center pt-7 text-white text-xl font-semibold">
          &copy; 2023 Chaylogs. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
