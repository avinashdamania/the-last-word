import React from 'react';
import Loader from 'react-loader-spinner';
import * as d3 from "d3";
import BubbleChart from "@weknow/react-bubble-chart-d3";

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

class VisualizationsPage1 extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {data: default_data , vis_data: default_data, isLoading:true};

        var end_point = config.api_url_base + "/all/languages";
        fetch(end_point).then(response => {
            console.log(response)
            return response.json();
        }).then(data => {
            console.log(data);
            // this.state =  {data: data, isLoading:false, page:0, rowsPerPage: 13};

            var actual_data = []
            for (var i = 0; i < 20; i++) {
                var item = data[i]
                var new_obj = {"label": item.name, "value": item.population}
                actual_data.push(new_obj)
            }
            console.log("sdfasdfs")
                console.log(actual_data)
                



            this.setState (  {data: data, vis_data: actual_data, isLoading:false});
        }).catch(err => {
            console.log(err);
        })


    }


    componentDidMount() {
        this.createChart();
    }

    componentDidUpdate() {
        this.createChart();
    }


    createChart() {
        var data = this.state.data.slice(15,29);
        let margin = ({top: 20, right: 40, bottom: 30, left: 80});
        let width = 1200;
        let height = 500;
        let x = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        let y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.population)]).nice()
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
            .attr("fill", "lightgreen")
            .selectAll("rect").data(data).enter().append("rect")
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.population))
            .attr("height", d => y(0) - y(d.population))
            .attr("width", x.bandwidth());
        svg.append("g")
            .call(xAxis);
        svg.append("g")
            .call(yAxis);

    }
    


    







    render() {
        console.log("rendering page 1")
        return (
            <span style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                {this.state.isLoading
                    ? (<div className="loader">
                        <Loader type="Grid" color="#212121" height={100} width={100} />
                      </div>)
                    : (
                    <div style={{backgroundColor: "white", margin: 20, padding: 20, borderRadius: 20}} >
                        <h2 style={{display: "flex", justifyContent: "center", alignItems: "center"}}>A visualization for some of the more commonly spoken languages in our dataset.</h2>
                        <div >
                        {/* <svg id='body3' className={"viz"}
                         width={1300} height={500}>
                        </svg> */}



                        <BubbleChart
                width={1000}
                height={1000}
                padding={5}
                fontFamily="Arial"
                data = {this.state.vis_data} />

                    {/* [
                    { label: "Washington", value: 207, color: "#9fa8da"},
                    { label: "Alexandria", value: 17, color: "#7986cb"},
                    { label: "New York", value: 12, color: "#5c6bc0"},
                    { label: "Chicago", value: 8, color: "#3949ab"},
                    { label: "Silver Spring", value: 7, color: "#283593"},
                ] */}



                        </div>
                        

    

                      </div>
                      )
                }
            </span>
        );
    }
}

function LanguageDetail(props){
    let lang = props.language;
    let fields = Object.keys(lang);
    return (<div style={{margin:20}}>
        {fields.map((field, index) => (
            <h3>{field}: <span style={{fontSize: 15, fontWeight:'normal'}}>{lang[field]}</span></h3>
          ))}
    </div>);
}


export default VisualizationsPage1;
