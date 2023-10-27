import React, { useEffect } from "react";
import mapSDK from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import styles from "./map.module.css";

const Map = ({ latitude, longitude, markerlat, markerlong }) => {
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
    <div id="map-container" className={`${styles["map-container"]}`}>
      {/* This is where the map will be rendered */}
    </div>
  );
};

export default Map;
