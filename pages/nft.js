import { useEffect } from 'react'

// components
import Header from '../components/header'
import Nav from '../components/nav'

// Constants
const TWITTER_HANDLE = 'SeanPlusPlus';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const NFT = () => {
  /*
   * Start by creating a new action that we will run on component load
   */
  // Actions
  const checkIfWalletIsConnected = () => {
    /*
     * First make sure we have access to window.ethereum
     */
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have MetaMask!');
      return;
    } else {
      console.log('We have the ethereum object', ethereum);
    }
  };

  /*
   * This runs our function when the page loads.
   */
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (

    <div className="grid-bg min-h-screen">
      <Header />
      <Nav />
      <main className="flex md:mt-12">
        <div className="m-auto">

          <div className="App">
            <div className="container">
              <div className="header-container">
                <p className="header gradient-text">⚔️ Metaverse Slayer ⚔️</p>
                <p className="sub-text">Team up to protect the Metaverse!</p>
              </div>
              <div className="connect-wallet-container">
                <img
                  src="https://64.media.tumblr.com/tumblr_mbia5vdmRd1r1mkubo1_500.gifv"
                  alt="Monty Python Gif"
                />
              </div>
              <div className="footer-container">
                <img alt="Twitter Logo" className="twitter-logo" src='/twitter.svg' />
                <a
                  className="footer-text"
                  href={TWITTER_LINK}
                  target="_blank"
                  rel="noreferrer"
                >{`built with @${TWITTER_HANDLE}`}</a>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default NFT;