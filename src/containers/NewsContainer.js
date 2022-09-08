import { NewsItem } from "../components/NewsItem";
import { LoadMore } from "../components/LoadMore";
import { Box } from "@mui/material";
import { useContext, useEffect } from "react";
import { StateContext } from "../context/StateProvider";
import { mainUrl } from "../consts";

export const NewsContainer = () => {
  const [
    { data, page, totalResults, searchTerm, domains, selectedDomains },
    dispatch
  ] = useContext(StateContext);

  console.log({
    data,
    page,
    totalResults,
    searchTerm,
    domains,
    selectedDomains
  });

  const handleLoadMore = () => {
    let url = mainUrl + `&page=${page + 1}`;

    if (searchTerm) {
      url = url + "&q=" + searchTerm;
    }

    if (selectedDomains.length > 0) {
      url = url + "&domains=" + selectedDomains;
    }

    const req = new Request(url);

    fetch(req)
      .then((response) => response.json())
      .then((responseData) => {
        dispatch({
          type: "addData",
          payload: {
            data: responseData.articles,
            totalResults: responseData.totalResults
          }
        });
        dispatch({ type: "loadMore" });
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    data.map((item) => {
      const urlObject = new URL(item.url);
      const domain = urlObject.hostname.replace("www.", "");
      dispatch({
        type: "addDomains",
        payload: {
          domain: domain
        }
      });
      if (window.localStorage.getItem("domains")) {
        window.localStorage.setItem(
          "domains",
          JSON.stringify(
            [
              ...JSON.parse(window.localStorage.getItem("domains")),
              domain
            ].filter((v, i, a) => a.indexOf(v) === i)
          )
        );
      } else {
        window.localStorage.setItem("domains", JSON.stringify([domain]));
      }
    });
  }, [data]);

  return (
    <Box textAlign="center">
      {data.map((news) => (
        <NewsItem {...news} />
      ))}
      {totalResults > page * 6 && <LoadMore onClick={handleLoadMore} />}
    </Box>
  );
};
