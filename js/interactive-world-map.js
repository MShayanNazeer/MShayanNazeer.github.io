const visitedCountries = new Set(['US', 'CA', 'FR', 'CH', 'JP', 'DE', 'IT', 'ES', 'GB', 'UK', 'GBR', 'PK', 'TR', 'PT']);
const visitedUSStates = new Set(['MA', 'CT', 'VT', 'NH', 'ME', 'NY', 'NJ', 'MD', 'DC', 'NC', 'PA', 'VA', 'WV', 'WA', 'OR', 'CA', 'IA', 'RI', 'DE']);
const visitedCanadianProvinces = new Set([
    'ON', 'QC', 'BC', 'AB',
    'Ont.', 'Ontario', 'Que.', 'Quebec', 'B.C.', 'British Columbia', 'Alta.', 'Alberta'
]);

const visitedCountryNames = ['pakistan', 'pak', 'turkey', 'türkiye', 'germany', 'deutschland', 'spain', 'españa', 'portugal', 'united kingdom', 'great britain', 'canada'];

const BLUE = { fill: '#2563eb', border: '#1e40af' };
const RED = { fill: '#dc2626', border: '#991b1b' };
const UNVISITED = { fill: '#e8ecf1', border: '#94a3b8' };

const GEOJSON = {
    world: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json',
    us: 'https://raw.githubusercontent.com/datasets/geo-admin1-us/master/data/admin1-us.geojson',
    canada: 'https://raw.githubusercontent.com/sachijay/canada_maps/master/exported_files/province_territory_simplified.geojson',
    canadaFallback: 'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/canada.geojson'
};

let map;

document.addEventListener('DOMContentLoaded', () => {
    map = L.map('interactive-world-map').setView([0, 0], 1);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 1,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    map.setMaxBounds([[-90, -180], [90, 180]]);
    map.setMinZoom(1);

    loadGeoJSON(GEOJSON.world, countryStyle);
    loadGeoJSON(GEOJSON.us, usStateStyle);
    loadGeoJSON(GEOJSON.canada, canadaProvinceStyle, GEOJSON.canadaFallback);
});

function prop(props, keys) {
    for (const key of keys) {
        const value = props[key];
        if (value) return String(value).trim();
    }
    return '';
}

function regionStyle(visited, colors, unvisitedOpacity = 0.25) {
    return {
        weight: visited ? 1.5 : 1,
        color: visited ? colors.border : UNVISITED.border,
        fillColor: visited ? colors.fill : UNVISITED.fill,
        fillOpacity: visited ? 0.88 : unvisitedOpacity
    };
}

function countryStyle(feature) {
    const props = feature.properties || {};
    const codes = [
        prop(props, ['iso_a2', 'ISO_A2', 'iso_a2_eh']),
        prop(props, ['iso_a3', 'ISO_A3', 'iso_a3_eh'])
    ];
    const name = prop(props, ['name', 'NAME', 'country']).toLowerCase();
    const visited = codes.some(code => visitedCountries.has(code)) ||
        visitedCountryNames.some(term => name.includes(term));
    return regionStyle(visited, BLUE);
}

function usStateStyle(feature) {
    const props = feature.properties || {};
    return regionStyle(visitedUSStates.has(prop(props, ['state_code', 'STUSPS'])), RED, 0.15);
}

function canadaProvinceStyle(feature) {
    const props = feature.properties || {};
    const values = ['PREABBR', 'preabbr', 'PRENAME', 'prname', 'name', 'NAME']
        .map(key => props[key])
        .filter(Boolean)
        .map(value => String(value).trim());
    const visited = values.some(value => visitedCanadianProvinces.has(value));
    return regionStyle(visited, RED, 0.15);
}

function onEachFeature(feature, layer) {
    const name = prop(feature.properties || {}, ['name', 'NAME', 'PRENAME', 'prname']) || 'Unknown';
    layer.bindPopup(`<div class="map-popup"><h4>${name}</h4></div>`);

    const originalStyle = {
        weight: layer.options.weight || 1,
        color: layer.options.color || UNVISITED.border,
        fillColor: layer.options.fillColor || UNVISITED.fill,
        fillOpacity: layer.options.fillOpacity || 0.3
    };

    layer.on({
        mouseover: (e) => {
            const fill = originalStyle.fillColor;
            const visited = fill === RED.fill || fill === BLUE.fill;
            e.target.setStyle({
                weight: 3,
                color: fill === RED.fill ? RED.border : fill === BLUE.fill ? BLUE.border : '#64748b',
                fillColor: fill,
                fillOpacity: visited ? Math.min(originalStyle.fillOpacity + 0.08, 1) : originalStyle.fillOpacity
            });
        },
        mouseout: (e) => e.target.setStyle(originalStyle)
    });
}

function loadGeoJSON(url, style, fallbackUrl) {
    fetch(url)
        .then(response => response.json())
        .then(data => L.geoJSON(data, { style, onEachFeature }).addTo(map))
        .catch(error => {
            console.error(`GeoJSON load failed: ${url}`, error);
            if (fallbackUrl) loadGeoJSON(fallbackUrl, style);
        });
}
