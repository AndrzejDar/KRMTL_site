import { fetcher } from "/lib/api";
import novelStyles from "/styles/Novel.module.scss";
import Novel from "/components/Novel";
import Carousel from "/components/Carousel";

const novel = ({ novels }) => {
  // const router = useRouter()
  //   console.log(novels);
  // const {id} = router.query

  return (
    <div className="app__content">
      <div className="app__content-container">
        <Carousel content={novels} />
        {novels.data.map((novel, id) => (
          <Novel key={id} novel={novel} novelStyles={novelStyles} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const novelsUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/novels?populate=*`;

  const novelsResponse = await fetcher(novelsUrl);

  // const res = await fetch(`http://localhost:1337/api/articles/${context.params.id}`)

  // const article = await res.json()
  //   console.log(novelsResponse);
  return {
    props: {
      novels: novelsResponse,
    },
  };
};

export default novel;
