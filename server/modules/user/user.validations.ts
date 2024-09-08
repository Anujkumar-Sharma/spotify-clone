import { passwordRegExp } from "../../constant/regExp.constant";
import { userService } from "./user.service";
import { isExists } from "../../utils/commonUtils";
import User from "./user.model";
import * as yup from "yup";

export const signupValidation = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required")
    .test(
      "success",
      "Email is already registered",
      async (email) => !(await userService.isEmailExist(email as string))
    ),
  password: yup
    .string()
    .matches(
      passwordRegExp,
      "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
    )
    .required("Password is required"),
});

export const signinValidation = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const changePasswordValidation = yup.object().shape({
  input: yup.object().shape({
    oldPassword: yup.string().required("Old password is required"),
    newPassword: yup
      .string()
      .matches(
        passwordRegExp,
        "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
      )
      .required("New password is required"),
  }),
});

export const resetPasswordValidation = yup.object().shape({
  input: yup.object().shape({
    newPassword: yup
      .string()
      .matches(
        passwordRegExp,
        "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
      )
      .required("New password is required"),
  }),
});

export const updateUserValidation = yup.object().shape({
  id: yup.string().test("success", "User id not exist", async (id) => {
    return await isExists(id as string, User, "_id");
  }),
  input: yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string().optional(),
    email: yup
      .string()
      .email("Must be a valid email")
      .test(
        "success",
        "Email is already registered",
        async (email) => !(await userService.isEmailExist(email as string))
      )
      .optional(),
    password: yup
      .string()
      .matches(
        passwordRegExp,
        "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
      )
      .optional(),
  }),
});

export const deleteUserValidation = yup.object().shape({
  id: yup.string().test("success", "User id not exist", async (id) => {
    return await isExists(id as string, User, "_id");
  }),
});

export const getUserValidation = yup.object().shape({
  id: yup.string().test("success", "User id not exist", async (id) => {
    return await isExists(id as string, User, "_id");
  }),
});
