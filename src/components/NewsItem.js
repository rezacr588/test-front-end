import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from "@mui/material";

export const NewsItem = (props) => (
  <Card>
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image={props.urlToImage}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);
