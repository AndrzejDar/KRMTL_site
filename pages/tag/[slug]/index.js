import React, { useState } from "react";
import { fetcher } from "../../../lib/api";
import Novel from "../../../components/Novel";
import novelStyles from "/styles/Novel.module.scss";
import Footer from "/components/Footer";
import Pagination from "/components/Pagination";


const Tag = ({ initNovels, initPage, pageCount, slug }) => {
  const [Novels, setNovels] = useState(initNovels);
  const [page, setPage] = useState(initPage);
  // 
  const paginate = async (page) => {
    // const novelsUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/novels?filters[tags][slug][$eq]=${slug}&populate=Cover,tags&pagination[page]=${page}&pagination[pageSize]=12`;
    // const novelsResponse = await fetcher(novelsUrl);

    
    
    const option = {
      populate: '*'
    };

    const novelsResponse = await (await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/novels`,option)).json();

    console.log(novelsResponse);
    setNovels(novelsResponse.data);
    setPage(page);
  };

  return (
    <div className="app__content">
      <div className="app__content-container">
        {Novels.map((novel, id) => {
          // console.log(novel);

          return <Novel key={id} novel={novel} novelStyles={novelStyles} />;
        })}

        <Pagination current={page} total={pageCount} paginate={paginate} />
      </div>
      <footer className="app__footer">
        <Footer />
      </footer>
    </div>
    //     <div>
    // {console.log(Novels)}
    //         {Novels[0].attributes.tag_name}
    //         </div>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export const getStaticProps = async (context) => {
  const tagUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/novels?filters[tags][slug][$eq]=${context.params.slug}&pagination[1]&pagination[pageSize]=12&populate=Cover,Chapters,tags`;
  const tagResponse = await fetcher(tagUrl);
  // console.log({ tagResponse });

  //clearing chapter content from data
  tagResponse.data.forEach((novel) => {
    novel.attributes.Chapters.data.forEach((chapter) => {
      chapter.attributes.Chapter_Content = "";
    });
  });

  return {
    props: {
      initNovels: tagResponse.data,
      initPage: 1,
      pageCount: tagResponse.meta.pagination.pageCount,
      slug: context.params.slug,
    },
  };
};

export default Tag;
