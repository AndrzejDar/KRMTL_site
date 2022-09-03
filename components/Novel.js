import React from "react";
import ChaptersList from "./ChaptersList";

const Novel = ({
  novel: {
    attributes: {
      Chapters,
      Cover,
      Description,
      Title,
      Title_Slug,
    },
    id,
  },
  novelStyles,
}) => {

let arry = Chapters.data
  .sort((a,b)=>a.attributes.Chapter_Number-b.attributes.Chapter_Number)
  .slice(0,11);
if(Chapters.data.length>=12)arry=[...arry,Chapters.data[Chapters.data.length-1]]


  return (
    <div className={novelStyles.novel} key={id}>
      <div className={novelStyles.left}>
        <div className={novelStyles.cover}>
          <img
            src={
              Cover.data
                ? (process.env.CLOUDINARY==='TRUE'?(Cover.data.attributes.formats.medium.url):(`${process.env.NEXT_PUBLIC_STRAPI_URL}${Cover.data.attributes.formats.medium.url}`))
                : "/img/missing.png"
            }
          />
        </div>
        <div className={novelStyles.stats}></div>
        <div className={novelStyles.actions}></div>
      </div>

      <div className={novelStyles.right}>
        <div className={novelStyles.header}>
          <h1> {Title}</h1>
          <pre>{Description}</pre>
        </div>

        <ChaptersList novelStyles={novelStyles} content={arry} Title_Slug={Title_Slug} novel_id={id} />

      </div>
    </div>
  );
};

export default Novel;
