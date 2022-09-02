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
  const [boss, setBoss] = useState(null);


  // UseEffects
  useEffect(() => {
    /*
     * Setup async function that will get the boss from our contract and sets in state
     */
    const fetchBoss = async () => {
      const bossTxn = await gameContract.getBigBoss();
      console.log('Boss:', bossTxn);
      setBoss(transformCharacterData(bossTxn));
    };
  
    if (gameContract) {
      /*
       * gameContract is ready to go! Let's fetch our boss
       */
      fetchBoss();
    }
  }, [gameContract]);

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

  const runAttackAction = async () => {};

  return (
    <div className="text-center">
      {/* Boss */}
      {boss && (
      <div className="">
        <div className="">
          <h2>🔥 {boss.name} 🔥</h2>
          <div className="text-center mx-auto">
            <img src={boss.imageURI} alt={`Boss ${boss.name}`} className="h-80 object-scale-down mx-auto mb-2" />
            <div className="">
              <progress value={boss.hp} max={boss.maxHp} />
              <p>{`${boss.hp} / ${boss.maxHp} HP`}</p>
            </div>
          </div>
        </div>
        <div className="">
          <button className="btn" onClick={runAttackAction}>
            {`💥 Attack ${boss.name}`}
          </button>
        </div>
      </div>
    )}

      {/* Character NFT */}
      {characterNFT && (
      <div className="">
        <div className="">
          <h2>Your Character</h2>
          <div className="">
            <div className="">
              <h2>{characterNFT.name}</h2>
              <img
                className="h-40 object-scale-down mx-auto mb-2"
                src={characterNFT.imageURI}
                alt={`Character ${characterNFT.name}`}
              />
              <div className="">
                <progress value={characterNFT.hp} max={characterNFT.maxHp} />
                <p>{`${characterNFT.hp} / ${characterNFT.maxHp} HP`}</p>
              </div>
            </div>
            <div className="">
              <h4>{`⚔️ Attack Damage: ${characterNFT.attackDamage}`}</h4>
            </div>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default Arena;