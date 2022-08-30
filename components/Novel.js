import React from 'react'
import { useRouter } from "next/router";
import Link from "next/link";
import {FaBookOpen} from 'react-icons/fa'

const Novel = ({novel: {
    attributes: { 
        Chapters, Cover, Description, Title, publishedAt 
    }, 
    id},
    novelStyles,
}) => {

  return (    
    <div className={novelStyles.novel} key={id}>
    <div className={novelStyles.left}>
      <div className={novelStyles.cover}>
        <img
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${Cover.data.attributes.formats.medium.url}`}
        />
      </div>
      <div className={novelStyles.stats}></div>
      <div className={novelStyles.actions}></div>
    </div>

    <div className={novelStyles.right}>
      <div className={novelStyles.header}>
        <h1> {Title}</h1>
        <p>{Description}</p>
      </div>
      <div className={novelStyles.chapters}>
        <span>Chapters</span>
        <div className="divider"></div>
        <div className={novelStyles.chapter_list}>
          {Chapters.data.map((chapter) => (
                                <Link href={`/novel/${id}/${chapter.attributes.Chapter_Number}`}>
            <div className={novelStyles.chapter}>
              <FaBookOpen />
              <div className={novelStyles.chapterNumber}>
                <span>Chapter {chapter.attributes.Chapter_Number}</span>
                <span>published: {new Date(chapter.attributes.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}

export default Novel