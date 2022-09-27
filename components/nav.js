import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { truncatePublicKey } from '../utils/wallet'

// components
import About from './modals/About'
import Profile from './modals/Profile'

const Nav = () => {
  const [networkVersionWarning, setNetworkVersionWarning] = useState('')
 
  const {
    setModal,
    account,
    setAccount,
    setNetworkVersion,
    CONTRACT_ADDRESS,
    CONTRACT_NETWORK,
  } = useContext(GlobalContext)
 
  const handleOpenProfile = () => {
    setModal({profile: 'modal-open'})
  }

  const handleOpenAbout = () => {
    setModal({about: 'modal-open'})
  }

  const handleRefresh = () => {
    window.location.reload(false);
  }

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
      setAccount({
        publicKey: accounts[0],
      })
      console.log('Wallet connect successful');
    } catch (error) {
      console.log(error);
    }
  };

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
          setAccount({
            publicKey: accounts[0],
          })
          console.log('check connected pass')
        } else {
          console.log('No authorized account found');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();

    const checkNetwork = async () => {
      setNetworkVersion(window.ethereum.networkVersion)
      try { 
        if (window.ethereum.networkVersion !== CONTRACT_NETWORK.id) {
          // setNetworkVersionWarning('modal-open')
          console.log('network warning');
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
    console.log('account updated', account);
  }, [account]);

  return (
    <>
      <div className="navbar shadow-lg bg-neutral text-neutral-content">
        <div className="flex-1">
          <Link href="/">
            <button className="btn btn-outline normal-case text-xl ml-2">
              <span className="text-slate-300">NFL Squares</span>
            </button>
          </Link>
        </div>
        <div className="flex-none gap-2">
          <button className="mr-2 link link-hover" onClick={handleOpenAbout}>About</button>
          { account ? (
            <>
              <div className="dropdown dropdown-end">
                <label tabIndex="0" className="btn btn-outline text-stone-50">
                  {truncatePublicKey(account.publicKey)}
                </label>
                <ul tabIndex="0" className="p-2 shadow menu menu-compact dropdown-content bg-neutral rounded-box w-52">
                  <li>
                    <button onClick={handleOpenProfile} className="justify-between">
                      Profile
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <button
                className="mr-2 btn btn-outline"
                onClick={connectWalletAction}
              >
                Connect Wallet
              </button>
            </>
          )}
        </div>
      </div>

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

      <About />
      <Profile />
    </>
  )
}

export default Nav 
