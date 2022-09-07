import React, {useState} from "react";
import { fetcher } from "../../../lib/api";
import Novel from "../../../components/Novel";
import novelStyles from "/styles/Novel.module.scss"
import Footer from "/components/Footer";
import Pagination from "/components/Pagination";


const tag = ({ initNovels, initPage, pageCount }) => {


  const [Novels,setNovels]=useState(initNovels);
  const [page,setPage]=useState(initPage);

  const paginate = async (page) => {
    const novelsUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/novels?populate=Cover,Chapters,tags&pagination[page]=${page}&pagination[pageSize]=12`;
    const novelsResponse = await fetcher(novelsUrl);
    setNovels(novelsResponse.data);
    setPage(page);
  };


  return (
    <div className="app__content">
      <div className="app__content-container">
        {Novels.map((novel, id) => {
            console.log(novel);

          return (<Novel key={id} novel={novel} novelStyles={novelStyles} />)
})}

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
    //     <div>
    // {console.log(Novels)}
    //         {Novels[0].attributes.tag_name}
    //         </div>
  );
};

export const getServerSideProps = async (context) => {
  const tagUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/novels?filters[tags][slug][$eq]=${context.params.slug}&pagination[1]&pagination[pageSize]=12&populate=Cover,Chapters,tags`;
  const tagResponse = await fetcher(tagUrl);
  console.log({ tagResponse });

  return {
    props: {
      initNovels: tagResponse.data,
      initPage: 1,
      pageCount: tagResponse.meta.pagination.pageCount,
    },
  };
};

export default tag;
