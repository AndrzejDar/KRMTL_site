import React from "react";
import ChaptersList from "./ChaptersList";
import { FaTag } from "react-icons/fa";
import Link from "next/link";

const Novel = ({
  novel: {
    attributes: { Chapters, Cover, Description, Title, slug, tags },
    id,
  },
  novelStyles,
}) => {
  let arry = [];
  if (Chapters?.data) {
    arry = Chapters.data
      .sort((a, b) => a.attributes.Chapter_Number - b.attributes.Chapter_Number)
      .slice(0, 11);
    if (Chapters.data.length >= 12)
      arry = [...arry, Chapters.data[Chapters.data.length - 1]];
  }

  return (
    <div className={novelStyles.novel} key={id}>
      <div className={novelStyles.left}>
        <div className={novelStyles.cover}>
          {console.log(Cover.data)}
          <img
            src={
              Cover.data
                ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${Cover.data.attributes.formats.medium.url}`
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
          <div className={novelStyles.tags}>
            {console.log(tags)}
            {tags.data.map((tag, id) => (
              <Link key={id} href={`/tag/${tag.attributes.slug}`}>
                <div className={novelStyles.tag}>
                  {console.log(tag.attributes.slug)}
                  <FaTag />
                  <span>{tag.attributes.tag_name}</span>
                </div>
              </Link>
            ))}
          </div>
          <pre>{Description}</pre>
        </div>

        <ChaptersList
          novelStyles={novelStyles}
          content={arry}
          slug={slug}
          novel_id={id}
        />
      </div>
    </div>
  );
};

export default Novel;
