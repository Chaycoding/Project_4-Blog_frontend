import { Route, Routes, useLocation } from "react-router-dom";
import Mainpage from "./mainpage";
import Blogpost from "./blog";
import Uploadcontent from "./upload";
import LoginPage from "./login";
import Header from "./header";
import { useState } from "react";
import { auth } from "./firebase/config";
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import UserProfile from "./userProfile";
import Footer from "./footer";

function RoutesWithAni() {
  const [isFirstMount, setIsFirstMount] = useState(true);
  const [isAuth, setIsAuth] = useState(null);
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState({
    displayName: (
      <div>
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="space-y-3">
              <div className="h-2 grid grid-cols-3 gap-10 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    ),
  });

  useEffect(() => {
    setInterval(() => {
      const user = auth.currentUser;
      setUser(user);
    }, 1500);
  }, []);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
    });
  };

  useEffect(() => {
    if (localStorage.getItem("isAuth") != null && user != null) {
      setIsAuth(true);
    }
  }, [user, setIsAuth]);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsFirstMount(false);
    }
  }, [location.pathname]);

  return (
    <div>
      <Header isAuth={isAuth} button={signUserOut} user={user} dark={dark} />
      <Routes location={location} key={location.key}>
        <Route
          path="/"
          element={
            <Mainpage
              isAuth={isAuth}
              setIsAuth={setIsAuth}
              dark={dark}
              isFirstMount={isFirstMount}
              user={user}
            />
          }
        />
        <Route path="/createpost" element={<Uploadcontent user={user} />} />
        <Route
          path="/post/:id"
          element={<Blogpost dark={dark} setDark={setDark} />}
        />
        <Route path="/login" element={<LoginPage setIsAuth={setIsAuth} />} />
        <Route path="/userProfile" element={<UserProfile />} />
      </Routes>
      <Footer dark={dark} />
    </div>
  );
}

export default RoutesWithAni;
