import React from 'react';
import './Map.css';
import {
    Map as LeafletMap,
    Circle,
    Popup,
    TileLayer
} from 'react-leaflet';
import numeral from "numeral";

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 1200,
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 2000,
    },
};

function Map({ countries, casesType, center, zoom }) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom} scrollWheelZoom={false} >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {countries.map(country => {
                    return (
                        <Circle
                            center={[country.countryInfo.lat, country.countryInfo.long]}
                            color={casesTypeColors[casesType].hex}
                            fillColor={casesTypeColors[casesType].hex}
                            fillOpacity={0.4}
                            radius={
                                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
                            }
                        >
                            <Popup>
                                <div className="info-container">
                                    <div className="info-flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />
                                    <div className="info-name">{country.country}</div>
                                    <div className="info-confirmed" className>Cases: {numeral(country.cases).format("0,0")}</div>
                                    <div className="info-recovered" className>Recovered: {numeral(country.recovered).format("0,0")}</div>
                                    <div className="info-deaths" className>Deaths: {numeral(country.deaths).format("0,0")}</div>
                                </div>
                            </Popup>
                        </Circle>
                    )
                })}
            </LeafletMap>
        </div>
    )
}

export default Map;