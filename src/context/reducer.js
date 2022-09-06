export const reducer = (state, action) => {
  switch (action.type) {
    case "setData":
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};
