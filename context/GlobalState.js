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
  CONTRACT_ADDRESS: '0x1deb9cEd11322c1a3827B952BB7802d5Df75fedE',
  account: null,
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

  useEffect(() => {
    log('state', 'rgb(217, 38, 169)', state);
  }, [state])

  return ( <GlobalContext.Provider value = {
      {
        ...initialState,
        setAccount,
      }
    } > {
      children
    } </GlobalContext.Provider>
  )
}