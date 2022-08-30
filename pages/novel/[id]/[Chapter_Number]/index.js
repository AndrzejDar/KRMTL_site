import Router, { useRouter } from "next/router";
import Link from "next/link";
import { fetcher } from "/lib/api";
import chapterStyles from "/styles/Chapter.module.scss";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";

const chapter = ({
  chapter: {
    attributes: {
      Title,
      publishedAt,
      Chapter_Number,
      Chapter_Content,
      Cover,
      Novel,
    },
  },
  novel,
}) => {
  const [chaptersE, setChaptersE] = useState([]);
  const router = useRouter();

  useEffect(() => {
    //redirect if chapter wasn't loaded
    console.log("init useeffect");
    console.log(router);
    if (Chapter_Content == "") router.push(`/novel/${novel.data.id}`);
  }, [router.asPath]);

  useEffect(() => {
    setChaptersE([
      ...novel.data.attributes.Chapters.data.sort((a, b) => {
        return a.attributes.Chapter_Number - b.attributes.Chapter_Number;
      }),
    ]);
  }, []);

  return (
    <div className="app__content">
      <div className="app__content-container">
        <div className={chapterStyles.chapter}>
          <div className={chapterStyles.header}>
            <div className={chapterStyles.path}>
              <span>
                <Link href={`/novel/${novel.data.id}`}>
                  {novel.data.attributes.Title}
                </Link>
                /
                <Link href={`/novel/${novel.data.id}/${Chapter_Number}`}>
                  {`Chapter ${Chapter_Number}`}
                </Link>
              </span>
            </div>
            <div className={chapterStyles.navigation}>
              <button
                onClick={() =>
                  router.push(`/novel/${novel.data.id}/${Chapter_Number - 1}`)
                }
              >
                <FaArrowLeft /> PREV
              </button>
              <div class={chapterStyles.custom_select}>
                <select
                  id="chapter"
                  name="chapters"
                  value={Chapter_Number}
                  onChange={(e) => {
                    router.push(`/novel/${novel.data.id}/${e.target.value}`);
                  }}
                >
                  {chaptersE.map((chapter, id) => (
                    <option key={id}>
                      {chapter.attributes.Chapter_Number}
                    </option>
                  ))}
                </select>
                <span class={chapterStyles.focus}></span>
              </div>
              <button
                onClick={() =>
                  router.push(`/novel/${novel.data.id}/${Chapter_Number + 1}`)
                }
              >
                <FaArrowRight /> NEXT
              </button>
            </div>
          </div>
          <div className={chapterStyles.content}>
            <pre>{Chapter_Content}</pre>
          </div>
          <div className={chapterStyles.footer}>
          <div className={chapterStyles.navigation}>
              <button
                onClick={() =>
                  router.push(`/novel/${novel.data.id}/${Chapter_Number - 1}`)
                }
              >
                <FaArrowLeft /> PREV
              </button>
              <div class={chapterStyles.custom_select}>
                <select
                  id="chapter"
                  name="chapters"
                  value={Chapter_Number}
                  onChange={(e) => {
                    router.push(`/novel/${novel.data.id}/${e.target.value}`);
                  }}
                >
                  {chaptersE.map((chapter, id) => (
                    <option key={id}>
                      {chapter.attributes.Chapter_Number}
                    </option>
                  ))}
                </select>
                <span class={chapterStyles.focus}></span>
              </div>
              <button
                onClick={() =>
                  router.push(`/novel/${novel.data.id}/${Chapter_Number + 1}`)
                }
              >
                <FaArrowRight /> NEXT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const novelUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/novels/${context.params.id}?populate=*`;
  const novelResponse = await fetcher(novelUrl);

  const selectedChapter = novelResponse.data.attributes.Chapters.data.find(
    (a) => a.attributes.Chapter_Number == context.params.Chapter_Number
  );

  return {
    props: {
      chapter: selectedChapter
        ? selectedChapter
        : {
            attributes: {
              Title: "",
              publishedAt: "",
              Chapter_Number: "",
              Chapter_Content: "",
              Cover: "",
              Novel: "",
            },
          },
      novel: novelResponse,
    },
  };
};

export default chapter;
