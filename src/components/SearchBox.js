import { CloseSharp } from "@mui/icons-material";
import { TextField, InputAdornment, IconButton } from "@mui/material";

export const SearchBox = (props) => (
  <TextField
    {...props}
    type="search"
    variant="outlined"
    InputProps={{
      endAdornment: (
        <InputAdornment position="start">
          <IconButton>
            <CloseSharp />
          </IconButton>
        </InputAdornment>
      )
    }}
  />
);
