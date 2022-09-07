export const reducer = (state, action) => {
  switch (action.type) {
    case "setData":
      return {
        ...state,
        data: action.payload.data,
        totalResults: action.payload.totalResults
      };
    case "loadMore":
      return {
        ...state,
        page: state.page + 1
      };
    case "search":
      return { ...state, page: 1, searchTerm: action.payload.searchTerm };
    default:
      return state;
  }
};
