// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).ready(function() {
    console.log("Let's get coding!");

    var map;

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 37.78, lng: -122.44 },
            zoom: 6
        });

    }

    initMap();

    // $('#map').append(map);


    // CODE IN HERE!
    function timeConverter(timestamp) {
        var a = new Date(timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = month + ' ' + date + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }

    var earthquakeData = []
    $.ajax({
        method: "GET",
        url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson",
        success: function(json) {
            var allQuakeInfo = json.features;
            allQuakeInfo.forEach(function(response) {
                var mag = response.properties.mag;
                var place = response.properties.place;
                var timestamp = response.properties.time;
                var coordinates = response.geometry.coordinates;
                var myLatLng = {lat: coordinates[1], lng: coordinates[0]};
                var finalTime = timeConverter(timestamp);
                $('#info').append(`<p> M - ${mag} - ${place} at ${finalTime}</p>`);

			    var marker = new google.maps.Marker({
			        position: myLatLng,
			        map: map
			    });

            })
        },
    })











}); //end of doc ready