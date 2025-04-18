// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

import React, {Component} from 'react';
import {DeckGL} from '@deck.gl/react';
import {View} from '@deck.gl/core';
import maplibregl from 'maplibre-gl';

export default class DeckWithMapLibre extends Component {
  render() {
    const {views = []} = this.props;

    const maps = [];
    for (const view of views) {
      if (view.props.map || view.props.mapStyle) {
        maps.push(
          <View id={view.props.id} key={view.props.id}>
            <this.props.Map reuseMaps mapLib={maplibregl} mapStyle={view.props.mapStyle} />
          </View>
        );
      }
    }

    return (
      <DeckGL id="json-deck" {...this.props}>
        {maps}
      </DeckGL>
    );
  }
}
