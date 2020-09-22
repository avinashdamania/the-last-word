import React from 'react';
import {Card, Typography, Button, makeStyles} from '@material-ui/core/';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';





export default function LanguageCard(props) {
    let {Data, Meta} = props.language;
    let {Image, Name } = Meta
    let image_url = Image["previewURL"]
    let index = props.index+1;
    console.log(index);
    return (
    <Card style={{width: 300, display: "inline-grid", margin: "1em"}}>
      <CardActionArea>
        <CardMedia
        style = {{ height: 200}}
        image={image_url}
          title="Card Image"
        />
        <CardContent style={{height: 300}}>
          <Typography variant="h5" component="h2">
            {Meta["Name"]}
          </Typography>
          <Typography gutterBottom variant="h6" color="secondary" component="p">
            <b>ISO:</b> {Data["ISO 639-3"]}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <b>Classification:</b> {Data["Classification"]}
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary" component="p">
            <b>Mainly Spoken:</b> {Data["Mainly Spoken"]}
          </Typography>
          <Typography gutterBottom variant="caption" color="textSecondary" component="p">
            <b>Location: </b>{Data["Location"]}
          </Typography>
          <Typography gutterBottom variant="caption" color="textSecondary" component="p">
            {Data["Language Use"]}
          </Typography>
          <Typography variant="caption" color="textSecondary" component="p">
            {Data["Writing"]}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => {window.location="/LanguageDetail/" + Data["ISO 639-3"]}}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
