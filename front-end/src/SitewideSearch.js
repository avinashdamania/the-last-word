import React from 'react';
import {makeStyles} from '@material-ui/core/';
import Loader from 'react-loader-spinner'

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


class SitewideSearch extends React.Component {
    constructor(props) {
        super(props);
        var languages;
        var countries;
        var fullData = [];
        this.state = {data: [
            {
              "ID": 1022,
              "Type": "country",
              "Name": "United States"
            }], isLoading:true, page:0, rowsPerPage: 13};


        var end_point = config.api_url_base + "/all/languages";
        fetch(end_point).then(response => {
            console.log(response)
            return response.json();
        }).then(data => {
            console.log(data);
            // this.state =  {data: data, isLoading:false, page:0, rowsPerPage: 13};
            let charity1 = {}
            charity1["Name"] = "Northwest Language Academy"
            charity1["Type"] = "Charity"
            charity1["Num"] = "1"
            fullData.push(charity1)
    
            let charity2 = {}
            charity2["Name"] = "Tacoma German Language School"
            charity2["Type"] = "Charity"
            charity2["Num"] = "2"
            fullData.push(charity2)
    
            let charity3 = {}
            charity3["Name"] = "The Language Bank"
            charity3["Type"] = "Charity"
            charity3["Num"] = "3"
            fullData.push(charity3)
    
            let charity4 = {}
            charity4["Name"] = "Texas Foreign Language Association"
            charity4["Type"] = "Charity"
            charity4["Num"] = "4"
            fullData.push(charity4)
    
            let charity5 = {}
            charity5["Name"] = "Nanbe Tewa Language Program"
            charity5["Type"] = "Charity"
            charity5["Num"] = "5"
            fullData.push(charity5)
    
            let charity6 = {}
            charity6["Name"] = "Mississippi Foreign Language Association"
            charity6["Type"] = "Charity"
            charity6["Num"] = "6"
            fullData.push(charity6)
    
            let charity7 = {}
            charity7["Name"] = "Michigan World Language Association"
            charity7["Type"] = "Charity"
            charity7["Num"] = "7"
            fullData.push(charity7)



            languages = data
            languages.forEach(function(language) {
                let newItem = {};
                newItem["Name"] = language["name"]
                newItem["Type"] = "Language"
                newItem["ID"] = language["id"]
                fullData.push(newItem)
            })
            this.setState( {data: fullData, isLoading:false, page:0, rowsPerPage: 13});
        }).catch(err => {
            console.log(err);
        })

        var end_point2 = config.api_url_base + "/all/countries";
        fetch(end_point2).then(response => {
            console.log(response)
            return response.json();
        }).then(data => {
            console.log(data);
            countries = data
            countries.forEach(function(country){
                let newItem = {};
                newItem["Name"] = country["name"]
                newItem["Type"] = "Country"
                newItem["Code"] = country["country_code"]
                fullData.push(newItem)
            })
            this.setState( {data: fullData, isLoading:false, page:0, rowsPerPage: 13});
            // this.setState (  {data: data, isLoading:false, page:0, rowsPerPage: 13});
        }).catch(err => {
            console.log(err);
        })

        

        

    
    

    // charities.forEach(function(charity){
    //     let newItem = {};
    //     newItem["Name"] = charity["name"]
    //     newItem["Type"] = "Charity"
    //     fullData.push(newItem)
    // })
    console.log('FULLDATAAAAA')
    console.log(fullData)

    

        
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
        if (rowData["Type"] == "Language") {
            let id = rowData["ID"];
            window.location="/LanguageDetail/" + id;
        } else if (rowData["Type"] == "Country") {
            let codes = rowData["Code"];
            window.location="/CountryDetail/" + codes;
        } else if (rowData["Type"] == "Charity") {
            let num = rowData["Num"];
            window.location="/CharityDetail/" + num;
        }
     }

    render() {
        console.log("in render: " + this.state.data)
        return (
          <div>
              
              
              <MaterialTable style={{opacity: 0.9}}
              title="Sitewide Search"
              onRowClick={this.handleRowClick}
                columns={[
                    {title: "Name", field: "Name"},
                    {title: "Model Type", field: "Type"}
                ]}
                data = {this.state.data}
                options={{
                    sorting: true,
                    filtering: true,
                    pageSize: 7
                  }}
            />
              
              
          </div>
        );
    }
}

export default SitewideSearch;
