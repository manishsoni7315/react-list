import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useParams } from "react-router-dom";
import GetAppIcon from "@material-ui/icons/GetApp";
import { saveAs } from "file-saver";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 345,
    maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    marginLeft: "10px",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  span: {
    marginLeft: "10px",
  },
  setContent: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function ShowData() {
  const classes = useStyles();
  const [cardInfo, setCardInfo] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    const url = `https://picsum.photos/v2/list`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        var cardData = data?.map((info) => {
          if (info.id == id) {
            setCardInfo(info);
          }
        });
      });
  };
  const downloadImage = (dow_url) => {
    saveAs("image_url", dow_url); // Put your image url here.
  };
  return (
    <div className="cardDiv">
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {cardInfo.author?.charAt(0)}
            </Avatar>
          }
          title={cardInfo.author}
        />
        <CardMedia
          className={classes.media}
          image="https://picsum.photos/200/300"
          title={cardInfo.author}
        />
        <CardContent className={classes.setContent}>
          <Typography variant="body2" color="textSecondary" component="p">
            <h4>About This Image</h4>
            <span>Width = {cardInfo.width}</span>
            <span className={classes.span}>height = {cardInfo.height}</span>
          </Typography>
          <Typography>
            <IconButton
              aria-label="share"
              onClick={() => downloadImage(cardInfo.download_url)}
            >
              <GetAppIcon />
            </IconButton>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
