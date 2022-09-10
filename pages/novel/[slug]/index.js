import { fetcher } from "../../../lib/api";
import novelStyles from "../../../styles/Novel.module.scss";

import Footer from "../../../components/Footer";
import Novel from "../../../components/Novel";

const novel = ({ novel }) => {
  // console.log(novel);
  return (
    <div className="app__content">
      <div className="app__content-container">
        <Novel novel={novel} novelStyles={novelStyles} />
      </div>
      <footer className="app__footer">
        <Footer />
      </footer>
    </div>
  );
};



export const getStaticPaths = async () => {

  return {
      paths: [], //indicates that no page needs be created at build time
      fallback: 'blocking' //indicates the type of fallback
  }
}

export const getStaticProps = async (context) => {
  const novelUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/novels?filters[slug][$eq]=${context.params.slug}&populate=*`;
  const novelResponse = await fetcher(novelUrl);

  //clearing chapter content from data
  novelResponse.data.forEach(novel => {
    novel.attributes.Chapters.data.forEach(chapter=>{chapter.attributes.Chapter_Content='';
    });
  });


  return {
    props: {
      novel: novelResponse.data[0],
    },
  };
};

export default novel;
