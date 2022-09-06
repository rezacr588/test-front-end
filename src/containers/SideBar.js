import { List, ListItem, ListItemText, ListSubheader } from "@mui/material";

export const SideBar = (props) => (
  <List
    sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    subheader={<ListSubheader>{props.title}</ListSubheader>}
  >
    {props.data.map((text) => (
      <ListItem>
        <ListItemText key={text} id={text} primary={text} />
      </ListItem>
    ))}
  </List>
);
