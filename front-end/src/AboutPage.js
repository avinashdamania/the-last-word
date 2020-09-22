import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import './AboutPageStyle.css'
import Link from '@material-ui/core/Link';
import getConfig from './Config';

const config = getConfig();

var { api_url_base } = config;

const useStyles = makeStyles({
  card: {
    width: 250,
    margin: 10,
    height: 600
  },
});

class AboutPage extends React.Component {
    constructor(props) {
        super(props);
        this.get_repo_stats();
        this.state = {stats:[], isLoading: true};
    }

    get_repo_stats(){
        let end_point = api_url_base+'/meta';
        console.log(end_point)
        fetch(end_point).then(response => {
            console.log(response)
            return response.json();
        }).then(data => {
            console.log(data);
            this.setState({stats: data, isLoading: false});
        }).catch(err => {
            console.log(err);
        })
    }


    render() {
        return (
            <div>
            <div>
            <Box textAlign="center" m={2}>
            <Link
              component="button"
              variant="title"
              style={{fontSize: 20}}
              onClick={() => {
                window.open("https://documenter.getpostman.com/view/4350123/SVtR1APQ?version=latest")
              }}>
              API Documentation
            </Link>
            </Box>

            </div>
                {this.state.isLoading ?
                <div className="loader">
                    <Loader
                    type="Grid"
                    color="#212121"
                    height={100}
                    width={100}
                    />
                </div>
                 :
                //  <div style={{margin: 40}} >
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                 {this.state.stats.map((contributor, index) => (
                    <ContributorCard key={index} contributor={contributor} />
                ))}
                </div>}

            </div>

            );
    }
}


function ContributorCard(props){
    let { avatar_url, commits, email, name, bio} = props.contributor;
    if (name.includes("Sonali")) {
        avatar_url = "https://i.ibb.co/5M0WkQV/Screen-Shot-2019-12-02-at-7-14-10-PM.png"
    }
    if (name.includes("Anu")) {
        avatar_url = "https://i.ibb.co/WsQF2yM/Screen-Shot-2019-12-02-at-7-23-43-PM.png"
    }
    const classes = useStyles();
    return (
        <Card className={classes.card} style={{display: "inline-grid"}}>
                <CardMedia
                  component="img"
                  alt="Avatar Image"
                  image={avatar_url}
                  title="Avatar Image"
                />
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="p" component="p" color="textSecondary">
                    {email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="h6">
                    Commits: {commits}
                  </Typography>
                  <Typography variant="p" color="textPrimary" component="p">
                    {bio}
                  </Typography>
                </CardContent>
            </Card>
    );
}

export default AboutPage;
