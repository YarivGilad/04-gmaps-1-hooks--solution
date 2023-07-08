import { useRef, useEffect } from "react";
// import { useOncePostMount } from "../hooks/useOnce";
const log = (...args: any[]) => console.log("GoogleMap -->", ...args);

export interface LatLng {
  lat: number;
  lng: number;
}
interface Props {
  latlng: LatLng;
  zoom: number;
}

export function GoogleMap({ latlng, zoom }: Props) {
  const mapDiv = useRef<HTMLDivElement | null>(null);
  const theMap = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    log("lat/lng update --->");
    const { lat, lng } = latlng;
    if (theMap.current) {
      theMap.current.setCenter({ lat, lng });
    }
  }, [latlng]);

  useEffect(() => {
    log("zoom update --->");
    if (theMap.current) {
      theMap.current.setZoom(zoom);
    }
  }, [zoom]);

  // step 1
  //------------
  useEffect(() => {
    const { lat, lng } = latlng;
    theMap.current = new google.maps.Map(mapDiv.current as HTMLDivElement, {
      center: { lat, lng },
      zoom,
    });
  }, []);

  // step 2
  //------------
  // const loadDataOnlyOnce = useRef(() => {
  //   console.log("loadDataOnlyOnce");
  //   const { lat, lng } = latlng;
  //   theMap.current = new google.maps.Map(mapDiv.current as HTMLDivElement, {
  //     center: { lat, lng },
  //     zoom
  //   });
  // });

  // useEffect(() => {
  //   loadDataOnlyOnce.current();
  // }, []);

  // step 3
  //------------

  // useOncePostMount(() => {
  //   const { lat, lng } = latlng;
  //   theMap.current = new google.maps.Map(mapDiv.current as HTMLDivElement, {
  //     center: { lat, lng },
  //     zoom
  //   });
  // });

  return <div ref={mapDiv} className="map-box" />;
}


// Alternatively, you can simply disable the eslint rule:
// eslint-disable-next-line react-hooks/exhaustive-deps