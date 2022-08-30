import React from "react";
import { HiX, HiMenuAlt4 } from "react-icons/hi";
import NavMenuStyles from "../styles/NavMenu.module.scss";
import Link from "next/link";
import { FaDoorOpen } from "react-icons/fa";

const NavMenu = ({ onClick, onBlur, user, open, links }) => {
  return (
    <div onClick={onClick} tabIndex='0' onBlur={onBlur} className={NavMenuStyles.container}>
      <div className={NavMenuStyles.button}>
        {open ? <HiX /> : <HiMenuAlt4 />}
      </div>
      <div
        className={`${NavMenuStyles.panel} + ${open ? NavMenuStyles.open : ""}`}
      >
        {open && (
          <>
            <div className={NavMenuStyles.userData}>
              <div className={NavMenuStyles.userInfo}>
                <div className={NavMenuStyles.userIcon}>{user.name[0]}</div>
                <div className={NavMenuStyles.userName}>
                  <span className="bold-text"> {user.name}</span>
                  <span> {user.email}</span>
                </div>
              </div>

              <FaDoorOpen />
            </div>
            <div className={NavMenuStyles.divider}></div>
            <ul>
              {links.map((item, id) => (
                <li key={id} className={NavMenuStyles.option}>
                  <Link href={item.link} ><span onClick={()=>{}}>{item.text}</span></Link>
                </li>
              ))}
            </ul>
            <div className={NavMenuStyles.divider}></div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavMenu;
