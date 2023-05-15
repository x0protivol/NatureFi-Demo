import styles from "./TokenCard.module.scss";

import { FC } from "react";
export type Token = {
  address: string;
  name: string;
  date: string;
  projectId: string;
  symbol: string;
};

const TokenCard: FC<{ token: Token }> = (props) => {
  const { name, date, symbol, projectId } = props.token;

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardImage}></div>

        <div className={styles.cardText}>
          <h1>{name}</h1>
          <div className={styles.columnItens}>
            <p>{projectId}</p>
            <p>{date}</p>
          </div>
          <div className={styles.redeemButton}>
            <p>{symbol}</p>
            <button>Redeem Token</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenCard;
