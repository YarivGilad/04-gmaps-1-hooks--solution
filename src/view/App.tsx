import { MouseEvent, ChangeEvent, useState, useRef } from "react";
import { TopBar } from "./TopBar";
import { GoogleMap, LatLng } from "./GMaps";
// const log = (...args) => console.log.apply(null, ["App -->", ...args]);
const log = (...args: any[]) => console.log("App -->", ...args);

export const App = () => {
  // type is explicitly set
  const input = useRef<HTMLInputElement>(null);

  //type is explicitly set
  const [latlng, setLatlng] = useState<LatLng>({
    lat: -34.397,
    lng: 150.644,
  });

  //type is inferred
  const [zoom, setZoom] = useState(8);

  function reposition(event: MouseEvent) {
    const city = (event.target as HTMLElement).dataset.city;
    switch (city) {
      case "tel aviv":
        setLatlng({ lat: 32.0042938, lng: 34.7615399 });
        break;
      case "london":
        setLatlng({ lat: 51.528308, lng: -0.3817828 });
        break;
      case "paris":
        setLatlng({ lat: 48.8587741, lng: 2.2069754 });
        break;
      default:
        alert("wrong city");
    }
  }
  // const updateZoom = (event: ChangeEvent) => {
    // const z = (event.target as HTMLInputElement).value;
  const updateZoom = () => {
    const z = (input.current as HTMLInputElement).value;
    log({ z });
    setZoom(Number(z)); // parseInt(zoom); // +zoom;
  };

  return (
    <div className="app">
      <TopBar>
        <h1>Google Maps Example in React</h1>
      </TopBar>
      <div className="hbox mb20">
        <button data-city="tel aviv" onClick={reposition}>
          Tel Aviv
        </button>
        <button data-city="paris" onClick={reposition}>
          Paris
        </button>
        <button data-city="london" onClick={reposition}>
          London
        </button>
        <input
          ref={input}
          type="number"
          min="8"
          max="16"
          placeholder="8"
          onChange={updateZoom}
        />
      </div>
      <GoogleMap latlng={latlng} zoom={zoom} />
    </div>
  );
};
