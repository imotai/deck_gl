// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

import React from 'react';
import {createRoot} from 'react-dom/client';
import {Map} from 'react-map-gl/maplibre';
import {DeckGL} from '@deck.gl/react';
import {ScatterplotLayer} from '@deck.gl/layers';

import type {Color, MapViewState} from '@deck.gl/core';
import type {Device, DeviceProps} from '@luma.gl/core';

const MALE_COLOR: Color = [0, 128, 255, 255];
const FEMALE_COLOR: Color = [255, 0, 128, 255];

// Source data CSV
const DATA_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/scatterplot/manhattan.json'; // eslint-disable-line

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: -74,
  latitude: 40.7,
  zoom: 11,
  maxZoom: 16,
  pitch: 0,
  bearing: 0
};

type DataPoint = [longitude: number, latitude: number, gender: number];

export default function App({
  device,
  deviceProps,
  data = DATA_URL,
  radius = 30,
  maleColor = MALE_COLOR,
  femaleColor = FEMALE_COLOR,
  mapStyle = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json'
}: {
  device?: Device;
  deviceProps?: DeviceProps;
  data?: string | DataPoint[];
  radius?: number;
  maleColor?: Color;
  femaleColor?: Color;
  mapStyle?: string;
}) {
  const layers = [
    new ScatterplotLayer<DataPoint>({
      id: 'scatter-plot',
      data,
      radiusScale: radius,
      radiusMinPixels: 0.25,
      getPosition: d => [d[0], d[1], 0],
      getFillColor: d => (d[2] === 1 ? maleColor : femaleColor),
      getRadius: 1,
      updateTriggers: {
        getFillColor: [maleColor, femaleColor]
      },
      pickable: true
    })
  ];

  return (
    <DeckGL
      device={device}
      deviceProps={deviceProps}
      layers={layers}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
    >
      <Map reuseMaps mapStyle={mapStyle} />
    </DeckGL>
  );
}

export function renderToDOM(container: HTMLDivElement, device?: Device, deviceProps?: DeviceProps) {
  createRoot(container).render(<App deviceProps={deviceProps} />);
}
