import { useEffect, useState } from "react";
import ToucanClient from "toucan-sdk";
import { useProvider, useSigner } from "wagmi";
import Header from "@/components/Header/Header";
import TokenCard from "@/components/TokenCard/TokenCard";
import styles from "@/styles/Credits.module.scss";
import { TCO2TokenResponse } from "toucan-sdk/dist/types/responses";
import { Token } from "@/components/TokenCard/TokenCard";

const Credits = () => {
    const provider = useProvider();
    const {data:signer, isError, isLoading} = useSigner();
    const toucan = new ToucanClient("alfajores", provider);
    signer && toucan.setSigner(signer);

    const [tokens, setTokens] = useState<TCO2TokenResponse[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          const tco2 = await toucan.fetchAllTCO2Tokens();

          setTokens(tco2);
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
        <h1 className={styles.titlePage}>Credits</h1>
        <div className={styles.TokenContainer}>
        {!loading &&
            tokens.map((token: any) => {
              return (
                <TokenCard
                  token={token}
                  key={token.projectId }
                />
              );
            })}
        </div>
      </main>
    </div>
  );
};

export default Credits;
