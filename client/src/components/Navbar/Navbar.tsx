import { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import profile from "../../assets/user.jpeg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef<any>(null);
  const [data, setData] = useState<any>(null);
  const navigate = useNavigate();

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKENDURL;
    const token = localStorage.getItem("apiKey");

    axios
      .get(`${backendUrl}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data.user);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
        
      });
  }, []);


  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-200 dark:border-gray-700 transition-all duration-500 flex justify-center">
      <div className="px-4 py-3 lg:px-6 lg:py-4 w-[90%]  flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={logo}
            className="w-8 md:w-9 rounded-full"
            alt="FlowBite Logo"
          />
          <span className="text-xl font-semibold sm:text-2xl m-3 text-green-600 whitespace-nowrap">
            Spotify Play List
          </span>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="relative">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              onClick={() => setDropDown(!dropDown)}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={profile}
                alt="user photo"
              />
            </button>

            {dropDown && (
              <div
                ref={dropdownRef}
                className="absolute top-full right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-md shadow-lg border-2 border-gray-500 p-1 focus:outline-green-500"
              >
                <div className="px-4 py-3 bg-green-700 text-white rounded-md">
                  <p className="text-sm text-white">
                    {data?.firstName} {data?.lastName}
                  </p>
                  <p className="text-sm font-medium text-white">
                    {data?.email}
                  </p>
                </div>
                <hr />
                <ul className="py-1">
                  <li>
                    <Link to="/login">
                      <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-500 hover:text-white">
                        Sign out
                      </p>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
