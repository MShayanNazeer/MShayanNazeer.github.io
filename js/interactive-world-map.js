(() => {
  'use strict';

  const COLORS = {
    visited: { country: { fill: '#2563eb', border: '#1e40af' }, region: { fill: '#dc2626', border: '#991b1b' } },
    unvisited: { fill: '#e8ecf1', border: '#94a3b8' }
  };

  const GEOJSON = {
    world: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json',
    us: 'https://raw.githubusercontent.com/datasets/geo-admin1-us/master/data/admin1-us.geojson',
    canada: 'https://raw.githubusercontent.com/sachijay/canada_maps/master/exported_files/province_territory_simplified.geojson',
    canadaFallback: 'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/canada.geojson'
  };

  const visited = {
    countries: new Set(['US', 'CA', 'FR', 'CH', 'JP', 'DE', 'IT', 'ES', 'GB', 'PK', 'TR', 'PT']),
    countryNames: ['pakistan', 'turk', 'germany', 'deutschland', 'spain', 'españa', 'portugal', 'united kingdom', 'great britain', 'canada'],
    usStates: new Set(['MA', 'CT', 'VT', 'NH', 'ME', 'NY', 'NJ', 'MD', 'DC', 'NC', 'PA', 'VA', 'WV', 'WA', 'OR', 'CA', 'IA', 'RI', 'DE']),
    canadaProvinces: new Set(['ON', 'QC', 'BC', 'AB', 'Ont.', 'Ontario', 'Que.', 'Quebec', 'B.C.', 'British Columbia', 'Alta.', 'Alberta'])
  };

  const prop = (properties, keys) => {
    for (const key of keys) {
      const value = properties?.[key];
      if (value != null && value !== '') return String(value).trim();
    }
    return '';
  };

  const regionStyle = (isVisited, palette, unvisitedOpacity = 0.25) => ({
    weight: isVisited ? 1.5 : 1,
    color: isVisited ? palette.border : COLORS.unvisited.border,
    fillColor: isVisited ? palette.fill : COLORS.unvisited.fill,
    fillOpacity: isVisited ? 0.88 : unvisitedOpacity
  });

  const isVisitedCountry = (properties) => {
    const codes = [prop(properties, ['iso_a2', 'ISO_A2', 'iso_a2_eh']), prop(properties, ['iso_a3', 'ISO_A3', 'iso_a3_eh'])];
    if (codes.some((code) => visited.countries.has(code))) return true;
    const name = prop(properties, ['name', 'NAME', 'country']).toLowerCase();
    return visited.countryNames.some((term) => name.includes(term));
  };

  const isVisitedSubregion = (properties, codeKeys, visitedSet) =>
    visitedSet.has(prop(properties, codeKeys));

  const isVisitedCanada = (properties) =>
    ['PREABBR', 'preabbr', 'PRENAME', 'prname', 'name', 'NAME']
      .map((key) => properties?.[key])
      .filter(Boolean)
      .some((value) => visited.canadaProvinces.has(String(value).trim()));

  const styleHandlers = {
    country: (feature) => regionStyle(isVisitedCountry(feature.properties || {}), COLORS.visited.country),
    usState: (feature) => regionStyle(isVisitedSubregion(feature.properties || {}, ['state_code', 'STUSPS'], visited.usStates), COLORS.visited.region, 0.15),
    canadaProvince: (feature) => regionStyle(isVisitedCanada(feature.properties || {}), COLORS.visited.region, 0.15)
  };

  const bindHover = (feature, layer) => {
    const name = prop(feature.properties || {}, ['name', 'NAME', 'PRENAME', 'prname']) || 'Unknown';
    layer.bindPopup(`<div class="map-popup"><h4>${name}</h4></div>`);

    const baseStyle = {
      weight: layer.options.weight || 1,
      color: layer.options.color || COLORS.unvisited.border,
      fillColor: layer.options.fillColor || COLORS.unvisited.fill,
      fillOpacity: layer.options.fillOpacity || 0.3
    };

    const { country, region } = COLORS.visited;

    layer.on({
      mouseover: ({ target }) => {
        const fillColor = baseStyle.fillColor;
        const highlighted = fillColor === region.fill || fillColor === country.fill;
        target.setStyle({
          weight: 3,
          color: fillColor === region.fill ? region.border
            : fillColor === country.fill ? country.border
            : '#64748b',
          fillColor,
          fillOpacity: highlighted ? Math.min(baseStyle.fillOpacity + 0.08, 1) : baseStyle.fillOpacity
        });
      },
      mouseout: ({ target }) => target.setStyle(baseStyle)
    });
  };

  const loadGeoJSON = (map, url, style, fallbackUrl) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => L.geoJSON(data, { style, onEachFeature: bindHover }).addTo(map))
      .catch((error) => {
        console.error(`GeoJSON load failed: ${url}`, error);
        if (fallbackUrl) loadGeoJSON(map, fallbackUrl, style);
      });
  };

  document.addEventListener('DOMContentLoaded', () => {
    const mapEl = document.getElementById('interactive-world-map');
    if (!mapEl) return;

    const map = L.map(mapEl).setView([0, 0], 1);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 1,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    map.setMaxBounds([[-90, -180], [90, 180]]);
    map.setMinZoom(1);

    loadGeoJSON(map, GEOJSON.world, styleHandlers.country);
    loadGeoJSON(map, GEOJSON.us, styleHandlers.usState);
    loadGeoJSON(map, GEOJSON.canada, styleHandlers.canadaProvince, GEOJSON.canadaFallback);
  });
})();
