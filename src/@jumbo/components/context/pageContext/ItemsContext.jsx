import React, { createContext, useReducer, useEffect } from 'react';
import itemsReducer from './itemsReducer';

export const ItemsContext = createContext();

const ItemsContextProvider = props => {
  const [items, dispatch] = useReducer(itemsReducer, []);

  const addItem = data => {
    dispatch({
      type: 'ADD_ITEM',
      payload: data,
    });
  };

  const allItem = data => {
    console.log('all item:', data);
    dispatch({
      type: 'ALL_ITEM',
      payload: data,
    });
  };

  return <ItemsContext.Provider value={{ items, allItem, addItem }}>{props.children}</ItemsContext.Provider>;
};

export default ItemsContextProvider;
