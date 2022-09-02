import React from "react";
import FooterStyles from "../styles/Footer.module.scss";
import Link from "next/Link";
import { footer } from "../src/content.json";

const Footer = () => {
  return (
    <>
      <div className={FooterStyles.container}>
        <div className={FooterStyles.left}>
          <span>Copyrigth © 2022 </span>
        </div>
        <div className={FooterStyles.right}>
          {footer.links.map((link)=>(
        <Link href={link.link} >{link.text}</Link>
          ))}
             

        </div>
      </div>
    </>
  );
};

export default Footer;
