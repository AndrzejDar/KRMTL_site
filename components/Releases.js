import React from "react";
import ReleasesStyles from "../styles/Releases.module.scss";
import { useRouter } from "next/router";

const Releases = ({ content }) => {
//getting novel in content with full chapters data sorted by last updated novel
  const router = useRouter();


  //sorting novels by latest chapter
  const novels = content;
  console.log('realsfasdf data');
  console.log(novels);
  // const chapters = content.data.sort((a,b)=>new Date(b.attributes.publishedAt)-new Date(a.attributes.publishedAt));

  return (
    <div className={ReleasesStyles.container}>
      <span style={{ "font-size": "larger" }}> Latest Releases: </span>
      <div className="divider"></div>
      <div className={ReleasesStyles.filter}></div>
      <div className={ReleasesStyles.grid}>
        {novels.map((novel, id) => (
          <div className={ReleasesStyles.card} key={id}>
            <div className={ReleasesStyles.card_cover}
            onClick={()=>{router.push(`/novel/${novel.attributes.Title_Slug}`)}}
            >
                <img src={novel.attributes.Cover.data?`${process.env.NEXT_PUBLIC_STRAPI_URL}${novel.attributes.Cover.data.attributes.formats.thumbnail.url}`:'/img/missing.png'} />
            </div>
            <div className={ReleasesStyles.card_info}>
              <div className={ReleasesStyles.card_info_title}
              onClick={()=>{router.push(`/novel/${novel.attributes.Title_Slug}`)}}
              >
                <span>{novel.attributes.Title}</span>
              </div>
              <div className="divider"></div>
              <div className={ReleasesStyles.card_info_chapters}>
                
                {novel.attributes.Chapters.data.sort((a,b)=>b.attributes.Chapter_Number-a.attributes.Chapter_Number).slice(0,4).map((record, id)=>(

                  <div key={id} className={ReleasesStyles.card_info_chapter}
                  onClick={()=>{router.push(`/novel/${novel.attributes.Title_Slug}/${record.attributes.Chapter_Number}`)}}
                  >
                    <span>Chapter {record.attributes.Chapter_Number}</span>
                    <span>{new Date(record.attributes.publishedAt).toLocaleDateString()}</span>

                </div>
                  ))}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Releases;
