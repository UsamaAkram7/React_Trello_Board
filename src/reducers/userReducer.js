const initialState = {
  user: {},
};

const user = (state = initialState, action) => {

  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        user: action.data.user,
      };
    default:
      return state;
  }
};

export default user;
