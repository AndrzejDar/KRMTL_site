import Head from "next/head";
import Releases from "../components/Releases";
import NovelCompact from "/components/NovelCompact";
import { fetcher } from "../lib/api";
import Footer from "../components/Footer";
import React, { useState, useEffect } from "react";
import searchStyles from "/styles/Search.module.scss";
import Pagination from "/components/Pagination";

const search = ({ releases }) => {
  const [query, setQuery] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/novels?filters[Title][$containsi]=${query}&pagination[page]=${page}&pagination[pageSize]=6&populate=Cover`;
    const data = await fetcher(url);
    console.log(data);
    console.log(data.meta.pagination.pageCount);
    setPageCount(data.meta.pagination.pageCount);
    setSearchRes(data.data);
 
  };

  const paginate = async (page) => {
    setPage(page);
    // fetchData();
    console.log(page)
  };

  useEffect(() => {
    if (query.length > 2) {
      fetchData();
    }
  }, [query,page]);

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
          <div className="smallGrid">
            <div className={searchStyles.container}>
              <div className={searchStyles.search}>
                <span>Search for Novel:</span>
                <div className={searchStyles.searchField}>
                  <input
                    type="text"
                    placeholder="..."
                    onChange={(e) => setQuery(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className={searchStyles.results}>
                {searchRes.length > 0 ? (
                  <div className="smallGrid">
                    {searchRes.map((novel, id) => {                      
                      return (
                        <NovelCompact id={id} novel={novel} />
                      );
                    })}
                  </div>
                ) : query.length > 2 ? (
                  <span>no results</span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          {pageCount>1?
          <Pagination current={page} total={pageCount} paginate={paginate} />
          :''}

          <div className="divider"></div>
          <span>OR browse our latest releases:</span>
          <Releases content={releases.data} />
        </div>
        <footer className="app__footer">
          <Footer />
        </footer>
      </main>
    </>
  );
};

export const getStaticProps = async () => {
  const releasesUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/novels?sort=updatedAt:DESC&pagination[pageSize]=12&populate=Cover,Chapters`;
  const releasesResponse = await fetcher(releasesUrl);

  return {
    props: {
      releases: releasesResponse,
    },
  };
};

export default search;
