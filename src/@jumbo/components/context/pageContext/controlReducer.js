const controlReducer = (state, action) => {
  switch (action.type) {
    case 'EDIT':
      return { action: action.payload.action, id: action.payload.id, data: action.payload.data };
    default:
      return state;
  }
};

export default controlReducer;
