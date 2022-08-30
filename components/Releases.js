import React from "react";
import ReleasesStyles from "../styles/Releases.module.scss";
import { useRouter } from "next/router";

const Releases = ({ content }) => {

  const router = useRouter();

  const chapters = content.data.sort((a,b)=>new Date(b.attributes.publishedAt)-new Date(a.attributes.publishedAt));

  return (
    <div className={ReleasesStyles.container}>
      <span style={{ "font-size": "larger" }}> Latest Releases: </span>
      <div className="divider"></div>
      <div className={ReleasesStyles.filter}></div>
      <div className={ReleasesStyles.grid}>
        {chapters.map((chapter) => (
          <div className={ReleasesStyles.card} onClick={()=>{router.push(`/novel/${chapter.attributes.Novel.data.id}/${chapter.attributes.Chapter_Number}`)}}>
            <div className={ReleasesStyles.card_cover}>
                <img src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${chapter.attributes.Cover.data.attributes.formats.thumbnail.url}`} />
            </div>
            <div className={ReleasesStyles.card_info}>
              <div className={ReleasesStyles.card_info_title}>
                <span>{chapter.attributes.Novel.data.attributes.Title}</span>
              </div>
              <div className={ReleasesStyles.card_info_chapter}>
                <span>Chapter {chapter.attributes.Chapter_Number}</span>
                <span>{new Date(chapter.attributes.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className={ReleasesStyles.card_info_description}>
              <span> Maybe some description / synopsis here? Lorem ipsum dolor sit amet consectetur adipisicing elit. Et excepturi, nam quia ex ut iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores architecto natus sed consectetur incidunt doloribus.</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Releases;
