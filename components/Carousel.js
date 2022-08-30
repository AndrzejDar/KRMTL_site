import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";


import CarouselStyles from "../styles/Carousel.module.scss";

const Carousel = ({ content }) => {
  const novels = content.data;
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
        return content.data.length - 1 <= current ? 0 : current + 1;
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
              <div key={id} className={CarouselStyles.image} onClick={()=>{router.push(`/novel/${novel.id}`)}}>
                <img
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${novel.attributes.Cover.data.attributes.formats.small.url}`}
                />
              </div>            
          ))}
        </div>
      </div>
      <div className={CarouselStyles.navigation}>
        {content.data.map((novel, id) => (
          <div
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
