import React, { useEffect, useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
//React Icon Import
import {
  AiOutlineHome,
  AiFillMessage,
  AiFillSetting,
  AiFillNotification,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
//React Icon Import End
import { NavLink, useNavigate } from "react-router-dom";
//Firebase Import Start
import { signOut } from "firebase/auth";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { ref as dbRef, onValue, update, remove } from "firebase/database";
import auth from "../firebaseConfig";
import { storage } from "../firebaseConfig";
import { db } from "../firebaseConfig";
//Firebase Import End
import { PulseLoader } from "react-spinners";

export default function Sidebar() {
  let navigate = useNavigate();

  const [cropImage, setCropImage] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [cropper, setCropper] = useState("");
  const [imageName, setImageName] = useState("");

  const [unReadCount, setUnReadCount] = useState(0);

  const [show, setShow] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    const unReadRef = dbRef(db, "unread/");

    onValue(unReadRef, (snapshot) => {
      let tempCountValue = 0;

      snapshot.forEach((item) => {
        if (item.key === auth.currentUser.uid) {
          tempCountValue = item.val().count;
        }
      });
      setUnReadCount(tempCountValue);
    });
  }, []);

  // Image Crop Start
  const cropperRef = useRef();
  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    // console.log(cropper.getCroppedCanvas().toDataURL());
    setPrevImage(cropper.getCroppedCanvas().toDataURL());
  };
  // Image Crop End

  function handleLogout() {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {});
  }

  const handleShow = () => {
    setShow((prevState) => {
      return !prevState;
    });
  };

  const handleModalClose = (e) => {
    if (e.target.className.includes("close-div")) {
      setShow(false);
      setPrevImage("");
      setCropImage("");
    }
  };

  const handleSelectImage = (e) => {
    let files = e.target.files[0];
    setImageName(files.name);

    const reader = new FileReader();

    reader.onload = (event) => {
      setCropImage(event.target.result);
    };
    reader.readAsDataURL(files);
  };

  const handleUploadImage = (e) => {
    e.preventDefault();
    setUploadLoading(true);

    const storageRef = ref(storage, imageName);

    if (typeof cropper !== "undefined") {
      let imageURL = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, imageURL, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((url) => {
          updateProfile(auth.currentUser, {
            photoURL: url,
          })
            .then(() => {
              const usersRef = dbRef(db, "users/");
              onValue(usersRef, (snapshot) => {
                snapshot.forEach((item) => {
                  if (auth.currentUser.uid === item.key) {
                    update(dbRef(db, "users/" + item.key), {
                      profile_picture: url,
                    });
                  }
                });
              });
            })
            .then(() => {
              setUploadLoading(false);
              setShow(false);
              setPrevImage("");
              setCropImage("");
            });
        });
      });
    }
  };

  const handleNotification = () => {
    update(dbRef(db, "unread/" + auth.currentUser.uid), {
      count: 0,
    });
  };

  return (
    <>
      <div className=" bg-green-600 text-white p-4 sm:fixed sm:left-0 sm:bottom-0 sm:w-screen sm:h-[55px] sml:w-[186px] sml:static sml:h-auto z-10">
        <div className="h-full flex gap-12 sm:flex-row sml:flex-col sm:justify-between sml:justify-start">
          <div className="flex flex-col items-center">
            <div
              className="relative group overflow-hidden"
              onClick={handleShow}
            >
              <img
                src={auth.currentUser.photoURL}
                alt=""
                className="mb-2 sm:h-[50px] sm:w-[50px] sm:-mt-4 sml:h-[70px] sml:w-[70px] sml:mt-4 rounded-full"
                loading="lazy"
              />
              <div className="absolute top-[100%] left-0 sm:h-[50px] sm:w-[50px] sm:-mt-4 sml:h-[70px] sml:w-[70px] sml:mt-4 rounded-full bg-green-400 flex justify-center items-center cursor-pointer group-hover:top-0 duration-700">
                <AiOutlineCloudUpload className="text-3xl" />
              </div>
            </div>
            <h3 className="text-center"> {auth.currentUser.displayName}</h3>
          </div>

          <div className="flex items-center sm:text-2xl sml:text-4xl sm:flex-row sml:flex-col">
            <NavLink
              end
              to="/"
              className={({ isActive, isPending }) =>
                isActive
                  ? "bg-white text-green-600 w-full flex justify-center rounded py-3 mb-4 cursor-pointer relative after:absolute after:h-full after:w-[5%] after:top-0 after:right-0 after:content-[''] after:bg-green-600 after:rounded-tl-lg after:rounded-bl-lg p-2 sml:p-4"
                  : isPending
                  ? "pending"
                  : "w-full flex justify-center py-3 mb-4 cursor-pointer p-2"
              }
            >
              <AiOutlineHome />
            </NavLink>

            <NavLink
              to="message"
              className={({ isActive, isPending }) =>
                isActive
                  ? "bg-white text-green-600 w-full flex justify-center rounded py-3 mb-4 cursor-pointer relative after:absolute after:h-full after:w-[5%] after:top-0 after:right-0 after:content-[''] after:bg-green-600 after:rounded-tl-lg after:rounded-bl-lg p-2 sml:p-4"
                  : isPending
                  ? "pending"
                  : "w-full flex justify-center py-3 mb-4 cursor-pointer p-2"
              }
            >
              <AiFillMessage />
            </NavLink>

            <NavLink
              to="notification"
              onClick={handleNotification}
              className={({ isActive, isPending }) =>
                isActive
                  ? "bg-white text-green-600 w-full flex justify-center rounded py-3 mb-4 cursor-pointer relative after:absolute after:h-full after:w-[5%] after:top-0 after:right-0 after:content-[''] after:bg-green-600 after:rounded-tl-lg after:rounded-bl-lg p-2 sml:p-4"
                  : isPending
                  ? "pending"
                  : "w-full relative flex justify-center py-3 mb-4 cursor-pointer p-2"
              }
            >
              <AiFillNotification />

              {unReadCount !== 0 ? (
                <div className="absolute bottom-2 right-4 z-20 bg-red-500 text-white p-1 rounded">
                  <p className="text-sm">{unReadCount}</p>
                </div>
              ) : (
                ""
              )}
            </NavLink>

            <NavLink
              to="settings"
              className={({ isActive, isPending }) =>
                isActive
                  ? "bg-white text-green-600 w-full flex justify-center rounded py-3 mb-4 cursor-pointer relative after:absolute after:h-full after:w-[5%] after:top-0 after:right-0 after:content-[''] after:bg-green-600 after:rounded-tl-lg after:rounded-bl-lg p-2 sml:p-4"
                  : isPending
                  ? "pending"
                  : "w-full flex justify-center py-3 mb-4 cursor-pointer p-2"
              }
            >
              <AiFillSetting />
            </NavLink>
          </div>

          <div className="mx-auto mb-4 cursor-pointer sm:justify-center sm:mr-4 sm:text-2xl sml:mr-auto sml:text-4xl">
            <FiLogOut onClick={handleLogout} />
          </div>
        </div>
      </div>

      {/* Image Upload Modal Start  */}

      {show && (
        <div
          className="w-full h-screen bg-green-600/75 text-black flex justify-center items-center fixed top-0 left-0 close-div z-20"
          onClick={handleModalClose}
        >
          <div className="bg-white rounded p-10 relative h-[500px] w-[500px]">
            <div className="absolute top-4 right-4 text-xl cursor-pointer p-2 w-12 close-div">
              <img src="./images/close.jpg" alt="" className="close-div" />
            </div>
            <form>
              <h2 className="text-green-600 text-xl font-bold mb-3">
                Upload Image
              </h2>

              <img
                src={prevImage || auth.currentUser.photoURL}
                alt=""
                className="h-[70px] w-[70px] mr-3 rounded-full"
              />
              <input
                type="file"
                name="file"
                id="file"
                className=" rounded py-4 focus:outline-none w-[300px]"
                onChange={handleSelectImage}
              />

              {uploadLoading ? (
                <PulseLoader
                  color="green"
                  className="text-center text-green-600"
                />
              ) : (
                <button
                  type="submit"
                  className="bg-green-700 text-white block rounded-full text-lg w-full p-4 mt-4 mb-2"
                  onClick={handleUploadImage}
                >
                  Upload Image
                </button>
              )}

              {/* Crop Component  */}
              <Cropper
                src={cropImage}
                // style={{ height: 400, width: "100%" }}
                className="w-[400px] !h-[250px]"
                // Cropper.js options
                initialAspectRatio={8 / 5}
                guides={false}
                crop={onCrop}
                ref={cropperRef}
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
              />
            </form>
          </div>
        </div>
      )}
      {/* Image Upload Modal End  */}
    </>
  );
}
