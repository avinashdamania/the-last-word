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

class LanguageDetailPage extends React.Component {
    constructor(props) {
        super(props);
        let id = window.location.href.split('/')[4];
        let all_languages = require('./test_data/languages.json');
        let language = all_languages.find(lang => lang["ID"] == id);
        this.state = {
            language: language,
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
                        <LanguageDetail language={this.state.language}/>
                      </div>)
                }
            </span>
        );
    }
}

function LanguageDetail(props){
    let lang = props.language;
    let fields = Object.keys(lang);
    return (<div style={{margin:20, backgroundColor: "white", opacity: 0.9, borderRadius: 10, padding: 10}}>
        {fields.map((field, index) => (
            <h3>{field}: <span style={{fontSize: 15, fontWeight:'normal'}}>{lang[field]}</span></h3>
          ))}
    </div>);
}


export default LanguageDetailPage;
