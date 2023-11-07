import React, { useEffect } from "react";
import * as ReactDOM from "react-dom";
import mapSDK from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
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
    const map = mapSDK.map({
      key: "2TseK96GRlPI1NdG2lpm0nMvDK4fwDWv",
      container: "map-container",
      center: [longitude, latitude],
      zoom: 10,
    });

    //     var element = document.createElement("div")
    // element.id = "marker"
    // const customMarkerElement = document.createElement("div");
    // ReactDOM.render(<LocationSVG width="23" height="34" />, customMarkerElement);

    const marker = new mapSDK.Marker({
      draggable: false,
    })
      .setLngLat([markerlong, markerlat])
      .addTo(map);
    console.log(markerlong);
    map.scrollZoom.enable();

    return () => {
      map.remove();
    };
  }, [latitude, longitude, markerlat, markerlong]);

  return (
    <div className={`${styles["location-card-container"]}`}>
      <div className={`${styles["heading-container"]}`}>
        <Typography variant="sub-poppins-medium">Details</Typography>
      </div>
      <div className={`${styles["address-container"]}`}>
        <LocationSVG width="23" height="34" />
        <Typography variant="body2-poppins-medium">{address}</Typography>
      </div>
      <div className={`${styles["hours-container"]}`}>
        <ClockSVG width="26" height="27" />
        <Typography variant="body2-poppins-medium">{hours}</Typography>
      </div>
      <div className={`${styles["alert-container"]}`}>
        <AlertSVG width="30" height="30" />
        <Typography variant="body2-poppins-medium">{urgentCare}</Typography>
      </div>
      <div id="map-container" className={`${styles["map-container"]}`}>
        {/* This is where the map will be rendered */}
      </div>
    </div>
  );
};

export default ClinicLocationCard;
