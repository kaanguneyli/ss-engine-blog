"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Globe from "react-globe.gl";
import colors from "tailwindcss/colors";

type arcsData = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
};

type region = {
  name: string;
  lat: number;
  lng: number;
};

const REGIONS: region[] = [
  {
    name: "oregon",
    lat: 44.1274576,
    lng: -122.8257181,
  },
  {
    name: "n_virginia",
    lat: 37.4784129,
    lng: -76.4618534,
  },
  {
    name: "sao_paulo",
    lat: -23.6820347,
    lng: -46.735724,
  },
  {
    name: "singapore",
    lat: 1.3143394,
    lng: 103.7038242,
  },
  {
    name: "frankfurt",
    lat: 50.1213009,
    lng: 8.5663531,
  },
];

function getRandomItem(list: any): region {
  return list[Math.floor(Math.random() * list.length)];
}

function getRandomArcData(): arcsData[] {
  return Array.from(Array(4).keys()).map(() => {
    const region = getRandomItem(REGIONS);

    return {
      startLat: region.lat,
      startLng: region.lng,
      endLat: (Math.random() - 0.5) * 180,
      endLng: (Math.random() - 0.5) * 360,
      color: "#00e9a3",
    };
  });
}

export default function AnimatedGlobe() {
  const [arcsData, setArcsData] = useState<arcsData[]>(getRandomArcData());
  const [countries, setCountries] = useState({ features: [] });

  const [globeMaterial, setGlobeMaterial] = useState(
    new THREE.MeshPhongMaterial()
  );

  // const [arcs, setArcs] = useState([] as arcsData[]);
  const globeRef = useRef() as any;

  useEffect(() => {
    fetch("/globe-data.json")
      .then((res) => res.json())
      .then(setCountries);

    globeRef.current.controls().rotate = false;
    globeRef.current.controls().enableZoom = false;
    globeRef.current.controls().autoRotate = true;
    globeRef.current.controls().autoRotateSpeed = 0.3;

    setGlobeMaterial(
      new THREE.MeshPhongMaterial({
        color: colors.zinc["950"],
        shininess: 10,
        transparent: true,
        opacity: 0.9,
      })
    );

    // setInterval(() => {
    setArcsData(getRandomArcData());
    // }, 3000);
  }, []);

  return (
    <Globe
      ref={globeRef}
      width={1880}
      height={1880}
      // animateIn={false}
      backgroundColor={"#00000000"}
      globeMaterial={globeMaterial}
      //
      // HEX POLYGONS
      hexPolygonsData={countries.features}
      hexPolygonResolution={3}
      hexPolygonMargin={0.7}
      hexPolygonColor={() => "#444"}
      //
      // ATMOSPHERE
      atmosphereColor={"#00e9a3"}
      atmosphereAltitude={0.08}
      //
      // ARCS
      arcsData={arcsData}
      arcColor="color"
      arcStroke={0.1}
      arcAltitudeAutoScale={0.3}
      arcDashLength={0.3}
      arcDashGap={2}
      arcDashInitialGap={1}
      arcDashAnimateTime={2000}
      arcsTransitionDuration={0}
    />
  );
}
