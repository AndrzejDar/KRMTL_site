import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";


import CarouselStyles from "../styles/Carousel.module.scss";

const Carousel = ({ content }) => {
  const novels = content;
  const [position, setPosition] = useState(0);
  const router = useRouter();

  let timeoutID = "";

  useEffect(() => {
    TimeoutFunction();
    return () => {
      clearTimeout(timeoutID);
    };
  }, [position]);

  const TimeoutFunction = () => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      setPosition((current) => {
        return content.length - 1 <= current ? 0 : current + 1;
      });
    }, 3000);
  };

  let filledNovels = [...novels, ...novels];
  //add copies of data to fill carousel if not long enough
  if (novels.length < 8) {
    filledNovels = [...novels, ...novels, ...novels, ...novels, ...novels];
  }

  return (
    <div className={CarouselStyles.container}>
      <span style={{ "font-size": "larger" }}>Novels:</span>
      <div className="divider"></div>
      <div className={CarouselStyles.carousel}>
        <div
          className={CarouselStyles.carousel_slider}
          style={{
            transform: `translateX(${
              (position / filledNovels.length) * -100
            }%)`,
          }}
        >
          {filledNovels.map((novel, id) => (      
              <div key={id} className={CarouselStyles.image} onClick={()=>{router.push(`/novel/${novel.attributes.Title_Slug}`)}}>
                <img
                  src={novel.attributes.Cover.data?
                    (process.env.CLOUDINARY?(novel.attributes.Cover.data.attributes.formats.small.url):(`${process.env.NEXT_PUBLIC_STRAPI_URL}${novel.attributes.Cover.data.attributes.formats.small.url}`)):'/img/missing.png'}
                />
              </div>            
          ))}
        </div>
      </div>
      <div className={CarouselStyles.navigation}>
        {novels.map((novel, id) => (
          <div key={id}
            className={CarouselStyles.dot}
            onClick={() => {
              setPosition(id);
              TimeoutFunction();
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
