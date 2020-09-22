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

function truncate(input, max) {
   if (input.length > max)
      return input.substring(0,max) + '...';
   else
      return input;
};

const default_data = [{
    "Code": "USA",
    "Name": "United States",
    "Region": "North America",
    "Development": "High income",
    "Capital": "Washington D.C.",
    "Longitude": -77.032,
    "Latitude": 38.8895,
    "Languages": [259, 283, 788, 1454, 830, 855, 255, 796, 890, 797, 798, 857, 807, 868, 150, 854, 822, 1548, 783, 808, 825, 771, 781, 901, 958, 813, 852, 833, 831, 832, 853, 1549, 791, 866, 827, 828, 806, 838, 839, 799, 1534, 778, 794, 856, 850, 774, 782, 1537, 881, 849, 777, 779, 809, 810, 792, 811, 1535, 801, 789, 1463, 816, 814, 812, 834, 836, 835, 817, 865, 279, 1470, 802, 960, 152, 869, 793, 902, 844, 815, 820, 805, 829, 891, 764, 884, 269, 270, 887, 1465, 892, 893, 863, 819, 1459, 780, 826, 790, 775, 153, 161, 824, 860, 837, 848, 144, 894, 803, 776, 867, 1464, 821, 766, 845, 858, 886, 272, 1529, 1530, 1531, 159, 160, 162, 959, 1571, 862, 841, 1030, 843, 274, 770, 823, 864, 2367, 142, 145, 1452, 1547, 1458, 154, 1034, 842, 2385, 157, 882, 768, 876, 889, 1550, 898, 846, 787, 1466, 278, 1471, 141, 258, 1456, 769, 1527, 1528, 873, 859, 899, 1544, 1533, 2352, 1543, 772, 1472, 1032, 872, 897, 875, 2370, 1455, 1453, 1536, 482, 712, 1031, 786, 877, 1540, 1538, 1539, 840, 765, 1532, 861, 1468, 1469, 762, 1372, 1373, 1374, 1375, 1242, 874, 883, 878, 870, 900, 785, 879, 767, 1526, 880, 896, 1541, 1542, 903, 690, 691, 871, 1524, 885, 784, 256, 262, 888, 264, 1243, 2368, 2369, 795, 265, 280, 1473]
}];

class CountriesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state =  {data: default_data , isLoading:true, page:0, rowsPerPage: 13};

        var end_point = config.api_url_base + "/all/countries";
        fetch(end_point).then(response => {
            console.log(response)
            return response.json();
        }).then(data => {
            console.log(data);
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
         let codes = rowData["country_code"];
         window.location="/CountryDetail/" + codes;
     }

    render() {
        return (
          <div style={{margin: 50}}>
            (<Paper className={classes.paper} style={{opacity: "0.9"}}>
                  <MaterialTable
                    title="Countries"
                    onRowClick={this.handleRowClick}
                    pageSize={10}
                    columns={[
                      { title: "Code", field: "country_code", filtering: false, cellStyle:{width:'10%'}, headerStyle: classes.table_header },
                      { title: "Name", field: "name" , filtering: false, headerStyle: classes.table_header, cellStyle:{width:'20%'}},
                      { title: "Region", field: "region", cellStyle:{width:'35%'}, headerStyle: classes.table_header,
                      lookup: { 'North America':'North America','Sub-Saharan Africa':'Sub-Saharan Africa','South Asia':'South Asia','Middle East & North Africa':'Middle East & North Africa','Europe & Central Asia':'Europe & Central Asia','Latin America & Caribbean':'Latin America & Caribbean','East Asia & Pacific':'East Asia & Pacific'}
                      },
                      { title: "Development", field: "income_level", cellStyle:{width:'25%'}, headerStyle: classes.table_header,
                      lookup: { 'High income':'High income','Low income':'Low income','Lower middle income':'Lower middle income','Upper middle income':'Upper middle income'},
                      },
                      { title: "Capital", field: "capital", cellStyle:{width:'10%'}, headerStyle: classes.table_header},
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

export default CountriesPage;
