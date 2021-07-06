import React, { createContext, useReducer, useEffect } from 'react';
import itemsReducer from './itemsReducer';

export const ItemsContext = createContext();

const ItemsContextProvider = props => {
  const [items, dispatch] = useReducer(
    itemsReducer,
    [],
    //   () => {
    //   const localData = localStorage.getItem('hobby');
    //   return localData ? JSON.parse(localData) : [];
    // }
  );

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

  // useEffect(() => {
  //   localStorage.setItem('hobby', JSON.stringify(hobby));
  // }, [addHobby]);

  return <ItemsContext.Provider value={{ items, allItem, addItem }}>{props.children}</ItemsContext.Provider>;
};

export default ItemsContextProvider;
