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

function fixLanguageId(country){
    let fixed_languages = [];
    let all_languages = require('./test_data/languages.json');
    country["Languages"].forEach(lang_id => {
        let language = all_languages.find(lang => lang["ID"] == lang_id);
        let name = language["Name in English"];
        let link = "/LanguageDetail/" + lang_id;
        fixed_languages.push({name:name, link:link});
    });
    country["Languages"] = fixed_languages;
}

class CountryDetailPage extends React.Component {
    constructor(props) {
        super(props);
        let code = window.location.href.split('/')[4];
        let all_countries = require('./test_data/countries.json');
        let country = all_countries.find(country => country["Code"] == code);
        fixLanguageId(country);
        this.state = {
            country: country,
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
                        <CountryDetail country={this.state.country}/>
                      </div>)
                }
            </span>
        );
    }
}

function CountryDetail(props){
    let country = props.country;
    let fields = ["Code", "Name", "Region", "Development", "Capital","Longitude", "Latitude"];
    return (<div style={{margin:20, backgroundColor: "white", opacity: 0.9, borderRadius: 10, padding: 10}}>
        {fields.map((field, index) => (
            <h3 key={index}>{field}: <span style={{fontSize: 15, fontWeight:'normal'}}>{country[field]}</span></h3>
          ))}

         {country['Languages'].map((lang, index) => (
            <a href={lang.link} style={{fontSize: 15}}>{lang.name} , </a>
        ))}
    </div>);
}


export default CountryDetailPage;
