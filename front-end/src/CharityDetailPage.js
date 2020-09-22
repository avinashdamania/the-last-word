import React from 'react';
import {Card, Typography, Button, makeStyles} from '@material-ui/core/';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import MediaCard from './MediaCard'
import ReactPaginate from 'react-paginate';
import Loader from 'react-loader-spinner';

import getConfig from './Config';
const config = getConfig();

class CharityDetailPage extends React.Component {
    constructor(props) {
        super(props);
        let id = window.location.href.split('/')[4];

        var end_point = config.api_url_base + "/charities/"+id;
        fetch(end_point).then(response => {
            console.log(response)
            return response.json();
        }).then(data => {
            console.log(data);
            let charity = data.find(char => char["id"] == id);
            console.log(charity);
            // this.state =  {data: data, isLoading:false, page:0, rowsPerPage: 13};
            this.setState (  {data: charity, isLoading:false, page:0, rowsPerPage: 13});
        }).catch(err => {
            console.log(err);
        })
        this.state = {
            data: {},
            isLoading: false
        }
    }

    render() {
        return (
            <span>
                {this.state.isLoading
                    ? (<div className="loader">
                        <Loader type="Grid" color="#212121" height={100} width={100} />
                    </div>)
                    : (<div>
                        <CharityDetail charity={this.state.data}/>
                    </div>)
                }
            </span>
        );
    }
}

function CharityDetail(props){
    let charity = props.charity;
    let fields = Object.keys(charity);
    return (<div style={{margin:20, backgroundColor: "white", opacity: 0.9, borderRadius: 10, padding: 10}}>
        {fields.map((field, index) => (
            <h3>{field}: <span style={{fontSize: 15, fontWeight:'normal'}}>{charity[field]}</span></h3>
        ))}
    </div>);
}


export default CharityDetailPage;
