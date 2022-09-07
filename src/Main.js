import { NewsContainer } from "./containers/NewsContainer";
import { Container, Grid } from "@mui/material";
import SearchBoxContainer from "./containers/SearchBoxContainer";
import { SideBarContainer } from "./containers/SideBarContainer";

export const Main = () => {
  return (
    <Container>
      <SearchBoxContainer />
      <hr />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <SideBarContainer title="Topics" name="topics" />
          <hr />
          <SideBarContainer title="Domains" name="domains" />
        </Grid>
        <Grid item xs={8}>
          <NewsContainer />
        </Grid>
      </Grid>
    </Container>
  );
};
