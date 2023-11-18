import React, { useEffect } from "react";
import mapSDK from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import styles from "./map.module.css";

const Map = ({ coordinates }) => {
  useEffect(() => {
    const map = mapSDK.map({
      key: "2TseK96GRlPI1NdG2lpm0nMvDK4fwDWv",
      container: "map-container",
      center: [coordinates[0].Longitude, coordinates[0].Latitude], // Set the center based on the first coordinate
      zoom: 10,
    });

    // Create and add markers for each coordinate
    coordinates.forEach((coord) => {
      new mapSDK.Marker({
        draggable: false,
      })
        .setLngLat([coord.Longitude, coord.Latitude])
        .addTo(map);
    });

    map.scrollZoom.enable();

    return () => {
      map.remove();
    };
  }, [coordinates]);

  return (
    <div id="map-container" className={`${styles["map-container"]}`}>
      {/* This is where the map will be rendered */}
    </div>
  );
};

export default Map;
