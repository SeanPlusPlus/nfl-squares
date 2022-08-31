import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { ethers } from 'ethers'

// components
import Header from '../components/header'
import Nav from '../components/nav'
import SelectCharacter from '../components/SelectCharacter';
import myEpicGame from '../utils/MyEpicGame.json'
import { transformCharacterData } from '../utils/character'

const NFT = () => {

  const {
    CONTRACT_ADDRESS
  } = useContext(GlobalContext)
  
  const [currentAccount, setCurrentAccount] = useState(null);
  const [characterNFT, setCharacterNFT] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Make sure you have MetaMask!');
        return;
      } else {
        console.log('We have the ethereum object', ethereum);

        /*
         * Check if we're authorized to access the user's wallet
         */
        const accounts = await ethereum.request({ method: 'eth_accounts' });

        /*
         * User can have multiple authorized accounts, we grab the first one if its there!
         */
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found an authorized account:', account);
          setCurrentAccount(account);
        } else {
          console.log('No authorized account found');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      /*
       * Fancy method to request access to account.
       */
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      /*
       * Boom! This should print out public address once we authorize Metamask.
       */
      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();

    const checkNetwork = async () => {
      try { 
        if (window.ethereum.networkVersion !== '80001') {
          alert("Please connect to Mumbai!")
        }
      } catch(error) {
        console.log(error)
      }
    }
    checkNetwork();
  }, []);

  useEffect(() => {
    /*
     * The function we will call that interacts with our smart contract
     */
    const fetchNFTMetadata = async () => {
      console.log('Checking for Character NFT on address:', currentAccount);
  
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        myEpicGame.abi,
        signer
      );
  
      const txn = await gameContract.checkIfUserHasNFT();
      if (txn.name) {
        console.log('User has character NFT');
        setCharacterNFT(transformCharacterData(txn));
      } else {
        console.log('No character NFT found');
      }
    };
  
    /*
     * We only want to run this, if we have a connected wallet
     */
    if (currentAccount) {
      console.log('CurrentAccount:', currentAccount);
      fetchNFTMetadata();
    }
  }, [currentAccount]);

  const renderContent = () => {
    /*
     * Scenario #1
     */
    if (!currentAccount) {
      return (
        <div className="text-center">
          <img
            src="https://64.media.tumblr.com/tumblr_mbia5vdmRd1r1mkubo1_500.gifv"
            alt="Monty Python Gif"
          />
          <button
            className="btn mt-2"
            onClick={connectWalletAction}
          >
            Connect Wallet To Get Started
          </button>
        </div>
      );
      /*
       * Scenario #2
       */
    } else if (currentAccount && !characterNFT) {
      return <SelectCharacter setCharacterNFT={setCharacterNFT} />;
    }
  };

  return (

    <div className="grid-bg min-h-screen">
      <Header />
      <Nav />
      <main className="flex md:mt-12">
        <div className="m-auto">

          <div className="">
            <div className="">
              <div className="text-center mb-2">
                <p className="">⚔️ Metaverse Slayer ⚔️</p>
                <p className="">Team up to protect the Metaverse!</p>
              </div>
              {renderContent()}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default NFT;