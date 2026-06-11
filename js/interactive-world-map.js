const visitedCountries = ['US', 'CA', 'FR', 'CH', 'JP', 'DE', 'IT', 'ES', 'GB', 'UK', 'GBR', 'PK', 'TR', 'PT'];
const visitedUSStates = ['MA', 'CT', 'VT', 'NH', 'ME', 'NY', 'NJ', 'MD', 'DC', 'NC', 'PA', 'VA', 'WV', 'WA', 'OR', 'CA', 'IA', 'RI', 'DE'];
const visitedCanadianProvinces = ['ON', 'QC', 'BC', 'AB'];

const MAP_COLORS = {
    visitedBlue: '#2563eb',
    visitedBlueBorder: '#1e40af',
    visitedRed: '#dc2626',
    visitedRedBorder: '#991b1b',
    unvisitedFill: '#e8ecf1',
    unvisitedBorder: '#94a3b8'
};

const worldCountriesUrl = 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json';
const usStatesUrl = 'https://raw.githubusercontent.com/datasets/geo-admin1-us/master/data/admin1-us.geojson';
const canadaProvincesUrl = 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/canada-provinces.json';

let map;
let worldLayer, usStatesLayer, canadaLayer;

document.addEventListener('DOMContentLoaded', initializeMap);

function initializeMap() {
    map = L.map('interactive-world-map').setView([0, 0], 1);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 1,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    map.setMaxBounds([[-90, -180], [90, 180]]);
    map.setMinZoom(1);

    loadWorldCountries();
    loadUSStates();
    loadCanadianProvinces();
}

function countryStyle(feature) {
    const props = feature.properties || {};
    const iso2 = (props.iso_a2 || props.ISO_A2 || props.iso_a2_eh || '').trim();
    const iso3 = (props.iso_a3 || props.ISO_A3 || props.iso_a3_eh || '').trim();
    const countryName = props.name || props.NAME || props.country || '';

    let isVisited = visitedCountries.includes(iso2) || visitedCountries.includes(iso3);

    if (!isVisited && countryName) {
        const countryNameLower = countryName.toLowerCase();
        if (countryNameLower.includes('pakistan') || countryNameLower.includes('pak')) {
            isVisited = true;
        } else if (countryNameLower.includes('turkey') || countryNameLower.includes('türkiye')) {
            isVisited = true;
        } else if (countryNameLower.includes('germany') || countryNameLower.includes('deutschland')) {
            isVisited = true;
        } else if (countryNameLower.includes('spain') || countryNameLower.includes('españa')) {
            isVisited = true;
        } else if (countryNameLower.includes('portugal')) {
            isVisited = true;
        } else if (countryNameLower.includes('united kingdom') || countryNameLower.includes('great britain')) {
            isVisited = true;
        }
    }

    return {
        weight: isVisited ? 1.5 : 1,
        color: isVisited ? MAP_COLORS.visitedBlueBorder : MAP_COLORS.unvisitedBorder,
        fillColor: isVisited ? MAP_COLORS.visitedBlue : MAP_COLORS.unvisitedFill,
        fillOpacity: isVisited ? 0.88 : 0.25
    };
}

function usStateStyle(feature) {
    const props = feature.properties || {};
    const stateAbbrev = (props.state_code || props.STUSPS || '').trim();
    const isVisited = visitedUSStates.includes(stateAbbrev);

    return {
        weight: isVisited ? 1.5 : 1,
        color: isVisited ? MAP_COLORS.visitedRedBorder : MAP_COLORS.unvisitedBorder,
        fillColor: isVisited ? MAP_COLORS.visitedRed : MAP_COLORS.unvisitedFill,
        fillOpacity: isVisited ? 0.88 : 0.15
    };
}

function canadaProvinceStyle(feature) {
    const props = feature.properties || {};
    const abbrev = (props.PREABBR || props.prname || props.preabbr || props.PRUID || '').trim();
    const isVisited = visitedCanadianProvinces.includes(abbrev);

    return {
        weight: isVisited ? 1.5 : 1,
        color: isVisited ? MAP_COLORS.visitedRedBorder : MAP_COLORS.unvisitedBorder,
        fillColor: isVisited ? MAP_COLORS.visitedRed : MAP_COLORS.unvisitedFill,
        fillOpacity: isVisited ? 0.88 : 0.15
    };
}

function onEachFeature(feature, layer) {
    const props = feature.properties || {};
    const name = props.name || props.NAME || props.PRENAME || props.prname || 'Unknown';
    const popupContent = `<div class="map-popup"><h4>${name}</h4></div>`;

    layer.bindPopup(popupContent);

    const originalStyle = {
        weight: layer.options.weight || 1,
        color: layer.options.color || MAP_COLORS.unvisitedBorder,
        fillColor: layer.options.fillColor || MAP_COLORS.unvisitedFill,
        fillOpacity: layer.options.fillOpacity || 0.3
    };

    layer.on({
        mouseover: function(e) {
            const isRed = originalStyle.fillColor === MAP_COLORS.visitedRed;
            const isBlue = originalStyle.fillColor === MAP_COLORS.visitedBlue;
            e.target.setStyle({
                weight: 3,
                color: isRed ? MAP_COLORS.visitedRedBorder : isBlue ? MAP_COLORS.visitedBlueBorder : '#64748b',
                fillColor: originalStyle.fillColor,
                fillOpacity: isRed || isBlue ? Math.min(originalStyle.fillOpacity + 0.08, 1) : originalStyle.fillOpacity
            });
        },
        mouseout: function(e) {
            e.target.setStyle(originalStyle);
        }
    });
}

function loadWorldCountries() {
    fetch(worldCountriesUrl)
        .then(response => response.json())
        .then(worldData => {
            worldLayer = L.geoJSON(worldData, {
                style: countryStyle,
                onEachFeature: onEachFeature
            }).addTo(map);
        })
        .catch(error => {
            console.error('Error loading world countries GeoJSON:', error);
        });
}

function loadUSStates() {
    fetch(usStatesUrl)
        .then(response => response.json())
        .then(statesData => {
            usStatesLayer = L.geoJSON(statesData, {
                style: usStateStyle,
                onEachFeature: onEachFeature
            }).addTo(map);
        })
        .catch(error => {
            console.error('Error loading US states GeoJSON:', error);
        });
}

function loadCanadianProvinces() {
    fetch(canadaProvincesUrl)
        .then(response => response.json())
        .then(canadaData => {
            canadaLayer = L.geoJSON(canadaData, {
                style: canadaProvinceStyle,
                onEachFeature: onEachFeature
            }).addTo(map);
        })
        .catch(error => {
            console.error('Error loading Canada provinces GeoJSON:', error);
            fetch('https://raw.githubusercontent.com/datasets/geo-admin1-ca/master/data/admin1-ca.geojson')
                .then(response => response.json())
                .then(canadaData => {
                    canadaLayer = L.geoJSON(canadaData, {
                        style: canadaProvinceStyle,
                        onEachFeature: onEachFeature
                    }).addTo(map);
                })
                .catch(fallbackError => {
                    console.error('Fallback Canadian provinces source also failed:', fallbackError);
                });
        });
}
