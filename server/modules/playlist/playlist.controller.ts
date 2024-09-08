import { Request, Response } from "express";
import { playlistService } from "./playlist.service";

type AuthRequest = Request & { user: any };

const playlistController = {
  createPlaylist: async (req: AuthRequest, res: Response) => {
    const result = await playlistService.createPlaylist(req.body, req.user);

    return res.status(201).send(result);
  },
  getPlaylistByUser: async (req: AuthRequest, res: Response) => {
    const result = await playlistService.getPlaylistByUser(req.user);

    return res.status(200).send(result);
  },
  getPlaylistWithTracks: async (req: AuthRequest, res: Response) => {
    const result = await playlistService.getPlaylistWithTracks(
      req.params.playlistId
    );

    return res.status(200).send(result);
  },
  addToPlaylist: async (req: AuthRequest, res: Response) => {
    const { trackId, playlistId } = req.body;
    const result = await playlistService.addToPlaylist(
      trackId,
      playlistId,
      req.user
    );

    return res.status(201).send(result);
  },
  removeToPlaylist: async (req: AuthRequest, res: Response) => {
    const { trackId, playlistId } = req.body;
    const result = await playlistService.removeToPlaylist(
      trackId,
      playlistId,
      req.user
    );

    return res.status(200).send(result);
  },
};

export default playlistController;
