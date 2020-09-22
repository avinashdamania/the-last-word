const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');


// let charity_data_base = 'https://www.charitynavigator.org/index.cfm?'
// let max = 920;
// let per_page = 20;
// var eins = [];
// for(let i = 0; i<max;i+=per_page){
//     let url = charity_data_base+ `FromRec=${i}&keyword_list=Language&bay=search.results`;
//     setTimeout(function(){
//         request({
//             method: 'GET',
//             url: url
//         }, (err, res, body) => {
//             let $ = cheerio.load(body);
//             $('tr.search-tr').get().forEach(function(row){
//                 let ein = parseInt($(row).data('ein'));
//                 eins.push(ein);
//                 fs.writeFile("eins.json", JSON.stringify(eins), (err)=>{
//
//                 });
//             });
//         });
//     }, 500)
// }
// console.log(eins);

var eins = require('./eins.json');

eins.forEach(ein => {
    let url = `https://www.charitynavigator.org/index.cfm?bay=search.profile&ein=${ein}`;
    setTimeout(function(){
            request({
                method: 'GET',
                url: url
            }, (err, res, body) => {
                let $ = cheerio.load(body);
                $('table>tr').get().forEach(function(row){
                    let ein = parseInt($(row).data('ein'));
                    eins.push(ein);
                    fs.writeFile("eins.json", JSON.stringify(eins), (err)=>{

                    });
                });
            });
        }, 500);
});
