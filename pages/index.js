import Head from "next/head";
import Carousel from "../components/Carousel";
import Releases from "../components/Releases";
import { fetcher } from "../lib/api";
import Footer from "../components/Footer";

export default function Home({ novels }) {
  return (
    <>
      <Head>
        <title>KRMTL</title>
        <meta
          name="description"
          content="KRMTL website created with Next.js and strapi CMS"
        />
        <link rel="icon" href="" />
      </Head>

      <main className="app__content">
        <div className="app__content-container">
          {/* {console.log(novels)} */}
          <Carousel content={novels.data.slice(0, 5)} />
          <Releases content={novels.data} />
        </div>
        <footer className="app__footer">
          <Footer />
        </footer>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const novelsUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/novels?sort=updatedAt:DESC&pagination[pageSize]=12&populate=Cover,Chapters`;
  const novelResponse = await fetcher(novelsUrl);

  return {
    props: {
      novels: novelResponse,
    },
  };
};
