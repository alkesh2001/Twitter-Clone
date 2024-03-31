import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { login as authlogin } from "../Store/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Input, Logo } from "./index";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const login = async (data) => {
    setError("");
    try {
      const session = await axios.post(
        "http://localhost:8080/api/v1/users/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

        const userData = session.data;
        if(session.status === 200) {
        const currentUser = await axios.get(
          "http://localhost:8080/api/v1/users/current-user",
          {
            headers: {
              Authorization: `Bearer ${userData.data.accessToken}`,
              accept: "application/json",
            },
          }
        );

        if (currentUser.status === 200) {
          // console.log(currentUser);
          dispatch(authlogin(userData.data));
          if (userData.statusCode === 401 || userData.statusCode === 404) {
            return userData;
          }
        }
      }

      navigate("/Home");
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className=" flex items-center justify-center h-screen bg-black">
      <div
        className={`  mx-auto w-full lg:max-w-lg  max-w-[320px] rounded-xl p-10 border border-gray-800`}
      >
        <div className="my-2 flex justify-center">
          <Logo />
        </div>
        <h2 className="text-center text-white text-2xl font-bold leading-tight">
          Sign in to Twitter
        </h2>
        <p className="text-white mt-2 text-center text-base ">
          Create an account?&nbsp;
          <Link
            to="/singup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} method="POST" className="mt-8">
          <div className="space-y-6  text-white">
            <Input
              type="email"
              placeholder="Enter your Email"
              {...register("email", {
                required: true,
                validate: {
                  matchPartern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be valid address",
                },
              })}
            />
            <Input
              //   label='Password'
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <div className="w-full flex justify-center">
              <button
                className="bg-white text-black font-medium  text-lg px-4 py-2 rounded-lg"
                type="submit"
              >
                {" "}
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
