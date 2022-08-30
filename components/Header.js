import React from "react";
import headerStyles from "../styles/Header.module.scss";

const Header = () => {
  return (
  <div>
    <h1 className={headerStyles.title}>
        <span>WebDev</span> News
    </h1>
    <p className={headerStyles.description}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem quasi asperiores quia fuga eveniet minima commodi corporis ipsum architecto hic.


    </p>
    </div>
  )
};

export default Header;
