import userRouter from "../modules/user/user.routes";
import playlistRouter from "../modules/playlist/playlist.routes";
import express, { Request, Response } from "express";
import { getRandomTracksList } from "../utils/spotify.utils";

const PATH = {
  USER: "/user",
  PLAYLIST: "/playlist",
  TRACKS: "/tracks",
};

const router = express.Router();

router.use(PATH.USER, userRouter);
router.use(PATH.PLAYLIST, playlistRouter);
router.get(PATH.TRACKS, async (req: Request, res: Response) => {
  const tracks = await getRandomTracksList();
  return res.status(200).send(tracks);
});

export default router;
