import { DeleteRounded } from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../context/StateProvider";
import useDispatch from "../context/useDispatch";

export const SideBarContainer = (props) => {
  const [state, setState] = useState([]);
  const [{ searchTerm }] = useContext(StateContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = window.localStorage.getItem(props.name);
    if (data) setState(JSON.parse(data));
  }, [searchTerm]);

  const handleOnFilter = (name) => {
    const url =
      "https://newsapi.org/v2/everything?" +
      "apiKey=855626963385476ca6f079a3bcdeb409&" +
      "pageSize=6&q=" +
      name;
    const req = new Request(url);
    fetch(req)
      .then((response) => response.json())
      .then((responseData) => {
        dispatch({
          type: "search",
          payload: {
            searchTerm: name
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

  const handleOnDeleteTopic = (name) => {
    window.localStorage.setItem(
      props.name,
      JSON.stringify(
        JSON.parse(window.localStorage.getItem(props.name)).filter(
          (item) => item !== name
        )
      )
    );
    setState(
      JSON.parse(window.localStorage.getItem(props.name)).filter(
        (item) => item !== name
      )
    );
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      subheader={<ListSubheader>{props.title}</ListSubheader>}
    >
      {state.map((text) => (
        <ListItem
          secondaryAction={
            <IconButton onClick={() => handleOnDeleteTopic(text)} edge="end">
              <DeleteRounded />
            </IconButton>
          }
        >
          <ListItemButton onClick={() => handleOnFilter(text)}>
            <ListItemText key={text} id={text} primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
