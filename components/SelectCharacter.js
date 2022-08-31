import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState'
import { ethers } from 'ethers';
import myEpicGame from '../utils/MyEpicGame.json'
import { transformCharacterData } from '../utils/character'

const SelectCharacter = ({ setCharacterNFT }) => {
  const {
    CONTRACT_ADDRESS
  } = useContext(GlobalContext)

  const [characters, setCharacters] = useState([]);
  const [gameContract, setGameContract] = useState(null);

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
  
      /*
       * This is the big difference. Set our gameContract in state.
       */
      setGameContract(gameContract);
    } else {
      console.log('Ethereum object not found');
    }
  }, [])

  useEffect(() => {
    const getCharacters = async () => {
      try {
        console.log('Getting contract characters to mint');
  
        /*
         * Call contract to get all mint-able characters
         */
        const charactersTxn = await gameContract.getAllDefaultCharacters();
        console.log('charactersTxn:', charactersTxn);
  
        /*
         * Go through all of our characters and transform the data
         */
        const characters = charactersTxn.map((characterData) =>
          transformCharacterData(characterData)
        );
  
        /*
         * Set all mint-able characters in state
         */
        setCharacters(characters);
      } catch (error) {
        console.error('Something went wrong fetching characters:', error);
      }
    };
  
    /*
     * If our gameContract is ready, let's get characters!
     */
    if (gameContract) {
      getCharacters();
    }
  }, [gameContract]);

  const renderCharacters = () =>
    characters.map((character, index) => (
      <div className="flex-1 mr-4" key={character.name}>
        <div className="mt-4">
          <p className="font-bold">{character.name}</p>
        </div>
        <img src={character.imageURI} alt={character.name} className="h-40 w-40 object-scale-down" />
        <button
          type="button"
          className="btn"
          onClick={()=> mintCharacterNFTAction(index)}
        >{`Mint ${character.name}`}</button>
      </div>
    ));

  return (
    <div className="text-center">
      <h2>Mint Your Hero. Choose wisely.</h2>
      {characters.length > 0 && (
        <div className="flex">
          {renderCharacters()}
        </div>
      )}
    </div>
  );
};

export default SelectCharacter;