import React from 'react';
import Loader from 'react-loader-spinner';
import * as d3 from "d3";

import getConfig from './Config';
const config = getConfig();

const default_data = [{
    "num_diagnosed": 1022,
    "name": "South Italian",
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



class DeveloperVisualizationPage2 extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {data: default_data , isLoading:false};
        var end_point = "https://dontdieyoung.me/api/disease";
        
        fetch(end_point).then(response => {
            console.log(response)
            return response.json();
        }).then(data => {
            var organs_map = new Map()
            data.forEach(item => {
                // var temp = item.num_diagnosed 
                // temp = temp.replace(/\D/g,'');
                // item.num_diagnosed = temp
                // console.log(temp)
                
                var temp2 = item.organs
                var temp3 = temp2.split("/")
                temp3.forEach(temp => {
                    if (organs_map.has(temp)) {
                        organs_map.set(temp, organs_map.get(temp) + 1)
                    } else {
                        organs_map.set(temp, 1)
                    }

                })
                

            })


            var actual_data = []
            for (const [key, value] of organs_map.entries()) {
                console.log("hi")
                var new_obj = {"name": key, "num": value}
                console.log(new_obj)
                actual_data.push(new_obj)
                
            }


            console.log(actual_data)
            this.setState (  {data: actual_data, isLoading:false});
            this.createChart();
        }).catch(err => {
            console.log(err);
        })

    }



    createChart() {
        var data = this.state.data;
        let margin = ({top: 20, right: 40, bottom: 30, left: 80});
        let width = 1200;
        let height = 500;
        let x = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        let y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.num)]).nice()
            .range([height - margin.bottom, margin.top]);

        let xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x)
                .tickSizeOuter(0));

        let yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove());


        const svg = d3.select("#body3");
        svg.append("g")
            .attr("fill", "maroon")
            .selectAll("rect").data(data).enter().append("rect")
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.num))
            .attr("height", d => y(0) - y(d.num))
            .attr("width", x.bandwidth());
        svg.append("g")
            .call(xAxis);
        svg.append("g")
            .call(yAxis);

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
                        
                        <h2 style={{display: "flex", justifyContent: "center", alignItems: "center"}}>A visualization for the organs affected by various diseases from our developer's data.</h2>
                        <span>
                        <svg id='body3' className={"viz"}
                         width={1300} height={500}>
                        </svg>
                        </span>

                    


    

                      </div>
                      )
                }
            </span>
        );
    }
}


export default DeveloperVisualizationPage2;
