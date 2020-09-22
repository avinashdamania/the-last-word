const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];


let language_list_page = 'https://www.ethnologue.com/browse/names';

for(let i = 0; i<letters.length; i++){
    setTimeout(function(){
        let letter_page = `https://www.ethnologue.com/browse/names/${letters[i]}`;
        request({
            method: 'GET',
            url: letter_page
        }, (err, res, body) => {
            let $ = cheerio.load(body);
            let names = [];
            $('.field-content>a').get().forEach(function(language){
                let language_meta = {
                    "language_abrev": $(language).attr('href').split("/language/")[1],
                    "language_name" : $(language).text()
                }
                console.log(language_meta);
                fs.appendFile("language_meta.json", JSON.stringify(language_meta), (err)=>{

                });

                // setTimeout(function(){
                //     request({
                //         method: 'GET',
                //         url: language_link
                //     },(err, res, body) => {
                //         let language_data = {
                //             "name":language_name
                //         };
                //         let $ = cheerio.load(body);
                //         $('.field-label').parent().get().forEach(function(row){
                //             let label = $(row).find('.field-label').text().trim();
                //             let item = $(row).find('.field-items').text().trim().replace(/ \[[\s\S]*?\]/g, '').replace(/(\r\n|\n|\r|\t)/gm, '').trim();
                //             language_data[label] = item;
                //         });
                //         let also_list = [];
                //         $('.fieldset-legend').get().forEach(function(element){
                //             also_list.push($(element).text());
                //         });
                //         if(language_data['Language Maps']){
                //             language_data['Language Maps'] = language_data['Language Maps'].split('  ').filter(x=>x!='');
                //         }
                //         language_data['Also Spoken'] = also_list;
                //         language_data['Language Cloud'] = `https://www.ethnologue.com/sites/default/files/styles/large/public/graphs/20/lang-${language_data['ISO 639-3']}.png`
                //         fs.appendFile("simple_lang_obj.json",JSON.Stringify(language_data), (err)=>{
                //
                //         });
                //     });
                // }, 500);

            });
        });
    }, 500)
}
