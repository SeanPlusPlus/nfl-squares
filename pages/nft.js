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
    setNetworkVersion,
  } = useContext(GlobalContext)
  
  const [currentAccount, setCurrentAccount] = useState(null);
  const [characterNFT, setCharacterNFT] = useState(null);
  const [networkVersionWarning, setNetworkVersionWarning] = useState('');

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

  const handleRefresh = () => {
    window.location.reload(false);
  }

  useEffect(() => {
    checkIfWalletIsConnected();

    const checkNetwork = async () => {
      setNetworkVersion(window.ethereum.networkVersion)
      try { 
        if (window.ethereum.networkVersion !== CONTRACT_NETWORK.id) {
          setNetworkVersionWarning('modal-open')
        } else {
          setNetworkVersionWarning('')
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


      <div className={`modal ${networkVersionWarning}`}>
        <div className="modal-box relative">
          <h3 className="font-bold text-xl flex">
            <div className="alert alert-warning shadow-lg">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Heads Up</span>
              </div>
            </div>
          </h3>
          <div>
            <p className="pb-2 pt-4">
              Connect your wallet to the <code className="border p-1 rounded">{CONTRACT_NETWORK.name}</code> network
            </p>
            <p className="pb-4 pt-1">
              Then refresh the page
            </p>
          </div>
          <div className="modal-action">
            <button className="btn" onClick={handleRefresh}>Refresh</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default NFT;