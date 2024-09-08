import { UserDocument } from "./user.model";
import { userService } from "./user.service";
import { Request, Response, NextFunction } from "express";

const userController = {
  getUser: async (req: Request & { user: any }, res: Response) => {
    const result = await userService.getUserById(req.user.userId);
    return res.status(200).send(result);
  },

  signup: async (req: Request, res: Response) => {
    const result = await userService.signup(req.body);
    return res.status(201).send(result);
  },

  signin: async (req: Request, res: Response) => {
    const result = await userService.signin(req.body);
    return res.status(200).send(result);
  },

  updateUser: async (
    parent: Record<string, string>,
    { _id, input }: { _id: string; input: UserDocument }
  ) => {
    return await userService.updateUser(_id, input);
  },
  deleteUser: async (
    parent: Record<string, string>,
    { _id }: { _id: string }
  ) => {
    return await userService.deleteUser(_id);
  },
  changePassword: async (
    parent: Record<string, string>,
    { input }: { input: { oldPassword: string; newPassword: string } },
    context: { userId: string }
  ) => {
    return await userService.changePassword(context.userId, input);
  },
  forgotPassword: async (
    parent: Record<string, string>,
    { input }: { input: { email: string } }
  ) => {
    return await userService.forgotPassword(input);
  },
  resetPassword: async (
    parent: Record<string, string>,
    { input }: { input: { token: string; newPassword: string } }
  ) => {
    return await userService.resetPassword(input);
  },
};

export default userController;
