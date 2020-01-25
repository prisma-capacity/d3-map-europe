import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
  ZoomableGroup
} from "react-simple-maps";
import axios from "axios";

import "./styles.css";

const geoUrl =
  "https://raw.githubusercontent.com/prisma-capacity/d3-map-europe/master/data/europe.topo.json";

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

function tsos() {
  try {
    const response = axios.get("https://platform.prisma-capacity.eu/rest/tso", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
      }
    });
    let data = null;
    response.then(res => {
      data = res.data;
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

const EuropeanMap = ({ setTooltipContent }) => {
  return (
    <div>
      <ComposableMap
        data-tip=""
        width={400}
        height={300}
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-20.0, -55.0, 0],
          scale: 300
        }}
      >
        <ZoomableGroup zoom={1} center={[10.0, 50.0]}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#d6e4f0"
                  stroke="#1d1e6b"
                  onMouseEnter={() => {
                    const { admin, pop_est, iso_a2 } = geo.properties;
                    // console.log(iso_a2);
                    tsos();
                    setTooltipContent(`${admin} — ${rounded(pop_est)}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    hover: {
                      fill: "#ed3563"
                    },
                    pressed: {
                      fill: "#ed3563",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
        {/* <Annotation
          subject={[2.3522, 48.8566]}
          dx={-90}
          dy={-30}
          connectorProps={{
            stroke: "#FF5533",
            strokeWidth: 3,
            strokeLinecap: "round"
          }}
        >
          <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#F53">
            {"Paris"}
          </text>
        </Annotation> */}
      </ComposableMap>
    </div>
  );
};

export default memo(EuropeanMap);
