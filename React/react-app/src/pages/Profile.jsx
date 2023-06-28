import React, { useState } from "react";
import Avatar from "react-avatar-edit";
import img from "../img/logo_uni.png";
//import ProfileData from "../../../../AppEng/src/main/java/pt/unl/fct/di/apdc/firstwebapp/util/ProfileData"
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Profile = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [imgProfile, setImgProfile] = useState(null);
  const [storeImage, setStoreImage] = useState([]);
  /*const (email, username, password, role, state, landline, phoneNumber,
    occupation, address, nif, department, token);
*/

  const onCrop = (view) => {
    setImgProfile(view);
  };

  const onClose = () => {
    setImgProfile(null);
  };

  const saveImage = () => {
    setStoreImage([...storeImage, { imgProfile }]);
    setShowModal(false);
  };

  const profileImageShow = storeImage.map((item) => item.imgProfile);

  return (
    <div className="profile-container">
      <div className="profile-img-container">
        <img
          className="profile-img"
          src={profileImageShow.length ? profileImageShow : img}
          alt=""
        />
        <div className="camera-icon-container">
          <FontAwesomeIcon icon = {faCamera} onClick={() => setShowModal(true)}/>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2 className="text-2xl font-semibold textColor">
              Update Profile photo
            </h2>
            <div className="flex flex-column align-items-center mt-5 w-12">
              <div className="flex flex-comumn justify-content-around w-12 mt-4">
                <Avatar width={400} height={300} onCrop={onCrop} onClose={onClose} />
                <button onClick={saveImage}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
