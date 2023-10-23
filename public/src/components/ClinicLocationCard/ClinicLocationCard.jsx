import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import tt from "@tomtom-international/web-sdk-maps";
import styles from "./clinicLocationCard.module.css";
import Typography from "../Typography/Typography";
import AlertSVG from "../SVG/AlertSVG";
import ClockSVG from "../SVG/ClockSVG";
import LocationSVG from "../SVG/LocationSVG";

const ClinicLocationCard = ({
  address,
  hours,
  urgentCare,
  latitude,
  longitude,
  markerlat,
  markerlong,
}) => {
  useEffect(() => {
    const map = tt.map({
      key: "2TseK96GRlPI1NdG2lpm0nMvDK4fwDWv",
      container: "map-container",
      center: [longitude, latitude],
      zoom: 10,
    });

    const customMarkerElement = document.createElement("div");
    ReactDOM.render(
      <LocationSVG width="23" height="34" />,
      customMarkerElement
    );

    const marker = new tt.Marker({
      element: customMarkerElement,
      anchor: "center",
    })
      .setLngLat([markerlong, markerlat])
      .addTo(map);

    console.log(markerlong);

    return () => {
      map.remove();
    };
  }, [latitude, longitude, markerlat, markerlong]);

  return (
    <div className={`${styles["location-card-container"]}`}>
      <div className={`${styles["heading-container"]}`}>
        <Typography variant="sub-h1-poppins-semibold">Details</Typography>
      </div>
      <div className={`${styles["address-container"]}`}>
        <LocationSVG width="23" height="34" />
        {address}
      </div>
      <div className={`${styles["hours-container"]}`}>
        <ClockSVG width="26" height="27" />
        {hours}
      </div>
      <div className={`${styles["alert-container"]}`}>
        <AlertSVG width="30" height="30" />
        {urgentCare}
      </div>
      <div id="map-container" className={`${styles["map-container"]}`}>
        {/* This is where the map will be rendered */}
      </div>
    </div>
  );
};

export default ClinicLocationCard;
