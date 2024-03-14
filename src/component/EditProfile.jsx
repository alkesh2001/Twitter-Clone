import React, { useEffect, useState } from "react";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { set, useForm } from "react-hook-form";
import { CoverImage, ProfileData } from "../Store/authSlice";
import axios from "axios";

function EditProfile() {
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const profileData = useSelector((state) => state.auth.profileData);
  // console.log(profileData)
  // console.log(userData)

  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  // console.log(userData)

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/social-media/profile",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userData.accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(ProfileData(response.data));
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [userData.accessToken]);

  const [coverImage, setCoverImage] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState();

  const Cover = (e) => {
    const file = e.target.files[0];
    const imageFile = URL.createObjectURL(file);
    setCoverImage(imageFile);
    setCoverImageFile(file);
  };

  const updateCover = async () => {
    try {
      const formData = new FormData();

      formData.append("coverImage", coverImageFile);

      const response = await axios.patch(
        "http://localhost:8080/api/v1/social-media/profile/cover-image",
        formData,
        {
          headers: {
            accept: "application/json",
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userData.accessToken}`,
          },
        }
      );
      // console.log(response);
      if (response.status === 200) {
        console.log("Cover image uploaded successfully:", response);
        // dispatch(CoverImage(response.data));
      }
    } catch (error) {
      console.error("in this errror to fetch usercover image ", error);
    }
  };

  const updateUsername = async (newUsername) => {
    try {
      const response = await axios.patch(
        "http://localhost:8080/api/v1/social-media/profile",
        { username: newUsername },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        // Update the profile data in the Redux store
        dispatch(ProfileData(response.data));
      }
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  const updateBio = async (newBio) => {
    try {
      const response = await axios.patch(
        "http://localhost:8080/api/v1/social-media/profile",
        { bio: newBio },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        // Update the profile data in the Redux store
        dispatch(ProfileData(response.data));
      }
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  const updateLocation = async (location) => {
    try {
      const response = await axios.patch(
        "http://localhost:8080/api/v1/social-media/profile",
        { location: location },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.accessToken}`,
          },
        }
      );
      if (response.ok) {
        dispatch(ProfileData(response.data));
      }
    } catch (error) {
      console.log("error updating location", error);
    }
  };

  const [avatarImg, setAvatarImg] = useState( profileData.data.account.avatar.url );
  const [avatarfile, setAvatarfile] = useState();

  const avatar = (e) => {
    const file = e.target.files[0];
    const imagefile = URL.createObjectURL(file);
    setAvatarImg(imagefile);
    setAvatarfile(file);
  };

  const updateAvatar = async () => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatarfile);

      const response = await axios.patch(
        "http://localhost:8080/api/v1/users/avatar",
        formData,
        {
          headers: {
            accept: "application/json",
            "Content-Type ": " multipart/form-data",
            Authorization: `Bearer ${userData.accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.error("error in when upload profile image", error);
    }
  };

  // console.log(profileData)

  const [show, setShow] = useState(false);

  const showUploadImg = () => {
    setShow(!show);
  };
  const hiddenuploader = () => {
    setShow(false);
  };

  return (
    <div className="bg-black h-screen relative">
      <div className="text-white">
        <div className="bg-black flex justify-between py-4 px-5">
          <div className="flex items-center gap-5">
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-arrow-left"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
            </div>
            <div className="text-lg font-medium ">Edit Profile</div>
          </div>
          <div className="">
            <Link to={"/Home"}>
              <button
                type="submit"
                className="text-md font-medium rounded-full px-3 py-1 bg-blue-400"
              >
                Save
              </button>
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit()} method="POST">
          <div>
            <div className=" flex justify-center items-center  w-full h-[150px]">
              <div className="h-full w-full">
                <img
                  src={coverImage}
                  alt=""
                  className="h-full w-full  object-center"
                />
              </div>

              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                id="cover"
                className="hidden w-full h-[150px]"
                onChange={Cover}
              />
              {coverImage ?  (
                <div className="absolute">
                   <button className="bg-blue-500  px-3 py-1 font-medium text-md  rounded-lg " onClick={updateCover}>upload Cover Image</button>
                </div>
              ): (

              <label className="absolute grid  justify-center items-centerw-full" htmlFor="cover" >
                <div className="text-lg font-medium">
                  update Cover Image
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="cover"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-camera mx-16"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </label>
              )}
            </div>
          </div>
          <div className="px-5 -translate-y-8">
            <div
              onClick={showUploadImg}
              className="h-20 w-20  relative rounded-full flex justify-center items-center"
            >
              <div className="h-20 w-20 ">
                <img
                  src={avatarImg}
                  // defaultValue={}
                  // {...register("image")}
                  alt=""
                  className="z-0 h-full w-full rounded-full object-center"
                />
              </div>
              <div className="absolute top-7 left-7">
                <svg
                  className=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#808080"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-camera"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
            </div>

            <div className="my-4 border-b border-0 border-gray-800">
              <span className="text-sm font-medium text-gray-400">Name</span>
              <Input
                type="text"
                onChange={(e) => updateUsername(e.target.value)}
                defaultValue={profileData.data.account.username}
              />
            </div>
            <div className="my-4 border-b border-0  border-gray-800">
              <span className="text-sm font-medium text-gray-400">Bio</span>
              <Input
                type="text"
                defaultValue={profileData.data.bio}
                onChange={(e) => updateBio(e.target.value)}
              />
            </div>
            <div className="my-4 border-b border-0  border-gray-800">
              <span className="text-sm font-medium text-gray-400">
                Locatione
              </span>
              <Input
                type="text"
                onChange={(e) => updateLocation(e.target.value)}
                defaultValue={profileData.data.location}
              />
            </div>
            <div className="my-4 border-b border-0  border-gray-800">
              <span className="text-sm font-medium text-gray-400">
                Brith Date
              </span>
              <Input type="text" />
            </div>
          </div>
        </form>
      </div>
      <div
        className={`${
          show ? "" : "hidden"
        }  bg-black border border-gray-100 h-[280px]  w-5/6 absolute top-1/3 left-8 rounded-xl `}
      >
        <div className="flex justify-end items-center text-white px-3  pt-3">
          <button onClick={hiddenuploader}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="px-9 pt-5">
          <div className="relative h-[160px]">
            <img
              src={avatarImg}
              alt=""
              className=" h-full rounded-md object-contain w-full"
            />
            <div className="flex justify-center ">
              <input
                onChange={avatar}
                type="file"
                id="avatar"
                className="hidden"
                accept="image/png, image/jpg, image/jpeg, image/gif"
              />
              <label htmlFor="avatar" className="z-40 absolute top-16">
                <svg
                  className=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#808080"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-camera"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </label>
            </div>
          </div>
          <div className="flex justify-center items-center py-4">
            <button
              onClick={updateAvatar}
              className="bg-blue-500 px-3 py-1 text-md font-medium rounded-xl text-white"
            >
              upload image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
