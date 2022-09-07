import { CloseSharp, SearchOutlined } from "@mui/icons-material";
import { TextField, InputAdornment, IconButton } from "@mui/material";

export const SearchBox = (props) => (
  <TextField
    {...props}
    type="text"
    variant="outlined"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <IconButton onClick={props.onClear}>
            <CloseSharp />
          </IconButton>
        </InputAdornment>
      ),
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={props.onSubmit}>
            <SearchOutlined />
          </IconButton>
        </InputAdornment>
      )
    }}
  />
);
