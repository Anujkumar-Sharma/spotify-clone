import { useDispatch, useSelector } from "react-redux";
import { isFalse } from "../../Slices/drawerSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { playListValidationSchema } from "../../utils/validationSchema";
import axios from "axios";
import { useEffect, useState } from "react";
import showToast from "../Toast/showToast";

const Modal = ({ isDrawer, type, setPlayListData, playListData }: any) => {
  const dispatch = useDispatch();
  const [meData, setMeData] = useState<any>();
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const trackId = useSelector((state: any) => state.drawerSlice.trackId);

  const handleClose = () => {
    dispatch(isFalse());
  };

  const handleSave = () => {
    handleClose();
  };

  const handleEdit = () => {
    handleClose();
  };

  const handleSavePlaylistData = (): any => {
    const backendUrl = import.meta.env.VITE_BACKENDURL;
    const token = localStorage.getItem("apiKey");
    axios
      .post(
        `${backendUrl}/playlist/user-playlist`,
        { trackId, playlistId: selectedPlaylist },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        showToast(res.data.message, "success");

        handleClose();
      })
      .catch(() => showToast("Something went wrong", "error"));
  };

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
        setMeData(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = async (values: any) => {
    const backendUrl = import.meta.env.VITE_BACKENDURL;
    const createdBy = meData?._id;
    const updatedVals = { ...values, createdBy: createdBy };

    const token = localStorage.getItem("apiKey");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (type === "edit") {
      handleEdit();
    } else {
      axios
        .post(`${backendUrl}/playlist`, updatedVals, config)
        .then((response) =>
          setPlayListData([...playListData, response.data.playlist])
        )
        .catch((error) => console.error(error));
      handleSave();
    }
  };

  return (
    <>
      {isDrawer && (
        <div
          id="default-modal"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-75"
          onClick={handleClose}
        >
          <div
            className="relative p-6 w-full max-w-lg max-h-full bg-white rounded-lg shadow-2xl transform transition-all scale-100 sm:scale-105"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
              <h3 className="text-2xl font-semibold text-gray-800">
                {type === "edit" ? "Edit Playlist" : "Add New Playlist"}
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                onClick={handleClose}
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <Formik
              initialValues={{ name: "" }}
              validationSchema={playListValidationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="pt-6 pb-4 space-y-4">
                  <div>
                    <Field
                      name="name"
                      placeholder={
                        type === "edit"
                          ? "Edit Playlist Name"
                          : "Enter Playlist Name"
                      }
                      className="w-full p-3 text-gray-700 bg-gray-100 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="flex justify-end space-x-3 border-t pt-4 border-gray-300">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transform transition-transform hover:scale-105"
                    >
                      {type === "edit" ? "Edit" : "Save"}
                    </button>
                    <button
                      type="button"
                      className="py-2.5 px-5 text-sm font-medium text-gray-600 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-800 focus:z-10 focus:ring-4 focus:ring-gray-200 transform transition-transform hover:scale-105"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            {playListData.length > 0 && (
              <div className="mt-6">
                <label
                  htmlFor="playlist"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Playlist
                </label>
                <select
                  id="playlist"
                  name="playlist"
                  value={selectedPlaylist}
                  onChange={(e) => setSelectedPlaylist(e.target.value)}
                  className="w-full mt-2 p-3 bg-gray-100 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {[
                    { name: "Please Select Playlist", _id: "" },
                    ...playListData,
                  ].map((e: any) => (
                    <option
                      key={e._id}
                      value={e._id}
                      className="bg-white text-black hover:bg-green-800 "
                    >
                      {e.name}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end">
                  <button
                    className="text-white mt-4 bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transform transition-transform hover:scale-105"
                    onClick={handleSavePlaylistData}
                    disabled={selectedPlaylist === ""}
                  >
                    Add to playlist
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
