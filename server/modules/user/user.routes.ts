import express from "express";
import userController from "./user.controller";
import validateRequest from "../../middleware/validator.middleware";
import { signinValidation, signupValidation } from "./user.validations";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { getRandomTracksList } from "../../utils/spotify.utils";

const router = express.Router();

const PATH = { ROOT: "/", LOGIN: "/login", SIGN_UP: "/sign-up", ME: "/me" };

router.get(PATH.ROOT, async (req, res) => {
  const tracks = await getRandomTracksList();
  return res.status(200).json({ message: "you are ready to explore", tracks });
});

router.post(
  PATH.SIGN_UP,
  validateRequest(signupValidation),
  userController.signup
);

router.get(PATH.ME, isAuthenticated, userController.getUser);

router.post(
  PATH.LOGIN,
  validateRequest(signinValidation),
  userController.signin
);

export default router;
