import { SearchBox } from "./components/SearchBox";
import { NewsContainer } from "./containers/NewsContainer";
import { Container } from "@mui/material";
import { useEffect, useContext } from "react";
import { StateContext } from "./context/StateProvider";

export const Layout = () => {
  const [{ data }, dispatch] = useContext(StateContext);
  useEffect(() => {
    const url =
      "https://newsapi.org/v2/top-headlines?" +
      "country=us&" +
      "apiKey=855626963385476ca6f079a3bcdeb409";
    const req = new Request(url);
    fetch(req)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(data);
      });
  }, []);
  return (
    <Container>
      <SearchBox />
      <NewsContainer data={data} />
    </Container>
  );
};
