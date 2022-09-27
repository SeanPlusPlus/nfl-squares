import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { ethers } from 'ethers'
import SelectCharacter from '../components/SelectCharacter';
import myEpicGame from '../utils/MyEpicGame.json'
import { transformCharacterData } from '../utils/character'

// components
import Header from '../components/header'
import Nav from '../components/nav'
import Arena from '../components/Arena';

const NFT = () => {

  const {
    CONTRACT_ADDRESS,
    CONTRACT_NETWORK,
  } = useContext(GlobalContext)
  
  const [currentAccount, setCurrentAccount] = useState(null);
  const [characterNFT, setCharacterNFT] = useState(null);

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
          <button
            className="btn mt-2"
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
    } else if (currentAccount && characterNFT) {
      return <Arena characterNFT={characterNFT} setCharacterNFT={setCharacterNFT} currentAccount={currentAccount} />
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