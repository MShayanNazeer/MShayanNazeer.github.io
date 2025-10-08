/**
 * Interactive world map that highlights visited countries, U.S. states and Canadian provinces.
 * 
 * This map uses Leaflet.js and authoritative GeoJSON data sources:
 * - World countries: Natural Earth Admin 0 boundaries
 * - U.S. states: Natural Earth Admin 1 boundaries  
 * - Canadian provinces: Statistics Canada cartographic boundaries
 */

// Define the lists of visited areas here
const visitedCountries = ['US', 'CA', 'FR', 'CH', 'JP', 'DE', 'IT', 'ES', 'GB', 'PK', 'TR', 'PT'];
const visitedUSStates = ['MA', 'CT', 'VT', 'NH', 'ME', 'NY', 'NJ', 'MD', 'DC', 'NC', 'PA', 'VA', 'WV', 'WA', 'OR', 'CA', 'IA', 'RI', 'DE'];
const visitedCanadianProvinces = ['ON', 'QC', 'BC', 'AB'];

// URLs to GeoJSON datasets
const worldCountriesUrl = 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json';
const usStatesUrl = 'https://raw.githubusercontent.com/datasets/geo-admin1-us/master/data/admin1-us.geojson';
// Using a more reliable Canadian provinces source
const canadaProvincesUrl = 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/canada-provinces.json';

let map;
let worldLayer, usStatesLayer, canadaLayer;

// Initialize the map when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
});

function initializeMap() {
    // Create the map and set default view centered on the world with better aspect ratio
    map = L.map('interactive-world-map').setView([0, 0], 1);

    // Add a base tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 1,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Set map bounds to ensure full world visibility
    map.setMaxBounds([[-90, -180], [90, 180]]);
    map.setMinZoom(1);

    // Load all map layers
    loadWorldCountries();
    loadUSStates();
    loadCanadianProvinces();
}

/**
 * Determine style for a country feature based on whether it has been visited.
 */
function countryStyle(feature) {
    const props = feature.properties || {};
    const iso2 = (props.iso_a2 || props.ISO_A2 || props.iso_a2_eh || '').trim();
    const iso3 = (props.iso_a3 || props.ISO_A3 || props.iso_a3_eh || '').trim();
    const countryName = props.name || props.NAME || props.country || '';
    
    // Check by ISO codes first
    let isVisited = visitedCountries.includes(iso2) || visitedCountries.includes(iso3);
    
    // Fallback: check by country name for common variations
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
        }
    }
    

    
    const style = {
        weight: 1,
        color: '#333333',
        fillColor: isVisited ? '#1e3a8a' : '#dddddd',
        fillOpacity: isVisited ? 0.8 : 0.3
    };
    return style;
}

/**
 * Determine style for a U.S. state feature based on whether it has been visited.
 */
function usStateStyle(feature) {
    const props = feature.properties || {};
    const stateAbbrev = (props.state_code || props.STUSPS || '').trim();
    const isVisited = visitedUSStates.includes(stateAbbrev);
    
    return {
        weight: 1,
        color: '#444444',
        fillColor: isVisited ? '#FF4136' : '#ffffff',
        fillOpacity: isVisited ? 0.7 : 0.2
    };
}

/**
 * Determine style for a Canadian province feature based on whether it has been visited.
 */
function canadaProvinceStyle(feature) {
    const props = feature.properties || {};
    const abbrev = (props.PREABBR || props.prname || props.preabbr || props.PRUID || '').trim();
    const isVisited = visitedCanadianProvinces.includes(abbrev);
    
    return {
        weight: 1,
        color: '#555555',
        fillColor: isVisited ? '#2ECC40' : '#ffffff',
        fillOpacity: isVisited ? 0.7 : 0.2
    };
}

/**
 * Generic function to add interactivity to each feature: show name on hover and click.
 */
function onEachFeature(feature, layer) {
    const props = feature.properties || {};
    const name = props.name || props.NAME || props.PRENAME || props.prname || 'Unknown';
    
    // Create simple popup content showing just the name
    const popupContent = `<div class="map-popup"><h4>${name}</h4></div>`;
    
    layer.bindPopup(popupContent);
    
    // Store the original style by getting it from the actual rendered layer
    // This ensures we have the exact style that Leaflet applied
    const originalStyle = {
        weight: layer.options.weight || 1,
        color: layer.options.color || '#333333',
        fillColor: layer.options.fillColor || '#dddddd',
        fillOpacity: layer.options.fillOpacity || 0.3
    };
    

    
    layer.on({
        mouseover: function(e) {
            // Highlight on hover with thicker border and enhanced appearance
            // Create hover style that preserves the original fill properties
            const hoverStyle = {
                weight: 3,
                color: '#000000',
                fillColor: originalStyle.fillColor,
                fillOpacity: originalStyle.fillOpacity
            };
            
            e.target.setStyle(hoverStyle);
        },
        mouseout: function(e) {
            // Restore the original style completely
            e.target.setStyle(originalStyle);
        }
    });
}

/**
 * Get the appropriate style for a feature based on its type
 */
function getFeatureStyle(feature) {
    const props = feature.properties || {};
    
    // Check for country
    const iso2 = (props.iso_a2 || props.ISO_A2 || props.iso_a2_eh || '').trim();
    const iso3 = (props.iso_a3 || props.ISO_A3 || props.iso_a3_eh || '').trim();
    if (visitedCountries.includes(iso2) || visitedCountries.includes(iso3)) {
        return countryStyle(feature);
    }
    
    // Check for US state
    const stateAbbrev = (props.state_code || props.STUSPS || '').trim();
    if (visitedUSStates.includes(stateAbbrev)) {
        return usStateStyle(feature);
    }
    
    // Check for Canadian province
    const abbrev = (props.PREABBR || props.prname || props.preabbr || props.PRUID || '').trim();
    if (visitedCanadianProvinces.includes(abbrev)) {
        return canadaProvinceStyle(feature);
    }
    
    // Default style for unvisited areas
    return {
        weight: 1,
        color: '#333333',
        fillColor: '#dddddd',
        fillOpacity: 0.3
    };
}


/**
 * Load and render the world countries layer
 */
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

/**
 * Load and render the U.S. states layer
 */
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

/**
 * Load and render the Canadian provinces layer
 */
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
            // Fallback: try alternative source
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



/**
 * Public function to add new visited countries (for console use)
 */
window.addVisitedCountry = function(countryCode, countryName) {
    if (!visitedCountries.includes(countryCode)) {
        visitedCountries.push(countryCode);
        
        // Refresh the map if it exists
        if (worldLayer) {
            worldLayer.setStyle(countryStyle);
        }
    }
};

/**
 * Public function to add new visited US states (for console use)
 */
window.addVisitedUSState = function(stateCode, stateName) {
    if (!visitedUSStates.includes(stateCode)) {
        visitedUSStates.push(stateCode);
        
        // Refresh the map if it exists
        if (usStatesLayer) {
            usStatesLayer.setStyle(usStateStyle);
        }
    }
};

/**
 * Public function to add new visited Canadian provinces (for console use)
 */
window.addVisitedCanadianProvince = function(provinceCode, provinceName) {
    if (!visitedCanadianProvinces.includes(provinceCode)) {
        visitedCanadianProvinces.push(provinceCode);
        
        // Refresh the map if it exists
        if (canadaLayer) {
            canadaLayer.setStyle(canadaProvinceStyle);
        }
    }
};
