import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";

import Header from "../components/Header/Header";
import Forms from "@/components/Forms/Forms";
import Modal from "@/components/Modal/Modal";

import styles from "@/styles/Home.module.scss";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const close = () => setShowModal(false);
  const open = () => setShowModal(true);

  return (
    <>
      <div className="pageContainer">
        <Header />
        <div className={styles.background}>
          <div />
        </div>
        <main className={styles.main}>
          <section className={styles.firstSection}>
            <div className={styles.textContent}>
              <h1>
                Your actions <br />
                <span>matter</span>.
              </h1>
              <p>
                Buy and sell carbon credits to combat <br />
                climate change and preserve our planet
              </p>
              <div className={styles.actions}>
                <button onClick={() => (showModal ? close() : open())}>
                  Carbon footprint
                </button>
                <button>Available credits</button>
              </div>
            </div>
            <div className={styles.imgContent}>
              <Image
                src="nftImages.svg"
                alt="nft_examples"
                width={531}
                height={604}
              />
            </div>
          </section>
          <section className={styles.secondSection}>
            <h1>
              <span>Our</span> Pillars
            </h1>
            <div className={styles.content}>
              <div className={styles.row}>
                <div className={styles.box}>
                  <div>
                    <Image
                      src="/transparency.svg"
                      alt="transparency_icon"
                      width={120}
                      height={120}
                    />
                  </div>
                  <h2>Transparency</h2>
                  <p>
                    Tokenization enables tracking and recording carbon credit
                    transactions in an immutable and transparent manner.
                  </p>
                </div>
                <div className={styles.box}>
                  <div>
                    <Image
                      src="/innovation.svg"
                      alt="innovation_icon"
                      width={120}
                      height={120}
                    />
                  </div>
                  <h2>Technology and innovation</h2>
                  <p>
                    A tecnologia Toucan, an infrastructure blockchain, provides
                    a secure and decentralized environment for asset
                    tokenization. Integration with the Celo network allows for
                    the exchange and transaction of carbon credit tokens within
                    the Celo ecosystem, leveraging its trusted and efficient
                    infrastructure.
                  </p>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.box}>
                  <div>
                    <Image
                      src="/democratization.svg"
                      alt="democratization_icon"
                      width={120}
                      height={120}
                    />
                  </div>
                  <h2>Democratization</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    a nulla fermentum est commodo laoreet. Donec rutrum accumsan
                    dignissim. Nunc varius faucibus dolor ac placerat. Mauris
                    semper erat quis magna ultricies, egestas consectetur lectus
                    dignissim.
                  </p>
                </div>
                <div className={styles.box}>
                  <div>
                    <Image
                      src="/sustainability.svg"
                      alt="sustainability_icon"
                      width={120}
                      height={120}
                    />
                  </div>
                  <h2>Sustainability</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    a nulla fermentum est commodo laoreet. Donec rutrum accumsan
                    dignissim. Nunc varius faucibus dolor ac placerat. Mauris
                    semper erat quis magna ultricies, egestas consectetur lectus
                    dignissim.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && (
          <Modal handleClose={close}>
            <Forms />  
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
