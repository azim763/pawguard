import React, { useEffect } from "react";
import mapSDK from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import styles from "./clinicLocationCard.module.css";
import Typography from "../Typography/Typography";
import AlertSVG from "../SVG/AlertSVG";
import ClockSVG from "../SVG/ClockSVG";
import LocationSVG from "../SVG/LocationSVG";
import Map from "../Map/Map";
import MarkerSVG from "../SVG/MarkerColored";
import ReactDOMServer from "react-dom/server";

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
    if (markerlong === undefined || markerlat === undefined) {
      // Handle the case where markerlong or markerlat is undefined
      return;
    }

    const map = mapSDK.map({
      key: "2TseK96GRlPI1NdG2lpm0nMvDK4fwDWv",
      container: "map-container",
      center: [longitude, latitude],
      zoom: 10,
    });

    const customMarker = document.createElement("div");
    customMarker.innerHTML = `
      <div style="width: 24px; height: 34px;">${ReactDOMServer.renderToString(
        <MarkerSVG width={24} height={34} fill="var(--salmon-pink)" />
      )}</div>
    `;

    new mapSDK.Marker({
      element: customMarker,
      anchor: "bottom",
      draggable: false,
    })
      .setLngLat([markerlong, markerlat])
      .addTo(map);

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
        <LocationSVG className={`${styles["locationIcon"]}`} />
        <Typography variant="body2-poppins-medium">{address}</Typography>
      </div>
      <div className={`${styles["hours-container"]}`}>
        <ClockSVG className={`${styles["clockIcon"]}`} />
        <Typography variant="body2-poppins-medium">{hours}</Typography>
      </div>
      <div className={`${styles["alert-container"]}`}>
        <AlertSVG className={`${styles["alertIcon"]}`} />
        <Typography variant="body2-poppins-medium">{urgentCare}</Typography>
      </div>
      {/* Include the Map component here */}
      <Map coordinates={[{ Longitude: markerlong, Latitude: markerlat }]} />
    </div>
  );
};

export default ClinicLocationCard;
