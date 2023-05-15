import { useEffect, useState } from "react";

import Header from "@/components/Header/Header";

import styles from "@/styles/Credits.module.scss";

const News = () => {

  return (
    <div>
      <Header />
      <div className={styles.background}>
        <div />
      </div>
      <main className={styles.main}>
        <h1 className={styles.titlePage}>Credits</h1>
       
      </main>
    </div>
  );
};

export default News;
