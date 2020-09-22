import React, { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AboutPage from './AboutPage'
import Paper from '@material-ui/core/Paper';
import SitewideSearch from './SitewideSearch.js'

import LanguageCard from './LanguagesPage.js'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 20,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    borderRadius: 20,
    color: theme.palette.text.secondary,
  },
  columns: {
      padding: 20,
  },
  img:{
      width: '70%',
      marginBottom: '20%'
  },
  highlight_text: {
      color: "#0288D1",
      fontWeight: 500
  }
}));

export default function Pricing() {
  const classes = useStyles();

  

  return (
    <Fragment>
    <div className={classes.root}>
        <Grid container className={classes.columns} spacing={5}>
        <Grid container item xs={12} spacing={2}>
            <Grid container item xs={5} className={classes.column} direction="column"
              alignItems="center"
              justify="center">
              <img centered className={classes.img} src={require ("./images/colorized_earth.png")}></img>
            </Grid>
            <Grid item xs={7} className={classes.column}>
              <Grid container borderRadius={16} elevation={0} className={classes.paper}
              alignItems="center"
              justify="center">
                    <Typography component="h1" variant="h2" style={{fontSize: 45, marginBottom: 10, fontWeight: "bold"}}align="center" color="textPrimary">
                        “To speak a <span className={classes.highlight_text}>language </span>
                        is to <br></br> take on a <span className={classes.highlight_text}>world</span>
                        , a <span className={classes.highlight_text}>culture.</span>”
                        <Typography component="h2" variant="h2" align="center" color="textSecondary" style={{ fontSize: 35    , marginBottom: 10, marginTop: 15, fontWeight: "bold"}}gutterBottom>
                            - Frantz Fanon
                        </Typography>
                    </Typography>
                    <Paper centered elevation={2} style={{ marginLeft:50,  width: '90%', marginBottom: 80}}className={classes.paper}>
                        <Typography component="p" variant="h2" align="center" color="textSecondary" style={{ fontSize: 28, padding:5}}gutterBottom>
                            Almost 40% of the languages in the world are classified as "threatened".
                        </Typography>
                        <Typography component="p" variant="h2" align="center" color="textSecondary" style={{ fontSize: 20, padding:5}}>
                        If these languages were to become extinct, we would be losing not only their functional use, but also the wealth of utility they hold in understanding the culture in
                        which they are used.
                        </Typography>
                    </Paper>
              </Grid>
            </Grid>
        </Grid>
        
        </Grid>
        <SitewideSearch></SitewideSearch>
    </div>

    </Fragment>
  );
}
