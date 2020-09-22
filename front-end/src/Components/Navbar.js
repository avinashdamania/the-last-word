import React, { Fragment } from 'react'
import {AppBar, Toolbar, Typography, Button, Icon, makeStyles, CssBaseline, Menu, MenuItem, Link} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: 'theme.palette.common.white'
      },
      ul: {
        margin: 0,
        padding: 0,
      },
      li: {
        listStyle: 'none',
      },
    },
    appBar: {
      padding:5,
      paddingTop:10,
      backgroundColor: '#03A9F4',
      borderBottom: `1px solid #0288D1`,
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
      color: 'white'
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
    heroContent: {
      padding: theme.spacing(8, 0, 6),
    },
    toolbarButton: {
        fontSize: 17,
        color: 'white',
        '&:hover': {
            color: "#CDDC39",
        },
    },
    dropdownButton: {
        fontSize: 17,
        color: 'black',
        '&:hover': {
            color: "#CDDC39",
        },
    },
    toolbarIcon: {
        width: 50,
        height: 36,
    }
  }));



export default function Navbar() {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);


  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick2 = event => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

    return (
    <Fragment>
      <CssBaseline/>
      <AppBar position="static" color="default" elevation={3} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h3" color="inherit" noWrap className={classes.toolbarTitle}>
            <a href="/" style={{textDecoration: "none", color: "white"}}>
                The <span style={{color:"#CDDC39"}}>Last Word <Icon fontSize="large" elevation={10}>public</Icon></span>
            </a>
          </Typography>
          <Button id="languageInfo" className={classes.toolbarButton} color="inherit" href="/languageInfo">Languages</Button>
          <Button id="countryInfo" className={classes.toolbarButton} color="inherit" href="/countryInfo">Countries</Button>
          <Button id="charityInfo" className={classes.toolbarButton} color="inherit" href="/charityInfo">Charities</Button>

          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.toolbarButton} color="inherit">
            Visualizations
        </Button>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
                <div>
            <Button id="visualization1" className={classes.dropdownButton} color="inherit" href="/visualization1">Languages</Button>
            </div>
            <div>
          <Button id="visualization2" className={classes.dropdownButton} color="inherit" href="/visualization2">Countries</Button>
          </div>
          <div>
          <Button id="visualization3" className={classes.dropdownButton} color="inherit" href="/visualization3">Charities</Button>
          </div>
        </Menu>


        <Button aria-controls="simple-menu2" aria-haspopup="true" onClick={handleClick2} className={classes.toolbarButton} color="inherit">
            Dev. Visualizations
        </Button>
        <Menu
            id="simple-menu2"
            anchorEl={anchorEl2}
            keepMounted
            open={Boolean(anchorEl2)}
            onClose={handleClose2}>
                <div>
            <Button id="developervisualization1" className={classes.dropdownButton} color="inherit" href="/developervisualization1">Foods</Button>
            </div>
            <div>
          <Button id="developervisualization2" className={classes.dropdownButton} color="inherit" href="/developervisualization2">Diseases</Button>
          </div>
          <div>
          <Button id="developervisualization3" className={classes.dropdownButton} color="inherit" href="/developervisualization3">Workouts</Button>
          </div>
        </Menu>


          <Button id="about" className={classes.toolbarButton} color="inherit" href="/about">About</Button>
        </Toolbar>
      </AppBar>
  </Fragment>


    );
    };
