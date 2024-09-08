import { useState, useMemo } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/spotify.webp";
import logo from "../assets/logo.png";
import {
  loginValidationSchema,
  registrationValidationSchema,
} from "../utils/validationSchema";
import Button from "../components/Button";
import axios from "axios";
import showToast from "../components/Toast/showToast";

interface FormField {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
}

interface LoginValues {
  email: string;
  password: string;
}

interface RegisterValues extends LoginValues {
  firstName: string;
  lastName: string;
  confirmpassword: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  const loginInitialValues: LoginValues = {
    email: "",
    password: "",
  };

  const registrationInitialValues: RegisterValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  const formFields: Record<string, FormField[]> = {
    login: [
      { label: "Email :", type: "email", name: "email", placeholder: "email" },
      {
        label: "Password :",
        type: "password",
        name: "password",
        placeholder: "password",
      },
    ],
    register: [
      {
        label: "First Name :",
        type: "text",
        name: "firstName",
        placeholder: "First Name",
      },
      {
        label: "Last Name :",
        type: "text",
        name: "lastName",
        placeholder: "Last Name",
      },
      {
        label: "Email :",
        type: "email",
        name: "email",
        placeholder: "email",
      },
      {
        label: "Password :",
        type: "password",
        name: "password",
        placeholder: "password",
      },
      {
        label: "Confirm Password :",
        type: "password",
        name: "confirmpassword",
        placeholder: "Confirm Password",
      },
    ],
  };

  const handleLogin = async (values: LoginValues | RegisterValues) => {
    const backendUrl = import.meta.env.VITE_BACKENDURL;

    try {
      const endpoint = isRegister ? "/user/sign-up" : "/user/login";
      const response = await axios.post(
        `${backendUrl}${endpoint}`,
        isRegister ? values : values
      );
      const accessToken = response?.data?.accessToken;
      showToast(response.data.message, "success");
      if (!isRegister && response?.data?.accessToken) {
        localStorage.setItem("apiKey", accessToken);
        navigate("/");
      } else {
        setIsRegister(false);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      showToast(errorMessage, "error");
      console.error("Error:", error);
    }
  };

  const renderFields = useMemo(
    () => (fields: FormField[]) =>
      fields.map((field, index) => (
        <div
          className={`flex flex-col gap-2 ${
            isRegister ? "sm:w-full" : "w-full"
          }`}
          key={index}
        >
          <label className="md:text-gray-600 text-[#cccccc] font-medium md:block hidden">
            {field.label}
          </label>
          <Field
            className="border md:border-gray-400 border-transparent placeholder:capitalize md:placeholder:text-gray-400 placeholder:text-green-500 md:bg-white bg-[#ffffff40] rounded-md p-1 w-full focus:ring-2 focus:ring-gray-500 focus:outline-none px-2.5 py-2 caret-black"
            type={field.type}
            name={field.name}
            placeholder={field?.placeholder}
          />
          <ErrorMessage
            className="text-red-600 text-sm"
            name={field.name}
            component={"div"}
          />
        </div>
      )),
    [isRegister]
  );

  return (
    <div className="flex flex-col md:flex-row w-full justify-center h-screen">
      <div className="w-full md:w-[50%] lg:w-[40%] h-full md:block absolute md:relative">
        <img
          src={loginImg}
          className="w-full h-full object-cover md:opacity-100 opacity-25"
          alt="login"
        />
      </div>
      <div className="w-full md:w-[50%] lg:w-[60%] h-full md:bg-opacity-100 md:bg-transparent relative z-20 bg-cover bg-center bg-black md:bg-none bg-[url('src/assets/loginImage1.jpeg')]">
        <div className="w-full h-full flex justify-center items-center md:bg-white md:text-black text-white bg-[#00000080] p-4 sm:p-8 md:p-0">
          <div className="md:w-[70%] w-full mb-16">
            {/* Logo */}
            <div className="w-full flex items-center gap-7 p-2">
              <img
                src={logo}
                className="w-[70px] flex items-center justify-center"
                alt="logo"
              />
              <h2 className="sm:text-3xl text-xl text-green-500 font-bold underline">
                Spotify Playlist
              </h2>
            </div>

            {/* Welcome */}
            <div className="p-2">
              <h1 className="text-2xl font-bold">Welcome!</h1>
            </div>

            {/* Form */}
            <div className="p-2">
              <Formik
                initialValues={
                  isRegister ? registrationInitialValues : loginInitialValues
                }
                validationSchema={
                  isRegister
                    ? registrationValidationSchema
                    : loginValidationSchema
                }
                onSubmit={handleLogin}
                validateOnChange={true}
                validateOnBlur={true}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <div
                      className={`flex flex-col gap-4 w-full ${
                        isRegister ? "sm:grid grid-cols-2 gap-x-4" : ""
                      }`}
                    >
                      {renderFields(
                        isRegister ? formFields.register : formFields.login
                      )}
                      <div
                        className={`flex justify-center ${
                          isRegister ? "col-span-2" : ""
                        }`}
                      >
                        <Button
                          additionalClasses="px-6 my-4 w-full border-2 border-green-500 text-green-500 !w-[150px]"
                          text={isRegister ? "Register" : "LogIn"}
                          type="submit"
                        />
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>

              {/* Registration */}
              <p>
                {!isRegister ? "Don't have an account? " : "Back to "}
                <span
                  className="cursor-pointer underline text-green-500 hover:text-theam-dark"
                  onClick={() => setIsRegister(!isRegister)}
                >
                  {!isRegister ? "Register here" : "Login"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
