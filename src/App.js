import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Graph from "./Graph";
import Slider from "./slider";
function App() {
    const data1 = [[new Date("2020-05-05"), 40]];

    const data2 = [
        [new Date("2020-05-05"), 75],
        [new Date("2020-05-06"), 75],
    ];

    const data3 = [
        [new Date("2020-05-05"), 65],
        [new Date("2020-05-06"), 100],
    ];

    const data4 = [
        [new Date("2020-05-05"), 40],
        [new Date("2020-05-06"), 70],
        [new Date("2020-05-07"), 70],
        [new Date("2020-05-08"), 80],
        [new Date("2020-05-09"), 60],
        [new Date("2020-05-10"), 80],
        [new Date("2020-05-11"), 30],
    ];

    return (
        <div className="App">
            <div className="container">
                <Graph data={data1} />
                <Graph data={data2} />
                <Graph data={data3} />
                <Graph data={data4} />

                <br />
                <br />
                <br />
                <br />
                <Slider min={-10} max={10} step={5} value={0.5} />
            </div>
        </div>
    );
}

export default App;
