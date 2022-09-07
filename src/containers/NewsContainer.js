import { NewsItem } from "../components/NewsItem";
import { LoadMore } from "../components/LoadMore";
import { Box } from "@mui/material";
import { useContext } from "react";
import { StateContext } from "../context/StateProvider";

export const NewsContainer = () => {
  const [{ data, page, totalResults, searchTerm }, dispatch] =
    useContext(StateContext);

  const handleLoadMore = () => {
    console.log(searchTerm);
    let url =
      "https://newsapi.org/v2/everything?" +
      "apiKey=855626963385476ca6f079a3bcdeb409&" +
      `pageSize=${(page + 1) * 6}`;
    if (searchTerm) {
      url = url + "&q=" + searchTerm;
    }

    const req = new Request(url);
    fetch(req)
      .then((response) => response.json())
      .then((responseData) => {
        dispatch({
          type: "setData",
          payload: {
            data: responseData.articles,
            totalResults: responseData.totalResults
          }
        });
        dispatch({ type: "loadMore" });
      })
      .catch((e) => console.log(e));
  };

  return (
    <Box textAlign="center">
      {data.map((news) => (
        <NewsItem {...news} />
      ))}
      {totalResults > page * 6 && <LoadMore onClick={handleLoadMore} />}
    </Box>
  );
};
