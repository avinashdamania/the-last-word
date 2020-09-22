const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');



let country_page = 'https://www.ethnologue.com/browse/countries';

request({
    method: 'GET',
    url: country_page
}, (err, res, body) => {
    let $ = cheerio.load(body);
    let countries = []
    $('.field-content>a').get().forEach(function(country){
        let link = $(country).attr('href');
        if(link.includes('/country/')){
            let country_meta = {
                "country_abrev": link.split('/country/')[1],
                "country_name": $(country).text()
            }
            countries.push(country_meta);
        }
    });
    fs.appendFile("country_meta.json", JSON.stringify(countries), (err)=>{

    });
});
