import React from "react";
import FooterStyles from "../styles/Footer.module.scss";
import Link from "next/link";
import { footer } from "../src/content.json";

const Footer = () => {

const fo = footer;

  return (
    <>
      <div className={FooterStyles.container}>
        <div className={FooterStyles.left}>
          <span>Copyrigth © 2022 </span>
        </div>
        <div className={FooterStyles.right}>
          {fo.links.map((link ,id)=>(
        <Link key={id} href={link.link} >{link.text}</Link>
          ))}
             

        </div>
      </div>
    </>
  );
};

export default Footer;
