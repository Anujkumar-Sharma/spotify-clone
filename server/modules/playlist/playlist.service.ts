import { JwtPayload } from "jsonwebtoken";
import playlistModel, { PlayListDocument } from "./playlist.model";
import { successResponse } from "../../utils/response.utils";
import { findTracksByIds } from "../../utils/spotify.utils";
import throwError from "../../utils/commonUtils";
import { SUCCESS_MESSAGE } from "../../constant/successMessage.constant";

export const playlistService = {
  createPlaylist: async (
    newPlayList: Partial<PlayListDocument>,
    user: JwtPayload
  ) => {
    const playlist = new playlistModel.PlayList({
      name: newPlayList.name,
      createdBy: user.userId,
    });

    await playlist.save();

    return successResponse(SUCCESS_MESSAGE.PLAYLIST.CREATE, { playlist });
  },

  getPlaylistByUser: async (user: JwtPayload) => {
    const playlists = await playlistModel.PlayList.find(
      {
        createdBy: user.userId,
      },
      "-createdBy -__v"
    ).lean();

    return successResponse(SUCCESS_MESSAGE.PLAYLIST.GET, { playlists });
  },

  getPlaylistWithTracks: async (playlistId: string) => {
    const [playlist, trackIds] = await Promise.all([
      playlistModel.PlayList.findById(playlistId, "-createdBy -__v").lean(),
      playlistModel.UserPlayList.distinct("trackId", {
        playlistId,
      }),
    ]);
    if (!trackIds.length)
      return successResponse(SUCCESS_MESSAGE.PLAYLIST.GET, {
        playlist,
        tracks: {},
      });

    const tracks = await findTracksByIds(trackIds);

    return successResponse(SUCCESS_MESSAGE.PLAYLIST.GET, {
      playlist,
      tracks,
    });
  },

  addToPlaylist: async (
    trackId: string,
    playlistId: string,
    user: JwtPayload
  ) => {
    const playlist = await playlistModel.PlayList.findOne({
      createdBy: user.userId,
      _id: playlistId,
    });

    if (!playlist) throwError("playlist not found!", 404);

    await playlistModel.UserPlayList.create({ trackId, playlistId });

    return successResponse(SUCCESS_MESSAGE.PLAYLIST.UPDATE);
  },

  removeToPlaylist: async (
    trackId: string,
    playlistId: string,
    user: JwtPayload
  ) => {
    const playlist = await playlistModel.PlayList.findOne({
      createdBy: user.userId,
      _id: playlistId,
    });

    if (!playlist) throwError("playlist not found!", 404);

    await playlistModel.UserPlayList.deleteOne({ trackId, playlistId });

    return successResponse(SUCCESS_MESSAGE.PLAYLIST.UPDATE);
  },
};
