import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

import Header from "@/components/Header/Header";
import NewsCard, { Article } from "@/components/NewsCard/NewsCard";

import styles from "@/styles/News.module.scss";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        "https://newsapi.org/v2/everything?q=carbon%credit&sortBy=publishedAt&apiKey=ba4da4286d754c11942f06d609b7f4db"
      );
      const data = await res.json();

      setNews(data.articles);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.background}>
        <div />
      </div>
      <main className={styles.main}>
        <h1 className={styles.titlePage}>News</h1>
        <div className={styles.newsContainer}>
          {loading && (
            <TailSpin
              height="80"
              width="80"
              color="#39b044"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          )}
          {!loading &&
            news.map((article: Article) => {
              return (
                <NewsCard
                  article={article}
                  key={article.source.id + article.title}
                />
              );
            })}
        </div>
      </main>
    </div>
  );
};

export default News;
