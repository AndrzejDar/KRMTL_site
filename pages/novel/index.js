import { useState } from "react";
import { fetcher } from "/lib/api";
import { useRouter } from "next/router";
import novelStyles from "/styles/Novel.module.scss";
import NovelCompact from "/components/NovelCompact";
import Footer from "../../components/Footer";
import Link from "next/link";
import Pagination from "/components/Pagination";

const novel = ({ initNovels, tags, initPage, pageCount }) => {
  // const router = useRouter();

  const [novels, setNovels] = useState(initNovels);
  const [page, setPage] = useState(initPage);

  const paginate = async (page) => {
    // router.push(`/novel?&pagination[page]=${page}&pagination[pageSize]=12`);
    const novelsUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/novels?populate=Cover&sort=updatedAt:DESC&pagination[page]=${page}&pagination[pageSize]=12`;
    const novelsResponse = await fetcher(novelsUrl);
    setNovels(novelsResponse.data);
    setPage(page);
  };

  return (
    <div className="app__content">
      <div className="app__content-container">
        <div className={novelStyles.tagFilter}>
          <span>Filter:</span>
          <div className={novelStyles.tagFilterList}>
            <Link href={"/tag"}>
              <div className={`${novelStyles.tagButton} ${novelStyles.active}`}>
                All
              </div>
            </Link>

            {tags.map((tag, id) => (
              <div className={novelStyles.tagButton} key={id}>
                <Link href={`/tag/${tag.attributes.slug}`}>
                  {tag.attributes.tag_name}
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* <Carousel content={novels.slice(0,5)} /> */}
        <div className="smallGrid">
          {novels.map((novel, id) => (
            <NovelCompact key={id} novel={novel} />
            // <Novel key={id} novel={novel} novelStyles={novelStyles} />
          ))}
        </div>
        <Pagination current={page} total={pageCount} paginate={paginate} />
      </div>
      <footer className="app__footer">
        <Footer />
      </footer>
    </div>
  );
};

export const getStaticProps = async () => {
  //get list of all tags
  const tagsUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/tags`;
  const tagsResponse = await fetcher(tagsUrl);
  //get a list of all novels
  const novelsUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/novels?populate=Cover&sort=updatedAt:DESC&pagination[page]=1&pagination[pageSize]=12`;
  const novelsResponse = await fetcher(novelsUrl);

  return {
    props: {
      tags: tagsResponse.data,
      initNovels: novelsResponse.data,
      initPage: 1,
      pageCount: novelsResponse.meta.pagination.pageCount,
    },
  };
};

export default novel;
