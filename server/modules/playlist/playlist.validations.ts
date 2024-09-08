import * as yup from "yup";

export const createPlaylist = yup.object().shape({
  name: yup.string().required("Playlist Name is required"),
});

export const createUserPlaylist = yup.object().shape({
  trackId: yup.string().trim().required("Track id is required"),
  playlistId: yup.string().trim().required("Playlist id is required"),
});
