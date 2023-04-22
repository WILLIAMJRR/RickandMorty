import React from "react";
import "../styles/locationInfo.css";

const LocationInput = ({ location }) => {
  return (
    <section className="location">
      <h2 className="location_name">{location?.name}</h2>
      <ul className="location_list">
        <li className="location_item">
          <span className="location_label">Tipe:</span>
          {location?.type}
        </li>
        <li className="location_item">
          <span className="location_label">Dimension:</span>
          {location?.dimension}
        </li>
        <li className="location_item">
          <span className="location_label">population:</span>
          {location?.residents.length}
        </li>
      </ul>
    </section>
  );
};

export default LocationInput;
