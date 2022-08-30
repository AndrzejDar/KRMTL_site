import React from "react";
import { FaRegBookmark, FaUsersCog, FaDoorOpen } from "react-icons/fa";

import userButtonStyles from "../styles/UserButton.module.scss";

const UserButton = ({ onClick, onBlur, user, toggleUserMenu }) => {
  return (
    <div className={userButtonStyles.container} tabIndex='0' onClick={onClick} onBlur={onBlur}>
      <div className={userButtonStyles.button}>{user.name[0]}</div>

      {toggleUserMenu && (
        <div className={userButtonStyles.modal}>
          <div className={userButtonStyles.userData}>
            <div className={userButtonStyles.userInfo}>
              <div className={userButtonStyles.userIcon}>{user.name[0]}</div>
              <div className={userButtonStyles.userName}>
                <span className="bold-text"> {user.name}</span>
                <span> {user.email}</span>
              </div>
            </div>

            <FaDoorOpen />
          </div>
          <div className={userButtonStyles.divider}></div>
          <div className={userButtonStyles.option}>
            <FaRegBookmark />
            <span>Bookmarks</span>
          </div>
          <div className={userButtonStyles.option}>
            <FaUsersCog />
            <span>Settings</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserButton;
