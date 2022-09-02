import React, {
  createContext,
  useReducer,
  useEffect,
} from 'react';
import AppReducer from '../reducers/AppReducer';
import { log } from '../utils/logger'

const { env: { NODE_ENV }} = process

const initialState = {
  NODE_ENV,
  CONTRACT_ADDRESS: '0xFA5cbBE22A6841dE111DC886BDfEA30FDaC3b838',
  account: null,
  networkVersion: null,
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({
  children
}) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions for changing state
  function setAccount(data) {
    dispatch({
      type: 'UPDATE_ACCOUNT',
      payload: data
    });
  }

  function setNetworkVersion(data) {
    dispatch({
      type: 'UPDATE_NETWORK_VERSION',
      payload: data
    });
  }

  useEffect(() => {
    log('state', 'rgb(217, 38, 169)', state);
  }, [state])

  return ( <GlobalContext.Provider value = {
      {
        ...initialState,
        setAccount,
        setNetworkVersion,
      }
    } > {
      children
    } </GlobalContext.Provider>
  )
}