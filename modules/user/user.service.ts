import { JwtPayload } from "jsonwebtoken";
import { ERROR_MESSAGE } from "../../constant/errorMessage.constant";
import { SUCCESS_MESSAGE } from "../../constant/successMessage.constant";
import { tokenTime } from "../../constant/tokenTime.constant";
import { hashedPassword, validatePassword } from "../../utils/hash.utils";
import { signToken, verifyToken } from "../../utils/jwt.utils";
import User, { UserDocument } from "./user.model";
import bcrypt from "bcrypt";
import { successResponse } from "../../utils/response.utils";
import { PipelineStage } from "mongoose";

export const userService = {

  getUserById: async (_id: string) => {
    try {
      const user: UserDocument | null = await User.findById(_id, "-password");
      return successResponse(SUCCESS_MESSAGE.USER.GET, { user });
    } catch (error) {
      console.error("Error Get By Id user:", error);
      throw new Error(error as string);
    }
  },

  signup: async (input: UserDocument) => {
    try {
      const { password } = input;
      const hashPassword = await hashedPassword(password);
      input.password = hashPassword;

      const user = await User.create(input);
      return successResponse(SUCCESS_MESSAGE.USER.CREATE, { user });
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error(error as string);
    }
  },

  signin: async ({ email, password }: { email: string; password: string }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error(ERROR_MESSAGE.ERROR.USER_NOT_FOUND);
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new Error(ERROR_MESSAGE.ERROR.INVALID_PASSWORD);
      }
      const accessToken = signToken(
        {
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        tokenTime.signin
      );
      return successResponse(
        SUCCESS_MESSAGE.USER.SIGN_IN,
        { user },
        { accessToken }
      );
    } catch (error) {
      console.error("Error sign in user:", error);
      throw new Error(error as string);
    }
  },

  updateUser: async (_id: string, input: UserDocument) => {
    try {
      const user = await User.findById(_id);
      if (!user) {
        throw new Error("user not exist" as string);
      }
      const updatedUser = await User.findByIdAndUpdate(_id, input, {
        new: true,
      });
      return successResponse(SUCCESS_MESSAGE.USER.UPDATE, {
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error(error as string);
    }
  },

  deleteUser: async (_id: string) => {
    try {
      const deletedUser: UserDocument | null = await User.findByIdAndDelete(
        _id
      );
      return successResponse(SUCCESS_MESSAGE.USER.DELETE, {
        user: deletedUser,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error(error as string);
    }
  },

  isEmailExist: async (email: string) => {
    try {
      const existingUser = await User.findOne({ email }).lean();
      return !!existingUser; // Return true if user with email exists, false otherwise
    } catch (error) {
      throw new Error(error as string);
    }
  },

  changePassword: async (
    userId: string,
    { oldPassword, newPassword }: { oldPassword: string; newPassword: string }
  ) => {
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        throw new Error(ERROR_MESSAGE.ERROR.USER_NOT_FOUND);
      }
      const isMatch = validatePassword(oldPassword, user.password);

      if (oldPassword === newPassword) {
        throw new Error(ERROR_MESSAGE.ERROR.NOT_USED_SAME_PASSWORD);
      }

      if (!isMatch) {
        throw new Error(ERROR_MESSAGE.ERROR.OLD_PASSWORD_NOT_MATCHED);
      }
      const hashPassword = await hashedPassword(newPassword);
      user.password = hashPassword;
      await user.save();
      return successResponse(SUCCESS_MESSAGE.SUCCESS.CHANGE_PASSWORD);
    } catch (error) {
      throw new Error(error as string);
    }
  },

  forgotPassword: async ({ email }: { email: string }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error(ERROR_MESSAGE.ERROR.USER_NOT_FOUND);
      }
      const resetToken = signToken(
        { id: user.id, email: user.email },
        tokenTime.forgotPassword
      );
      return successResponse(SUCCESS_MESSAGE.SUCCESS.FORGOT_PASSWORD_MAIL);
    } catch (error) {
      throw new Error(error as string);
    }
  },

  resetPassword: async ({
    token,
    newPassword,
  }: {
    token: string;
    newPassword: string;
  }) => {
    try {
      const { email } = (await verifyToken(token)) as JwtPayload;
      const user = await User.findOne({
        email: email,
      });
      if (!user) {
        throw new Error(ERROR_MESSAGE.ERROR.INVALID_TOKEN);
      }
      const hashPassword = await hashedPassword(newPassword);
      user.password = hashPassword;
      await user.save();
      return successResponse(SUCCESS_MESSAGE.SUCCESS.RESET_PASSWORD);
    } catch (error) {
      throw new Error(error as string);
    }
  },
};
