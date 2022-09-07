import React, { useState } from "react";
import { useRouter } from "next/router";
import { fetcher } from "/lib/api";
import novelStyles from "/styles/Novel.module.scss";
import NovelCompact from "/components/NovelCompact";
import Footer from "/components/Footer";
import Link from "next/link";
import Pagination from "/components/Pagination";

const tag = ({ tags, initNovels, initPage, pageCount }) => {
  const [novels,setNovels]=useState(initNovels);
  const [page,setPage]=useState(initPage);

  const paginate = async (page) => {
    const novelsUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/novels?populate=Cover&sort=updatedAt:DESC&pagination[page]=${page}&pagination[pageSize]=12`;
    const novelsResponse = await fetcher(novelsUrl);
    setNovels(novelsResponse.data);
    setPage(page);
  };

  return (
    <div className="app__content">
      <div className="app__content-container">
        <div className={novelStyles.tagFilter}>
          <span>Filter by tag:</span>
          <div className={novelStyles.tagFilterList}>
            <Link href={"/tag"}>
              <div className={`${novelStyles.tagButton} ${novelStyles.active}`}>
                All
              </div>
            </Link>

            {tags.map((tag, id) => (
              <div className={novelStyles.tagButton}>
                <Link href={`/tag/${tag.attributes.slug}`}>
                  {tag.attributes.tag_name}
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* <Carousel content={novels.slice(0,5)} /> */}
        <div className="smallGrid">
          {/* {console.log(tag)} */}
          {novels.map((novel, id) => (
            <NovelCompact key={id} novel={novel} />
            // {/* // <Novel key={id} novel={novel} novelStyles={novelStyles} /> */}
          ))}
        </div>
        <Pagination
          current={page}
          total={pageCount}
          paginate={paginate}
        />
      </div>
      <footer className="app__footer">
        <Footer />
      </footer>
    </div>
  );
};

export const getServerSideProps = async ({ query: { page = 1 } }) => {
  //get list of all tags
  const tagsUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/tags`;
  const tagsResponse = await fetcher(tagsUrl);
  //get a list of all novels
  const novelsUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/novels?populate=Cover&sort=updatedAt:DESC&pagination[1]&pagination[pageSize]=12`;
  const novelsResponse = await fetcher(novelsUrl);

  return {
    props: {
      tags: tagsResponse.data,
      initNovels: novelsResponse.data,
      initPage: page,
      pageCount: novelsResponse.meta.pagination.pageCount,
    },
  };
};

export default tag;
