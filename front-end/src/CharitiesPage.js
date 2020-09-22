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
    "activities": null,
    "address": "PO BOX 1156\\r        LANGLEY, WA 98260-1156",
    "affiliation": "Independent - the organization is an independent organization or an independent auxiliary .",
    "asset_amount": 23924,
    "classification": "Educational Organization",
    "deductibility": "Contributions are deductible",
    "ein": "90-0394162",
    "filing_requirement": "990  or 990EZ return",
    "form_990_revenue_amount": 95995,
    "foundation_status": "Organization which receives a substantial part of its support from a governmental unit or the general public 170",
    "id": 1,
    "income_amount": 98586,
    "name": "NORTHWEST LANGUAGE ACADEMY",
    "ntee_classification": "Humanities Organizations",
    "ntee_code": "A70",
    "ntee_type": "Arts, Culture and Humanities",
    "subsection": 501
}];

class CharitiesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state =  {data: default_data , isLoading:true, page:0, rowsPerPage: 13};

        var end_point = config.api_url_base + "/all/charities";
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
        window.location="/CharityDetail/" + id;
    }

    render() {
        console.log("isloading: " + this.state.isLoading)
        return (
            <div style={{margin: 50}}>
                (<Paper className={classes.paper} style={{opacity: "0.9"}}>
                <MaterialTable
                    title="Charities"
                    onRowClick={this.handleRowClick}
                    pageSize={10}
                    columns={[
                        { title: "Name", field: "name" , filtering: false, headerStyle: classes.table_header, cellStyle:{width:'20%'}},
                        { title: "Ein", field: "ein", cellStyle:{width:'35%'}, headerStyle: classes.table_header},
                        { title: "Classification", field: "classification", cellStyle:{width:'35%'}, headerStyle: classes.table_header},
                        { title: "Income Amount", field: "income_amount",  type: 'currency', cellStyle:{width:'10%'}, headerStyle: classes.table_header },
                        { title: "Assets Amount", field: "asset_amount",  type: 'currency', cellStyle:{width:'10%'}, headerStyle: classes.table_header },
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

export default CharitiesPage;
