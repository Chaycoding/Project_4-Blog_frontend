import { HashRouter } from "react-router-dom";
import ScrollToTop from "../scrollToTop";

import { AnimatePresence } from "framer-motion";
import Locationprovider from "./locationProvider";
import RoutesWithAni from "./routesWithAni";

function Main() {
  return (
    <HashRouter>
      <AnimatePresence>
        <ScrollToTop />
        <Locationprovider>
          <RoutesWithAni />
        </Locationprovider>
      </AnimatePresence>
    </HashRouter>
  );
}

export default Main;
