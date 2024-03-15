import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {createPostData} from '../Store/authSlice'
import axios from "axios";

function CreatePost() {
  const [image, setImage] = useState(null);
  const [imagefile, setImageFile] = useState(null);

  
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const accessToken = userData ? userData.accessToken : null;
  const dispatch = useDispatch();

  console.log(userData);
  
  
  const addImage = (e) => {
    const file = e.target.files[0];
    const imageFile =  URL.createObjectURL(file)
    setImage(imageFile);
    setImageFile(file)
  };
  
  const submit = async (postData ) => {
    try {
      const formData = new FormData();

      formData.append("content", postData.content);

      if (image) {
        formData.append("images", imagefile); // Use the file directly
      }
        
      const response = await axios.post(
        "http://localhost:8080/api/v1/social-media/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // 'Content-Type' : 'multipart/form-data'
            // Set appropriate content type if required by your server (e.g., 'Content-Type': 'multipart/form-data' for multipart form data)
          },
        }
        );
        if (response.status === 201) {
          console.log(response.data);
          // const response = await upload.json();
          dispatch(createPostData(response.data));
          navigate("/Home");
        }else{
          console.error( 'if error to navigate to home')
        }
      } catch (error) {
        console.error("Error occurred while creating post:", error);
      }
    };
    
  return (
    <form onSubmit={handleSubmit(submit)} method="POST">
      <div className="bg-black h-screen text-white">
        <div className=" py-5 px-5 absolute ">
          <div className="flex justify-between">
            <div className="text-2xl font-medium ">
              <Link to={'/Home'}>
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </Link>
            </div>
            <div className="">
              <button
                // type="submit"
                className="bg-blue-400 py-1 px-4 text-lg font-medium rounded-full text-white"
              >
                Post
              </button>
            </div>
          </div>
          <div className="flex my-10 gap-4 ">
            <div>
              <div className="h-14 w-14 bg-white rounded-full"></div>
            </div>
            <div className="w-full ">
              <textarea
                placeholder="What`s happening?"
                name=""
                id=""
                cols="30"
                maxLength={250}
                rows="9"
                className="resize-none border-none w-full outline-none bg-black text-white font-medium text-md"
                {...register("content", {
                  required: true,
                })}
              ></textarea>
              <img
                src={image}
                alt=""
                className="w-full rounded-lg   h-[200px]  object-contain"
              />
            </div>
          </div>
          {/* <div className='p-5 h-[350px]' >
              </div> */}
          <div className="border-t border-gray-800 p-2 flex w-full gap-2 fixed bottom-5 left-0">
            <div className=" px-2">
              <input
                type="file"
                {...register("images")}
                accept="image/png, image/jpg, image/jpeg, image/gif"
                name="Upload Image"
                id="fileInput"
                onChange={addImage}
                className="text-black "
                style={{ display: "none" }}
              />
              <label className="cursor-pointer" htmlFor="fileInput">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0e81c8"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-image-plus"
                >
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                  <line x1="16" x2="22" y1="5" y2="5" />
                  <line x1="19" x2="19" y1="2" y2="8" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </label>
            </div>
            {/* <div className=''>
                        Location
                    </div> */}
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreatePost;
  