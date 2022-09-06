import { NewsItem } from "../components/NewsItem";
import { LoadMore } from "../components/LoadMore";
import { Box } from "@mui/material";

export const NewsContainer = (props) => {
  return (
    <Box textAlign="center">
      {props.data.map((news) => (
        <NewsItem {...news} />
      ))}
      <LoadMore />
    </Box>
  );
};
