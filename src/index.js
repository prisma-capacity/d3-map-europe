import React from "react";
import ReactDOM from "react-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import "./styles.css";

const geoUrl =
  "https://raw.githubusercontent.com/prisma-capacity/d3-map-europe/master/data/europe.topo.json";

const App = () => (
  <div>
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
        }
      </Geographies>
    </ComposableMap>
  </div>
);

const rootElement = document.getElementById("app");
ReactDOM.render(<App />, rootElement);
