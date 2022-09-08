export const reducer = (state, action) => {
  switch (action.type) {
    case "setData":
      return {
        ...state,
        data: action.payload.data,
        totalResults: action.payload.totalResults,
        page: 1
      };
    case "loadMore":
      return {
        ...state,
        page: state.page + 1
      };
    case "addData":
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        totalResults: action.payload.totalResults
      };
    case "addDomains":
      return {
        ...state,
        domains: [...state.domains, action.payload.domain].filter(
          (v, i, a) => a.indexOf(v) === i
        )
      };
    case "selectDomain":
      return {
        ...state,
        selectedDomains: [...state.selectedDomains, action.payload.domain]
      };
    case "unselectDomain":
      return {
        ...state,
        selectedDomains: state.selectedDomains.filter(
          (item) => item !== action.payload.domain
        )
      };
    case "deselectAllDomains":
      return {
        ...state,
        selectedDomains: []
      };
    case "search":
      return { ...state, page: 1, searchTerm: action.payload.searchTerm };
    default:
      return state;
  }
};
