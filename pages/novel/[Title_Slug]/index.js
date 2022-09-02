import { fetcher } from "../../../lib/api";
import novelStyles from "../../../styles/Novel.module.scss";

import Footer from "../../../components/Footer";
import Novel from "../../../components/Novel";

const novel = ({ novel }) => {
  console.log(novel);
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

export const getServerSideProps = async (context) => {
  const novelUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/novels?filters[Title_Slug][$eq]=${context.params.Title_Slug}&populate=*`;
  const novelResponse = await fetcher(novelUrl);
  return {
    props: {
      novel: novelResponse.data[0],
    },
  };
};

export default novel;
