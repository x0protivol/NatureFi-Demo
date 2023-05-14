import { FC } from "react";
import styles from "./NewsCard.module.scss";

export type Article = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

const NewsCard: FC<{ article: Article }> = (props) => {
  const { urlToImage, url, title, source, author, description } = props.article


  return (
    <a href={url} target="_blank" className={styles.card}>
      <div className={styles.cardImage}>
        <img src={urlToImage} alt={title + " image"}/>
      </div>
      <div className={styles.cardText}>
        <h1>{title}</h1>
        <h3>{source.name} - {author}</h3>
        <p>
          {description}
        </p>
      </div>
    </a>
  );
};

export default NewsCard;
