import React from 'react';
import Loader from 'react-loader-spinner';
import * as d3 from "d3";

import getConfig from './Config';
const config = getConfig();

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

class DeveloperVisualizationPage1 extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {data: default_data , isLoading:false};
        var end_point = "https://dontdieyoung.me/api/food";
        fetch(end_point).then(response => {
            console.log(response)
            return response.json();
        }).then(data => {
            console.log(data);
            this.setState (  {data: data, isLoading:false});
            this.createChart();
        }).catch(err => {
            console.log(err);
        })
        // this.createChart();


    }



    createChart() {
        let width = 400;
        let height = 400;
        let margin = 40;
        let cur_id = 1;

        let item_1 = this.state.data.find(item => item.name == "Berry Nut Trail Mix")
        let item_2 = this.state.data.find(item => item.name == "Chicken")
        let item_3 = this.state.data.find(item => item.name == "Pizza")
        let food_items = [item_1, item_2, item_3]


        food_items.forEach((food_item) => {
            console.log(food_item.name)

        let radius = Math.min(width, height) / 2 - margin;

        let name = "#body"
        const svg = d3.select(name + cur_id)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        
        let data = {"vitamin_c": food_item.vitamin_c, "fiber": food_item.fiber, "protein": food_item.protein, "fat": food_item.fat,"sugar": food_item.sugar , "vitamin_a": food_item.vitamin_a, "cholesterol": food_item.cholesterol}

        let color = d3.scaleOrdinal()
            .domain(data)
            .range(d3.schemeSet3);

        let pie = d3.pie()
            .value(function (d) {
                return d.value;
            });
        let data_ready = pie(d3.entries(data));

        let arcGenerator = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        svg
            .selectAll('mySlices')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', arcGenerator)
            .attr('fill', function (d) {
                return (color(d.data.key))
            })
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", 0.7);

        svg
            .selectAll('mySlices')
            .data(data_ready)
            .enter()
            .append('text')
            .text(function (d) {
                return d.data.key
            })
            .attr("transform", function (d) {
                return "translate(" + ( arcGenerator.centroid(d) + 1) + ")";
            })
            .style("text-anchor", "middle")
            .style("font-size", 17)

            cur_id += 1

        })
    }

    


    







    render() {
        console.log("rendering dev page 1")
        return (
            <span style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                {this.state.isLoading
                    ? (<div className="loader">
                        <Loader type="Grid" color="#212121" height={100} width={100} />
                      </div>)
                    : (
                    <div style={{backgroundColor: "white", margin: 20, padding: 20, borderRadius: 20}} >
                        
                        <h2 style={{display: "flex", justifyContent: "center", alignItems: "center"}}>A visualization for the composition of some different foods from our developer's data.</h2>


                        
                        <span>
                            
                        <svg id='body1'className={"maindiv"}
                         width={450} height={450}>
                             <text x="200" y="30" font-size="1.5em" text-anchor="middle" font-weight="bold">Berry Nut Trail Mix</text>
                    </svg>

                    <svg id='body2' className={"maindiv"}
                         width={450} height={450}>
                             <text x="200" y="30" font-size="1.5em" text-anchor="middle" font-weight="bold">Chicken</text>
                    </svg>
                    <svg id='body3' className={"maindiv"}
                         width={450} height={450}>
                             <text x="200" y="30" font-size="1.5em" text-anchor="middle" font-weight="bold">Pizza</text>
                    </svg>
                        </span>

                    


    

                      </div>
                      )
                }
            </span>
        );
    }
}


export default DeveloperVisualizationPage1;
