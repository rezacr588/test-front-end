import { Box, Typography } from "@mui/material";
import { useRef } from "react";
import { useContext, useState } from "react";
import { SearchBox } from "../components/SearchBox";
import { mainUrl } from "../consts";
import { StateContext } from "../context/StateProvider";

const SearchBoxContainer = () => {
  const [{ searchTerm: selectedSearchTerm }, dispatch] =
    useContext(StateContext);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    clearTimeout(timeout.current);
    timeout.current = submit(e.target.value);
  };

  const timeout = useRef();

  const handleOnSubmit = () =>
    setTimeout(() => {
      const url = mainUrl + `&q=${searchTerm}`;
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
          dispatch({
            type: "deselectAllDomains"
          });
        })
        .catch((e) => console.log(e));
    }, 2000);

  const submit = (word) => handleOnSubmit(word);

  const handleOnClear = () => {
    setSearchTerm("");
    dispatch({
      type: "search",
      payload: {
        searchTerm: ""
      }
    });
  };

  const onSubmitSearchButton = () => {
    const url = mainUrl + `&q=${word}`;
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
        dispatch({
          type: "deselectAllDomains"
        });
      })
      .catch((e) => console.log(e));
  };

  return (
    <Box display="flex" justifyContent="space-between">
      <SearchBox
        onChange={handleSearchTerm}
        reference={timeout}
        onSubmit={onSubmitSearchButton}
        value={searchTerm}
        onClearSearch={handleOnClear}
      />
      <Typography variant="h3">{selectedSearchTerm}</Typography>
    </Box>
  );
};

export default SearchBoxContainer;
