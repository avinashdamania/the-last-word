import React from 'react';
import Loader from 'react-loader-spinner';
import * as d3 from "d3";


import getConfig from './Config';
const config = getConfig();

const default_data = new Map();

class VisualizationsPage2 extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {data: default_data , isLoading:false};
        var end_point = config.api_url_base + "/all/countries";
        fetch(end_point).then(response => {
            console.log(response)
            return response.json();
        }).then(data => {
            console.log("asdfasdfasdf")
            console.log(data);
            // this.state =  {data: data, isLoading:false, page:0, rowsPerPage: 13};

            var actual_data = []
            var temp_map = new Map()
            for (var i = 0; i < data.length; i++) {
                var item = data[i]
                if (temp_map.has(item.income_level)) {
                    temp_map.set(item.income_level, temp_map.get(item.income_level) + 1)
                } else {
                    temp_map.set(item.income_level, 1)
                }
            }

            console.log("temp map")
            console.log(temp_map)

            // for (const [key, value] of temp_map.entries()) {
            //     var new_obj = {"label": key, "value": value}
            //     actual_data.push(new_obj)
            // }

            // console.log("AAAAAAAA")
            //     console.log(actual_data)
                



            this.setState (  {data: temp_map, isLoading:false});
            this.createChart();
        }).catch(err => {
            console.log(err);
        })


    }


    componentDidMount() {
        console.log("mounted")
        this.createChart();
    }

    componentDidUpdate() {
        console.log("updated")
        this.createChart();
    }


    createChart() {
        let width = 625;
        let height = 600;
        let margin = 20;

  



        let radius = Math.min(width, height) / 2 - margin;

        let name = "#body"
        const svg = d3.select("#body1")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        
        let data = {"High income": this.state.data.get("High income"), "Low income": this.state.data.get("Low income"), "Lower middle income": this.state.data.get("Lower middle income"), "Upper middle income": this.state.data.get("Upper middle income")}

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
            .style("font-size", 18)

    }
    


    







    render() {
        console.log("rendering page 2")
        return (
            <span style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                {this.state.isLoading
                    ? (<div className="loader">
                        <Loader type="Grid" color="#212121" height={100} width={100} />
                      </div>)
                    : (
                    <div style={{backgroundColor: "white", margin: 20, padding: 20, borderRadius: 20}} >
                        <h2>A visualization for the income level of some countries in our dataset.</h2>
                        <svg id='body1' className={"viz"}
                         width={600} height={590}>
                        </svg>


    

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


export default VisualizationsPage2;
