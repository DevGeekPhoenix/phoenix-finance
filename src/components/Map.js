import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import { useMap } from "react-leaflet";
import "node_modules/leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";

export default ({ position, setPosition }) => {
  const LeafletgeoSearch = () => {
    const map = useMap();

    useEffect(() => {
      const provider = new OpenStreetMapProvider();

      const searchControl = new GeoSearchControl({
        style: "bar",
        notFoundMessage: "Sorry, that address could not be found.",
        provider,
        marker: {
          icon: new L.Icon.Default(),
          draggable: true,
        },
        popupFormat: ({ query, result }) => result.label,
        resultFormat: ({ result }) => result.label,
        maxMarkers: 1,
        retainZoomLevel: false,
        animateZoom: true,
        autoClose: false,
        searchLabel: "Enter address",
        keepResult: false,
        updateMap: true,
      }).addTo(map);
      map.on("geosearch/showlocation", (e) => {
        setPosition([e.location.x, e.location.y]);
      });

      map.on("geosearch/marker/dragend", (e) => {
        setPosition([e.location.lat, e.location.lng]);
      });

      map.addControl(searchControl);

      return () => map.removeControl(searchControl);
    }, []);

    return null;
  };

  return (
    <MapContainer center={position} zoom={10} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LeafletgeoSearch />
    </MapContainer>
  );
};
