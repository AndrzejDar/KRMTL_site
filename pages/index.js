import Head from "next/head";
import Link from "next/link";
import HeroSection from "../components/HeroSection";
import Section from "../components/Section";
import Carousel from "../components/Carousel";
import Releases from "../components/Releases";
import { fetcher } from "../lib/api";

import { main } from "../src/content.json";

export default function Home({ novels, chapters }) {
  const sections = [...Object.values(main.home.sections)];

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

        <Carousel content={novels} />
        <Releases content={chapters} />
          </div>
      </main>
      <footer className=""></footer>
    </>
  );
}

export const getStaticProps = async () => {
  const novelsUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/novels?populate=*`;
  const chaptersUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/chapters?pagination[page]=0&pagination[PageSize]=12&populate=*`;
  const novelResponse = await fetcher(novelsUrl);
  const chapterResponse = await fetcher(chaptersUrl);

  return {
    props: {
      novels: novelResponse,
      chapters: chapterResponse
    },
  };
};
