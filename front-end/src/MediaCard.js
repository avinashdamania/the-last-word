import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



export default function MediaCard(image, titleText, description, modelType, idNumber) {
  console.log(image + " " + titleText)
  return (
    <Card style={{width: 250, display: "inline-grid", margin: "1em"}}>
      <CardActionArea>
        <CardMedia
        style = {{ height: 150}}
        image={image}
          title="Card Image"
        />
        <CardContent style={{height: 200}}>
          <Typography gutterBottom variant="h5" component="h2">
            {titleText}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => {window.location="/" + modelType.toLowerCase() + "Detail/" + idNumber}}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
