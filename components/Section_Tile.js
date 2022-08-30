import React from "react";
import sectionStyle from "../styles/section.module.scss";
import {HiArrowSmRight} from 'react-icons/hi';

const Section_Tile = ({ content: { title, subtitle, content } }) => {
  console.log(content);
  const tiles = [...Object.values(content)];

  return (
    <div className={sectionStyle.section}>
      <h2>{title.text}</h2>
      <span className={sectionStyle.subtitle}>{subtitle.text}</span>

      <div className={sectionStyle.tiles}>
        {tiles.map((tile, id) => (
          <div className={sectionStyle.tile} style={{backgroundImage : 'url('+tile.img.src+')'}}>
           <div className={sectionStyle.title}>

            <h4>
                {tile.title.text}
            </h4>
            <HiArrowSmRight />
           </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section_Tile;
