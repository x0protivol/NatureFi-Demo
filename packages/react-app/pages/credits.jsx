import { useEffect, useState } from "react";
import ToucanClient from "toucan-sdk";
import { useProvider, useSigner } from "wagmi";
import Header from "@/components/Header/Header";
import TokenCard from "@/components/TokenCard/TokenCard";
import { Toaster } from "react-hot-toast";
import styles from "@/styles/Credits.module.scss";
import { Token } from "@/components/TokenCard/TokenCard";
import { parseEther } from "ethers/lib/utils.js";
import { BigNumber } from "ethers";

const Credits = () => {
  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();
  const toucan = new ToucanClient("alfajores", provider);
  signer && toucan.setSigner(signer);

  const [tokens, setTokens] = useState([]);
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

  const [tco2address, setTco2address] = useState("");

  let addressArray = [];

  tokens.map((token) => {
    addressArray.push(token.address);
  });

  const redeemPoolToken = async () => {
    const redeemedTokenAddress = await toucan.redeemMany(
      "NCT",
      addressArray,
      parseEther("1.0")
    );
    redeemedTokenAddress && setTco2address(redeemedTokenAddress[0].address);
  };

  return (
    <div>
      <Header />
      <div className={styles.background}>
        <div />
      </div>
      <main className={styles.main}>
        <h1
          className={styles.titlePage}
          onClick={() => console.log(addressArray)}
        >
          Credits
        </h1>
        <div className={styles.TokenContainer}>
          {!loading &&
            tokens.map((token) => {
              return (
                <TokenCard
                  redeemPoolToken={redeemPoolToken}
                  token={token}
                  key={token.projectId}
                />
              );
            })}
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default Credits;
