import { DeleteRounded } from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { mainUrl } from "../consts";
import { StateContext } from "../context/StateProvider";
import useDispatch from "../hooks/useDispatch";

export const SideBarContainer = (props) => {
  const [state, setState] = useState([]);
  const [{ searchTerm, selectedDomains, domains }] = useContext(StateContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = window.localStorage.getItem(props.name);
    if (data) setState(JSON.parse(data));
  }, [searchTerm]);

  useEffect(() => {
    const data = window.localStorage.getItem(props.name);
    if (data) setState(JSON.parse(data));
  }, [domains]);

  const handleOnFilter = (name) => {
    let url = mainUrl;

    if (props.name === "topics") {
      if (selectedDomains) url = url + "&domains=" + [...selectedDomains];
      url = url + "&q=" + name;
    }

    if (props.name === "domains") {
      if (searchTerm) url = url + "&q=" + searchTerm;
      url = url + "&domains=" + [...selectedDomains, name];
    }

    const req = new Request(url);

    fetch(req)
      .then((response) => response.json())
      .then((responseData) => {
        if (props.name === "topics")
          dispatch({
            type: "search",
            payload: {
              searchTerm: name
            }
          });

        if (props.name === "domains")
          dispatch({
            type: "selectDomain",
            payload: {
              domain: name
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
    if (props.name === "domains") {
      let url = mainUrl;

      if (searchTerm) url = url + "&q=" + searchTerm;
      url =
        url +
        "&domains=" +
        [...selectedDomains.filter((item) => item !== name)];

      const req = new Request(url);

      fetch(req)
        .then((response) => response.json())
        .then((responseData) => {
          dispatch({
            type: "unselectDomain",
            payload: {
              domain: name
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
    }
  };

  const handleSelect = (name) => {
    if (selectedDomains.includes(name)) {
      let url = mainUrl;

      if (searchTerm) url = url + "&q=" + searchTerm;
      url =
        url +
        "&domains=" +
        [...selectedDomains.filter((item) => item !== name)];

      const req = new Request(url);

      fetch(req)
        .then((response) => response.json())
        .then((responseData) => {
          dispatch({
            type: "unselectDomain",
            payload: {
              domain: name
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
    } else {
      handleOnFilter(name);
    }
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
          {props.name === "topics" ? (
            <ListItemButton onClick={() => handleOnFilter(text)}>
              <ListItemText key={text} id={text} primary={text} />
            </ListItemButton>
          ) : (
            <ListItemButton onClick={() => handleSelect(text)}>
              <Checkbox
                checked={selectedDomains.includes(text)}
                inputProps={{ "aria-label": "controlled" }}
              />
              <ListItemText key={text} id={text} primary={text} />
            </ListItemButton>
          )}
        </ListItem>
      ))}
    </List>
  );
};
