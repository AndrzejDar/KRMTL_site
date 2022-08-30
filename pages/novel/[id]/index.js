import { useRouter } from "next/router";
import Link from "next/link";
import { fetcher } from "../../../lib/api";
import novelStyles from "../../../styles/Novel.module.scss";
import {FaBookOpen} from 'react-icons/fa'

const novel = ({
  novel: {

    data: {
        id,
      attributes: { Chapters, Cover, Description, Title, publishedAt },
    },
  },
}) => {
  // const router = useRouter()
  // console.log(router)
  // const {id} = router.query



  return (
    <div className="app__content">
      <div className="app__content-container">
        <div className={novelStyles.novel}>
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
                                      <Link href={`./${id}/${chapter.attributes.Chapter_Number}`}>
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
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const novelsUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/novels/${context.params.id}?populate=*`;

  const novelResponse = await fetcher(novelsUrl);

  // const res = await fetch(`http://localhost:1337/api/articles/${context.params.id}`)

  // const article = await res.json()
  console.log(novelResponse);
  return {
    props: {
      novel: novelResponse,
    },
  };
};

export default novel;
