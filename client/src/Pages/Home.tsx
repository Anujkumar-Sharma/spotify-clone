import { useEffect, useState } from "react";
import Card from "../components/Cards/Card";
import Searchbar from "../components/Searchbar/Searchbar";
import Modal from "../components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { MdEdit } from "react-icons/md";
import { istrue } from "../Slices/drawerSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [selected, setSelected] = useState("All");
  const [modalType, setModalType] = useState<any>("");
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const backendUrl = import.meta.env.VITE_BACKENDURL;

  const dispatch = useDispatch();
  const isDrawer = useSelector((state: RootState) => state.drawerSlice.value);

  const [playListData, setPlayListData] = useState<any>([]);

  const [data, setData] = useState([]);

  const handleClick = (type: string) => {
    setModalType(type);
    dispatch(istrue());
  };
  const naviagte = useNavigate();
  const accessToken = localStorage.getItem("apiKey");

  useEffect(() => {
    if (!accessToken) {
      naviagte("/login");
    }
  }, [accessToken]);

  const fetchTracksOfPlaylist = (playlistId: string) => {
    const token = localStorage.getItem("apiKey");

    axios
      .get(`${backendUrl}/playlist/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data.tracks?.tracks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCategoryClick = (category: any) => {
    setSelected(category.name);
    setModalType(category.name === "All" ? "" : "edit");
    if (category?._id) {
      setSelectedPlaylist(category?._id);
      fetchTracksOfPlaylist(category?._id);
    }
  };

  const removeFromPlaylist = (playlistId: string, trackId: string) => {
    const token = localStorage.getItem("apiKey");

    axios
      .put(
        `${backendUrl}/playlist/user-playlist`,
        { playlistId, trackId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        fetchTracksOfPlaylist(playlistId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (query: string) => {
    const token = localStorage.getItem("apiKey");

    axios
      .get(`${backendUrl}/tracks-search?search=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data.tracks?.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (selected === "All") {
      const token = localStorage.getItem("apiKey");
      setSelectedPlaylist("");
      axios
        .get(`${backendUrl}/tracks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data.tracks);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get(`${backendUrl}/playlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setPlayListData(response.data.playlists);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selected]);

  return (
    <div className="mt-[100px] flex flex-col gap-4 px-4 sm:px-6 md:px-8 lg:px-12">
      {/* Playlist list */}
      <div className="w-full flex justify-center md:justify-end">
        <Searchbar handleSearch={handleSearch} />
      </div>
      <div className="flex overflow-x-auto gap-2 pb-4">
        {[{ name: "All" }, ...playListData].map((category: any) => (
          <div
            key={category.name}
            onClick={() => handleCategoryClick(category)}
            className={`min-w-[100px] rounded-2xl flex items-center p-2 px-4 text-xs md:text-sm font-medium focus:outline-none border border-green-400 hover:cursor-pointer uppercase ${
              selected === category.name
                ? "bg-green-600 text-white"
                : "bg-white text-green-600 hover:text-green-700 focus:ring-4 focus:ring-green-100"
            } ${
              selected === category.name && category.name !== "All"
                ? "justify-between px-2 items-center"
                : "justify-center"
            }`}
          >
            {category.name}
            {selected === category.name && category.name !== "All" && (
              <MdEdit
                className="ml-2 text-white text-base md:text-lg"
                onClick={() => handleClick("edit")}
              />
            )}
          </div>
        ))}
      </div>
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.length > 0 &&
          data.map((data: any) => (
            <>
              <Card
                key={data?.id}
                image={data?.album?.images[0].url}
                title={data.name}
                description={data.artists.map((e: any) => e.name).join(",")}
                type={modalType}
                selectedPlaylist={selectedPlaylist}
                removeFromPlaylist={removeFromPlaylist}
                trackId={data?.id}
              />
            </>
          ))}
        <Modal
          isDrawer={isDrawer}
          type={modalType}
          setPlayListData={setPlayListData}
          playListData={playListData}
        />
      </div>
    </div>
  );
};

export default Home;
