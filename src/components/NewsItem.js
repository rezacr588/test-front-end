import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Link,
  Typography
} from "@mui/material";

export const NewsItem = (props) => (
  <Link href={props.url} underline="none">
    <Card sx={{ margin: "1rem" }}>
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
  </Link>
);
