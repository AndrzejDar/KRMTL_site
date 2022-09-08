import React from "react";
import ChaptersList from "./ChaptersList";
import { FaTag } from "react-icons/fa";
import Link from "next/link";
import novelCompactStyles from "/styles/NovelCompact.module.scss";

const NovelCompact = ({
  id,
  novel: {
    attributes: { Cover, Title, slug },    
  },
}) => {
  return (
    <Link href={`/novel/${slug}`} key={id}>
      <div className={novelCompactStyles.tile} >
        <div className={novelCompactStyles.cover}>
          <img
            src={
              Cover.data
                ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${Cover.data.attributes.formats.medium.url}`
                : "/img/missing.png"
            }
          />
        </div>
        <div className={novelCompactStyles.title}>
          <span> {Title}</span>
        </div>
      </div>
    </Link>
  );
};

export default NovelCompact;
