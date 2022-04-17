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
      if (map) {
        map.invalidateSize();
      }
    }, [map]);

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
        maxMarkers: 0,
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
        setPosition([e.location.lng, e.location.lat]);
      });

      map.addControl(searchControl);

      return () => map.removeControl(searchControl);
    }, []);

    return null;
  };

  return (
    <MapContainer markerZoomAnimation={true} center={position} zoom={10} scrollWheelZoom={true}>
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaGF3amhvM2VpbiIsImEiOiJjbDIxZzA0bmMxNTU0M2ltdGwybXNjMG1tIn0.UqL8JacAnkRK7hHESGc1dg`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      <LeafletgeoSearch />
    </MapContainer>
  );
};
