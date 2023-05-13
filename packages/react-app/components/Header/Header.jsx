import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";

import { SiOpenbadges } from "react-icons/si";
import { BiLogOut } from "react-icons/bi";

import RPC from "@/web3RPC";

import styles from "./Header.module.scss";

const clientId =
  "BDMPqtARVFOeFQ8wNM__sHa88n6_7RKVSb5tYH8ft3kF0Dx9AdIvBirJZzaDNQGs7EIE2jCBww9DFKlth66_Cw4";

const Header = (props) => {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [chainId, setChainId] = useState("");
  const [userData, setUserData] = useState({});
  const [isDropdownlOpen, setIsDropdownlOpen] = useState(false);

  const menuRef = useRef();

  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0xaef3", // hex of 42220, Celo Alfajores testnet
            rpcTarget: "https://alfajores-forno.celo-testnet.org",
          },
        });

        setWeb3auth(web3auth);
        await web3auth.initModal();
        setProvider(web3auth.provider);
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }

    let handler = (event) => {
      if (provider) {
        if (!menuRef.current.contains(event.target)) {
          setIsDropdownlOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handler);

    getUserInfo();
    getChainId();
    getAccounts();
    getBalance();
    getPrivateKey();

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [provider]);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.logout();
    setProvider(web3authProvider);
    setBalance("");
    setAddress("");
    setUserData({});
    setChainId("");
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    setUserData(user);
    console.log(user);
  };

  const getChainId = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    console.log(chainId);
    setChainId(chainId);
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    setAddress(address);
    console.log(address);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    setBalance(balance);
    console.log(balance);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
  };

  const transformedAddress = `${address.substring(0, 4)}...${address.slice(
    -4
  )}`;

  return (
    <header className={styles.header}>
      <h1>
        <Link href="/">
          Ear<span>t</span>h
        </Link>
      </h1>
      <nav className={styles.stroke}>
        <ul>
          <li className={router.pathname === "/buy" ? styles.active : ""}>
            <Link href="/buy">Buy Creadits</Link>
          </li>
          <li className={router.pathname === "/sell" ? styles.active : ""}>
            <Link href="/sell">Sell Creadits</Link>
          </li>
          <li className={router.pathname === "/about" ? styles.active : ""}>
            <Link href="/about">About</Link>
          </li>
          {!provider && (
            <li>
              <button onClick={login}>Sign Up</button>
            </li>
          )}
          {provider && (
            <>
              <li>
                <p>{transformedAddress}</p>
              </li>
              <li>
                <div
                  className={styles.userIcon}
                  onClick={() => setIsDropdownlOpen((prevState) => !prevState)}
                >
                  <img src={`${userData.profileImage}`} alt="profileImage" />
                </div>
                <div
                  className={`${styles.dropdownMenu} ${
                    isDropdownlOpen ? styles.open : styles.closed
                  }`}
                  ref={menuRef}
                >
                  <h3>Luiz Alencar</h3>
                  <ul>
                    <li className={styles.dropdownItem}>
                      <SiOpenbadges size={25} fill="black" />
                      <Link href="#">My Badges</Link>
                    </li>
                    <li className={styles.dropdownItem}>
                      <BiLogOut size={25} fill="black" />
                      <Link onClick={logout} href="#">
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
