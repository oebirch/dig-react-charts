import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Graph from "./Graph";
import Slider from "./Slider";
function App() {
    const data1 = [[new Date("2020-05-05"), -40]];

    const data2 = [[new Date("2020-05-05"), 40]];

    const data3 = [
        [new Date("2020-05-05"), -75],
        [new Date("2020-05-06"), -75],
    ];

    const data4 = [
        [new Date("2020-05-05"), 75],
        [new Date("2020-05-06"), 90],
    ];

    const data5 = [
        [new Date("2020-05-05"), -65],
        [new Date("2020-05-06"), -100],
    ];

    const data6 = [
        [new Date("2020-05-05"), 69],
        [new Date("2020-05-06"), 80],
        [new Date("2020-05-07"), 75],
        [new Date("2020-05-08"), 70],
        [new Date("2020-05-09"), 90],
        [new Date("2020-05-10"), 95],
        [new Date("2020-05-11"), 80],
    ];

    const data7 = [
        [new Date("2020-05-05"), -40],
        [new Date("2020-05-06"), -70],
        [new Date("2020-05-07"), -70],
        [new Date("2020-05-08"), -80],
        [new Date("2020-05-09"), -60],
        [new Date("2020-05-10"), -80],
        [new Date("2020-05-11"), -30],
    ];

    return (
        <div className="App">
            <div className="container">
                <Graph data={data7} />
                <br />
                <Graph data={data6} />
                <br />
                <Graph data={data5} />
                <br />
                <Graph data={data1} />
                <br />
                <Graph data={data2} />
                <br />
                <Graph data={data3} />
                <br />
                <Graph data={data4} />
                <br />
                <br />
                <br />
                <Slider min={-10} max={10} step={5} value={5} />
                <br />
                <Slider min={-2} max={5} step={1} value={0.5} />
                <br />
                <Slider min={0} max={5} step={1} value={1.75} decimals={0} />
                <br />
            </div>
        </div>
    );
}

export default App;
