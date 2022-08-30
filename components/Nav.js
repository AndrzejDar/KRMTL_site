import React, { useState } from "react";
import Link from "next/link";
import navStyles from "../styles/Nav.module.scss";
import content from "../src/content.json";

import UserButton from "./UserButton";

import { FaSearch, FaRegBookmark } from "react-icons/fa";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import NavMenu from "./NavMenu";
import { useRouter } from "next/router";

const Nav = () => {
  const header = content.header;
  const links = [...Object.values(header.nav)];
  const [toggleNav, setToggleNav] = useState(false);
  const [toggleUserMenu, setToggleUserMenu] = useState(false);

  const user = {
    name: "user",
    email: "email@email.com",
    bookmarks: [1, 2, 3],
  };

  const router= useRouter();

  return (
    <div className="app__header">
      <div className="app__header-container">
        <div className={navStyles.header_left}>
          <NavMenu onClick={() => setToggleNav(!toggleNav)} onBlur={() => setToggleNav(false)} user={user} open={toggleNav} links={links} />
          {/* <div className={navStyles.nav_menu}>

            {toggleNav ? (
              <HiX onClick={() => setToggleNav(!toggleNav)} />
            ) : (
              <HiMenuAlt4 onClick={() => setToggleNav(!toggleNav)} />
            )}
            {toggleNav && (
              <div>
                <ul>
                  {links.map((item, id) => (
                    <li key={id}>
                      <Link href={item.link}>{item.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div> */}
          <div className={navStyles.logo} onClick={()=>{router.push(`/`)}}>
            <img src={header.logo.img} alt={header.logo.text} />
            {/* <span dangerouslySetInnerHTML={{ __html: logo_text["text"] }}></span> */}
          </div>
          <div className={navStyles.nav}>
            <ul>
              {links.map((item, id) => (
                <li key={id}>
                  <Link href={item.link}>{item.text}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={navStyles.header_right}>

          <FaSearch />


          <FaRegBookmark />

          <UserButton onClick={()=>setToggleUserMenu(!toggleUserMenu)} onBlur={()=>setToggleUserMenu(false)}
             user={user} toggleUserMenu={toggleUserMenu} />
        </div>
      </div>
    </div>
  );
};

export default Nav;
