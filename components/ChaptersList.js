import React, { useEffect, useState } from "react";
import Link from "next/Link";
import { fetcher } from "../lib/api";
import {
  FaBookOpen,
  FaLongArrowAltDown,
  FaLongArrowAltUp,
  FaAngleDoubleDown,
} from "react-icons/fa";

const ChaptersList = ({ novelStyles, content, Title_Slug, novel_id }) => {
  const [sort, setSort] = useState(true);
  const [showing, setShowing] = useState(content.length-1);

  const [chapters, setChapters] = useState([...content]);

  //   useEffect(() => {
  //     setChapters(content);
  //   }, []);

  const sortData = (data) => {
    console.log({sort});
    console.log({data});
    let sorted = [...data];
    if (sort) {
        sorted = sorted
        .sort((a, b) => a.attributes.Chapter_Number - b.attributes.Chapter_Number);
        console.log('DESC');
    } else {
        sorted = sorted
        .sort((a, b) => b.attributes.Chapter_Number - a.attributes.Chapter_Number);
        console.log('ASC')
    }
    console.log("after sorting");
    console.log(sorted);
    console.log({sort});
    return sorted;
  };

  const loadMore = async () => {
    console.log({sort});
    const novelsUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/novels/${novel_id}?&populate=*`;
    const novelResponse = await fetcher(novelsUrl);
    console.log(novelResponse.data.attributes.Chapters.data);
    const sorted = await sortData(novelResponse.data.attributes.Chapters.data);
    console.log({sorted});
    setChapters(sorted);
    console.log({chapters});
    console.log({sort});

  };

  useEffect(() => {
    setChapters(sortData(chapters));
  }, [sort]);

  return (
    <div className={novelStyles.chapters}>
      <div className={novelStyles.chapters_header}>
        <span>Chapters:</span>
        <div
          className={novelStyles.chapter_sorting}
          onClick={() => setSort(!sort)}
        >
          <FaLongArrowAltDown />
          <FaLongArrowAltUp />
        </div>
      </div>
      <div className="divider"></div>
      <div className={novelStyles.chapter_list}>
        {chapters.map((chapter, id) => (
            id<=showing?
                <Link key={id} 
                href={`/novel/${Title_Slug}/${chapter.attributes.Chapter_Number}`}
                >
            <div className={novelStyles.chapter}>
              <FaBookOpen />
              <div className={novelStyles.chapterNumber}>
                <span>Chapter {chapter.attributes.Chapter_Number}</span>
                <span>
                  published:{" "}
                  {new Date(
                      chapter.attributes.publishedAt
                      ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>
          :('')
        ))}
      </div>
      <div className={novelStyles.loadMore}>
        <FaAngleDoubleDown onClick={() => {loadMore(); setShowing(showing+12)}} />
      </div>
    </div>
  );
};

export default ChaptersList;
