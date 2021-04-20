// Request user geolocation and callback with lat, lon
function getLocation(fun) {
    var is_safari = navigator.userAgent.toLowerCase().indexOf('safari/') > -1;
    if (navigator.geolocation && !is_safari) {
        navigator.geolocation.getCurrentPosition(function(loc) {
        fun(loc.coords.latitude, loc.coords.longitude);
        })
    }
    else {
        alert("Geolocation is not supported by this browser.");
        // location defaults to central Bristol
        fun(51.454514, -2.587910);
    }
}

// Load map with lat, lon query string
function loadMap(lat,lon) {
    location.href="map.html?lat="+lat+"&lon="+lon;
}