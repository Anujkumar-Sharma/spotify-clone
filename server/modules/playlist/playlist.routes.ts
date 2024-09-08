import express from "express";
import { isAuthenticated } from "../../middleware/auth.middleware";
import playlistController from "./playlist.controller";
import validateRequest from "../../middleware/validator.middleware";
import { createPlaylist, createUserPlaylist } from "./playlist.validations";

const router = express.Router();

const PATH = {
  PLAYLIST: "/",
  PLAYLIST_WITH_TRACK: "/:playlistId",
  USER_PLAYLIST: "/user-playlist"
};

router
  .route(PATH.PLAYLIST_WITH_TRACK)
  .get(playlistController.getPlaylistWithTracks);

router.use(isAuthenticated);

router
  .route(PATH.PLAYLIST)
  .post(validateRequest(createPlaylist), playlistController.createPlaylist)
  .get(playlistController.getPlaylistByUser);

router
  .route(PATH.USER_PLAYLIST)
  .post(validateRequest(createUserPlaylist), playlistController.addToPlaylist)
  .delete(playlistController.removeToPlaylist);

export default router;
