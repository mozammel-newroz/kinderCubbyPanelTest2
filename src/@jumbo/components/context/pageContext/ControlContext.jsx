import React, { useReducer, createContext } from 'react';
import controlReducer from './controlReducer';

export const ControlContext = createContext();

const ControlContextProvider = props => {
  const [control, dispatch] = useReducer(controlReducer, {});

  const changeControl = (text, data) => {
    console.log('ccc', text, data);
    let id = ''
    if(data.id){
      id = data.id
    }
    dispatch({
      type: 'EDIT',
      payload: { action: text, id, data },
    });
  };

  return <ControlContext.Provider value={{ control, changeControl }}>{props.children}</ControlContext.Provider>;
};

export default ControlContextProvider;
