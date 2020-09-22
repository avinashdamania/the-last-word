import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function DenseTable(props) {
  let {data} = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Paper className={classes.paper}>
            <Table className={classes.table} elevation={2} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Alternate Names</TableCell>
                  <TableCell align="left">Countries</TableCell>
                  <TableCell align="left">Degree of Endangerment</TableCell>
                  <TableCell align="left">Number of Speakers</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(row => (
                  <TableRow elevation={2} style={{marginTop:5}} key={row["Name in English"]}>
                    <TableCell component="th" scope="row">
                      {row["Name in English"]}
                    </TableCell>
                     <TableCell align="left">{row["Alternate names"]?row["Alternate names"]:"None" }</TableCell>
                    <TableCell align="left">{row["Countries"]}</TableCell>
                    <TableCell align="left">{row["Degree of endangerment"]}</TableCell>
                    <TableCell align="left">{row["Number of speakers"]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
      </Paper>
    </div>
  );
}
