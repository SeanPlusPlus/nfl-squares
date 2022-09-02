import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState'
import { ethers } from 'ethers';
import myEpicGame from '../utils/MyEpicGame.json'
import { transformCharacterData } from '../utils/character'

/*
 * We pass in our characterNFT metadata so we can show a cool card in our UI
 */
const Arena = ({ characterNFT }) => {
  const {
    CONTRACT_ADDRESS
  } = useContext(GlobalContext)

  // State
  const [gameContract, setGameContract] = useState(null);

  // UseEffects
  useEffect(() => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        myEpicGame.abi,
        signer
      );

      setGameContract(gameContract);
    } else {
      console.log('Ethereum object not found');
    }
  }, []);

  return (
    <div className="text-center">
      {/* Boss */}
      <p>BOSS GOES HERE</p>

      {/* Character NFT */}
      <p>CHARACTER NFT GOES HERE</p>
    </div>
  );
};

export default Arena;