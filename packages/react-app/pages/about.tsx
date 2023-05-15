import Header from "@/components/Header/Header";

import styles from "@/styles/About.module.scss";

const About = () => {
  return (
    <div>
      <Header />
      <div className={styles.background}>
        <div />
      </div>
      <main className={styles.main}>
        <h1 className={styles.titlePage}>About</h1>
        <div className={styles.newsContainer}></div>
      </main>
    </div>
  );
};

export default About;
