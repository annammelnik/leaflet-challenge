
// this makes the background map, without having to use the API??


var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var map = L.map("map", {
center: [25,-50],
zoom: 2.5,
layers: [streetmap]
});

var baseMaps = {
"Street Map": streetmap
};

// adding in the earthquake information
L.control.layers(baseMaps)
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson"
d3.json(url).then(function(data) {
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: feature.properties.mag*4,
                fillOpacity: 0.55
            });
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(map);
    function radius(magnitude) {
        if (magnitude === 0) {
            return 1
        }
    }

    
//adding in the legend - does not work
         
    var legend = L.control({
        position: "bottomright"
    })
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var grades = [0, 1, 2, 3, 4, 5];
        var colors = [
          "#98ee00",
          "#d4ee00",
          "#eecc00",
          "#ee9c00",
          "#ea822c",
          "#ea2c2c"
        ];
        // Looping through
        for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
            "<i class='circle' style='background: " + colors[i] + "'></i> " +
            grades[i] + (grades[i + 1] ? "&ndash;" + color[i + 1] + "<br>" : "+");
        }
        return div;
      };
    
    legend.addTo(map);
    
})

//adding in the legend?
