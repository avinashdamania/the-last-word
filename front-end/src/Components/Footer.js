import React, { Fragment } from 'react'
import {AppBar, Toolbar, Typography, Button, Icon, makeStyles, CssBaseline} from '@material-ui/core'
var style = {
    backgroundColor: "#B3E5FC",
    borderTop: "1px dotted #BDBDBD",
    textAlign: "center",
    padding: "20px",
    left: "0",
    bottom: "0",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%'
}

function Footer() {
    return (
        <div>
            <div style={phantom} />
            <div style={style}>
          <Typography
            variant="caption"
            color="inherit"
            style={{marginRight:5}}>
            © Copyright 2019
          </Typography>
          <Typography color="inherit" variant="caption">
            SWE Group 18
          </Typography>
            </div>
        </div>
    )
}

export default Footer
