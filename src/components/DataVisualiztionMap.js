import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
// import { useMap } from "react-leaflet";
// import "node_modules/leaflet-geosearch/dist/geosearch.css";
// import "leaflet/dist/leaflet.css";
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
// import "leaflet-defaulticon-compatibility";
import { useSelector } from "react-redux";
// import NeshanMap from "react-neshan-map-leaflet";
import dynamic from "next/dynamic";

export default () => {
  const NeshanMap = dynamic(
    () => import("../../node_modules/react-neshan-map-leaflet/dist/NeshanMap.js"),
    {
      loading: () => <p>Map is loading...</p>,
      ssr: false,
    }
  );
  const userData = useSelector((state) => state.data.userData);
  const [position, setPosition] = useState([35.6892, 51.389]);
  const [geoJSONArray, setgeoJSONArray] = useState([]);

  useEffect(() => {
    let cloneState = [];
    for (let i = 0; i < userData?.myExpenses.length; i++) {
      cloneState.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [userData?.myExpenses[i].geo.lat, userData?.myExpenses[i].geo.lon],
        },
        properties: {
          name: `${userData?.myExpenses[i].address.Neighbourhood}`,
          amount: `${userData?.myExpenses[i].amount}`,
          color: `${userData?.myExpenses[i].tags[0].color}`,
        },
      });
    }
    setgeoJSONArray(cloneState);
  }, [userData]);
  console.log(geoJSONArray);

  return (
    <NeshanMap
      options={{
        key: "web.l2q7lPuAPWxOb8OKKJTmdQsHY4MsMBsuXDQkxAKE",
        maptype: "dreamy",
        poi: true,
        traffic: false,
        center: [35.699739, 51.338097],
        zoom: 11,
      }}
      onInit={(L, myMap) => {
        myMap.invalidateSize();
        // myMap.on("click", function (e) {
        //   marker.setLatLng(e.latlng);
        // });

        {
          geoJSONArray.map((geoJSON, i) => {
            return L.circle([geoJSON.geometry.coordinates[1], geoJSON.geometry.coordinates[0]], {
              color: `${geoJSON.properties.color}`,
              fillColor: `${geoJSON.properties.color}`,
              fillOpacity: 0.5,
              radius: 600,
            })
              .addTo(myMap)
              .bindPopup(`${geoJSON.properties.name}<br/>${geoJSON.properties.amount} Toman`);
          });
        }
      }}
    />
  );
};
