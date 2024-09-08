import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children }: any) => {
  const location = useLocation();

  const hideNavbarRoutes = ["/login"];

  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div>
      {showNavbar && <Navbar />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
