import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
  const [position, setPosition] = useState([]);
  const [geoJSONArray, setgeoJSONArray] = useState([]);
  const activeUseMap = () => {
    return null;
  };
  activeUseMap();
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
    setPosition([35.6892, 51.389]);
  }, [userData]);

  return (
    <NeshanMap
      options={{
        key: "web.l2q7lPuAPWxOb8OKKJTmdQsHY4MsMBsuXDQkxAKE",
        maptype: "dreamy",
        poi: true,
        traffic: false,
        center: [position[0], position[1]],
        zoom: 11,
      }}
      style={{ width: "73vw", height: "100%" }}
      onInit={(L, myMap) => {
        myMap.invalidateSize();
        {
          geoJSONArray.map((geoJSON, i) => {
            return L.circle([geoJSON.geometry.coordinates[1], geoJSON.geometry.coordinates[0]], {
              color: `${geoJSON.properties.color}`,
              fillColor: `${geoJSON.properties.color}`,
              fillOpacity: 0.2,
              radius: 700,
            })
              .addTo(myMap)
              .bindPopup(`${geoJSON.properties.name}<br/>${geoJSON.properties.amount} Toman`);
          });
        }
      }}
    />
  );
};
