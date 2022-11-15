import React, { useState, useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Cropper from "react-cropper";
//Firebase Import Start
import { ref, set, push, onValue, update } from "firebase/database";
import auth from "../../firebaseConfig";
import { db } from "../../firebaseConfig";
//Firebase Import End
import { PulseLoader } from "react-spinners";

import { useDispatch, useSelector } from "react-redux";
import { groupmembers } from "../../features/groupMembers/groupMemberSlice";

export default function GroupRequest() {
  const [cropImage, setCropImage] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [cropper, setCropper] = useState("");

  const [groupArr, setGroupArr] = useState([]);
  const [pendingStr, setPendingStr] = useState("");
  const [joinedStr, setJoinedStr] = useState("");

  const [groupTitle, setGroupTitle] = useState("");
  const [groupTagline, setGroupTagline] = useState("");

  const [show, setShow] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const groupRef = ref(db, "group");
    onValue(groupRef, (snapshot) => {
      let groupArray = [];

      snapshot.forEach((user) => {
        if (auth.currentUser.uid !== user.val().adminid) {
          groupArray.push({ ...user.val(), groupkey: user.key });
        }
      });

      setGroupArr(groupArray);
    });
  }, [db, ref, onValue, auth]);

  //Pending Button

  useEffect(() => {
    const reqRef = ref(db, "groupjoinrequest");
    onValue(reqRef, (snapshot) => {
      let pendingString = "";

      snapshot.forEach((user) => {
        pendingString += user.val().groupkey + user.val().reqid;
      });

      setPendingStr(pendingString);
    });
  }, [db, ref, onValue, auth]);

  //Joined Button
  useEffect(() => {
    const memberRef = ref(db, "memberlist");
    onValue(memberRef, (snapshot) => {
      let joinedString = "";

      snapshot.forEach((user) => {
        if (auth.currentUser.uid === user.val().userid) {
          joinedString += user.val().groupkey;
        }
      });

      setJoinedStr(joinedString);
    });
  }, [db, ref, onValue, auth]);

  // Image Crop Start
  const cropperRef = useRef();
  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    // console.log(cropper.getCroppedCanvas().toDataURL());
    setPrevImage(cropper.getCroppedCanvas().toDataURL());
  };
  // Image Crop End

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

    const reader = new FileReader();

    reader.onload = (event) => {
      setCropImage(event.target.result);
    };
    reader.readAsDataURL(files);
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    setUploadLoading(true);

    if (typeof cropper !== "undefined") {
      let imageURL = cropper.getCroppedCanvas().toDataURL();
      set(push(ref(db, "group")), {
        groupTitle,
        groupTagline,
        adminid: auth.currentUser.uid,
        adminname: auth.currentUser.displayName,
        groupimage: imageURL,
      }).then(() => {
        setUploadLoading(false);
        setShow(false);
        setPrevImage("");
        setCropImage("");
      });
    }
  };

  const handleJoin = (groupitem) => {
    set(push(ref(db, "groupjoinrequest")), {
      ...groupitem,
      reqid: auth.currentUser.uid,
      reqphoto: auth.currentUser.photoURL,
      reqname: auth.currentUser.displayName,
    });

    dispatch(groupmembers(auth.currentUser.uid));
  };

  return (
    <>
      <div className="h-[365px] overflow-hidden">
        {/* Search Start  */}

        <div className="relative my-2">
          <BsSearch className="absolute top-4 left-4  z-10" />
          <input
            type="text"
            name=""
            id=""
            className="w-full drop-shadow-xl rounded-lg focus:outline-none px-14 py-3"
            placeholder="Search here"
          />
          <BiDotsVerticalRounded className="absolute top-4 right-4  z-10 cursor-pointer text-lg" />
        </div>

        {/* Group Request Start */}
        <div className="shadow-xl p-4 h-full overflow-y-scroll">
          <div className="flex justify-between mb-2">
            <h2 className="text-black font-bold text-xl ">Group Request</h2>
            <button
              className="bg-green-600 text-white p-2 rounded"
              onClick={handleShow}
            >
              Create group
            </button>
            <BiDotsVerticalRounded className="text-green-600 text-2xl cursor-pointer" />
          </div>

          {/* Single Group Request Start */}

          {groupArr.map((group, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-solid border-gray-300 py-2"
            >
              <img
                src={group.groupimage}
                alt=""
                className="h-[60px] w-[60px] rounded-full"
              />
              <div className="sm:mr-0 sml:mr-auto sml:ml-3">
                <h2 className="font-bold sm:text-base sml:text-xl ">
                  {group.groupTitle}
                </h2>
                <p className="text-sm text-gray-500">{group.groupTagline}</p>
                <p className="text-sm text-gray-900">
                  Admin : {group.adminname}
                </p>
              </div>
              {pendingStr.includes(group.groupkey) &&
              pendingStr.includes(auth.currentUser.uid) ? (
                <button className="bg-red-600 text-white px-4 py-2 rounded text-base">
                  Pending
                </button>
              ) : joinedStr.includes(group.groupkey) ? (
                <button className="bg-green-600 text-white px-4 py-2 rounded text-base">
                  Joined
                </button>
              ) : (
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded text-base"
                  onClick={() => handleJoin(group)}
                >
                  Join
                </button>
              )}
            </div>
          ))}

          <br />
          <br />
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
              <input
                type="text"
                name="grouptitle"
                id="grouptitle"
                className="border border-solid border-gray-500 rounded px-7 py-2 focus:outline-none w-full mb-4"
                placeholder="Group Title"
                value={groupTitle}
                onChange={(e) => setGroupTitle(e.target.value)}
              />
              <input
                type="text"
                name="grouptitle"
                id="grouptitle"
                className="border border-solid border-gray-500 rounded px-7 py-2 focus:outline-none w-full"
                placeholder="Group Tagline"
                value={groupTagline}
                onChange={(e) => setGroupTagline(e.target.value)}
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
                  onClick={handleCreateGroup}
                >
                  Create group
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
