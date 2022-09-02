import { fetcher } from "/lib/api";
import novelStyles from "/styles/Novel.module.scss";
import Novel from "/components/Novel";
import Carousel from "/components/Carousel";
import Footer from "../../components/Footer";

const novel = ({ novels }) => {

  return (
    <div className="app__content">
      <div className="app__content-container">
        <Carousel content={novels.slice(0,5)} />
        {novels.map((novel, id) => (
          <Novel key={id} novel={novel} novelStyles={novelStyles} />
        ))}
      </div>
      <footer className="app__footer">
          <Footer />
        </footer>
    </div>
  );
};

export const getServerSideProps = async (context) => {

  const novelsUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/novels?populate=*`;
  const novelsResponse = await fetcher(novelsUrl);

  return {
    props: {
      novels: novelsResponse.data,
    },
  };
};

export default novel;
