const itemsReducer = (state, action) => {
  switch (action.type) {
    case 'ALL_ITEM':
      return [...action.payload];
    case 'ADD_ITEM':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default itemsReducer;
