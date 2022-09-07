import { useContext, useState } from "react";
import { SearchBox } from "../components/SearchBox";
import { StateContext } from "../context/StateProvider";

const SearchBoxContainer = () => {
  const [, dispatch] = useContext(StateContext);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (e) => setSearchTerm(e.target.value);
  const handleOnSubmit = () => {
    const url =
      "https://newsapi.org/v2/everything?" +
      "apiKey=855626963385476ca6f079a3bcdeb409&" +
      "pageSize=6&q=" +
      searchTerm;
    const req = new Request(url);
    fetch(req)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if (window.localStorage.getItem("topics"))
          window.localStorage.setItem(
            "topics",
            JSON.stringify(
              [
                ...JSON.parse(window.localStorage.getItem("topics")),
                searchTerm
              ].filter((v, i, a) => a.indexOf(v) === i)
            )
          );
        else
          window.localStorage.setItem("topics", JSON.stringify([searchTerm]));
        dispatch({
          type: "search",
          payload: {
            searchTerm: searchTerm
          }
        });
        dispatch({
          type: "setData",
          payload: {
            data: responseData.articles,
            totalResults: responseData.totalResults
          }
        });
      })
      .catch((e) => console.log(e));
  };
  const handleOnClear = () => setSearchTerm("");

  return (
    <SearchBox
      onChange={handleSearchTerm}
      onSubmit={handleOnSubmit}
      value={searchTerm}
      onClear={handleOnClear}
    />
  );
};

export default SearchBoxContainer;
