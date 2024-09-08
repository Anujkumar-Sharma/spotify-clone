import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please Enter your Valid Email"),
  password: Yup.string().required("Please Enter Your Password"),
});

export const registrationValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("Please Enter your First Name"),
  lastName: Yup.string().required("Please Enter your Last Name"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please Enter your Valid Email"),
  password: Yup.string().required("Please Enter Your Password"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Please confirm your password"),
});

export const playListValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short")
    .max(50, "Name is too long")
    .required("Playlist name is required"),
});
