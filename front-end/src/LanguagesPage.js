import React from 'react';
import {makeStyles} from '@material-ui/core/';
import Loader from 'react-loader-spinner';
import LanguageCard from './Components/LanguageCard'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MaterialTable from "material-table";
import getConfig from './Config';

const config = getConfig();

const classes = {
    root: {
  },
  paper: {
    margin:5,
    overflowX: 'auto',
  },
  table: {
      margin: 10,
  },
  table_header: {
      backgroundColor: '#03A9F4',
      fontSize: 20,
      border: `1px solid #CDDC39`,
      color: 'white'
  }
}

function truncate(input, max) {
   if (input && input.length > max)
      return input.substring(0,max) + '...';
   else
      return input;
};

const default_data = [{
    "ID": 1022,
    "Name in English": "South Italian",
    "Name in French": "italien du sud",
    "Name in Spanish": "napolitano-calabrés",
    "Countries": "Italy",
    "Country codes alpha 3": "ITA",
    "ISO639-3 codes": "nap",
    "Degree of endangerment": "Vulnerable",
    "Alternate names": "Neapolitan; Neapolitan-Calabrese; неаполитанский; неаполитанско-калабрийский",
    "Name in the language": "",
    "Number of speakers": 7500000,
    "Sources": "",
    "Latitude": 40.9798,
    "Longitude": 15.249,
}];

class LanguagesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state =  {data: default_data , isLoading:true, page:0, rowsPerPage: 13};

        var end_point = config.api_url_base + "/all/languages";
        fetch(end_point).then(response => {
            console.log(response)
            return response.json();
        }).then(data => {
            console.log(data);
            // this.state =  {data: data, isLoading:false, page:0, rowsPerPage: 13};
            this.setState (  {data: data, isLoading:false, page:0, rowsPerPage: 13});
        }).catch(err => {
            console.log(err);
        })


        this.handleChangePage = this.handleChangePage.bind(this);
        this.countEmpty = this.countEmpty.bind(this);
    }

 

     handleChangePage(event, newPage){
        this.setState({page:newPage});
     }

     countEmpty(){
         return this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.data.length - this.state.page * this.state.rowsPerPage);
     }
     handleRowClick(event, rowData){
         let id = rowData["id"];
         window.location="/LanguageDetail/" + id;
     }

    render() {
        console.log("isloading: " + this.state.isLoading)
        return (
          <div style={{margin: 50}}>
                (<Paper className={classes.paper} style ={{opacity: "0.9"}}>
                  <MaterialTable
                    title="Languages"
                    onRowClick={this.handleRowClick}
                    pageSize={10}
                    columns={[
                      { title: "Name", field: "name" , filtering: false, headerStyle: classes.table_header, cellStyle:{width:'20%'}},
                      { title: "ISO 639 Code(s)", field: "iso", cellStyle:{width:'35%'}, headerStyle: classes.table_header
                      },
                      { title: "Countries", field: "countries", cellStyle:{width:'25%'}, headerStyle: classes.table_header,
                        render: row => <p>{truncate(row.countries, 60)}</p> },
                      { title: "Status", field: "severity", cellStyle:{width:'10%'}, headerStyle: classes.table_header,
                        lookup: { 'Vulnerable':'Vulnerable','Definitely endangered':'Definitely endangered','Severely endangered':'Severely endangered','Critically endangered':'Critically endangered','Extinct':'Extinct'},
                      },
                      { title: "Population", field: "population",  type: 'numeric', cellStyle:{width:'10%'}, headerStyle: classes.table_header },
                    ]}
                    data={this.state.data}
                    options={{
                      sorting: true,
                      filtering: true,
                      pageSize: 7,
                      pageSizeOptions:[{}]
                    }}
                  />
                  </Paper>)
          </div>
        );
    }
}

export default LanguagesPage;
