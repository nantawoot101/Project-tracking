// The locations array contains the set of text locations
// making up the polyline.
var locations = [];
// The latlngs array contains the set of LatLng objects.
var latlngs = new google.maps.MVCArray();
var levels = [];
// The markers array contains the actual Marker objects.
var markers = [];
var displayPath;

var selectedMarker = null;
var map;

// The tempMarker is a marker showing a candidate location.
var tempMarker = new google.maps.Marker();

var highlightIcon = {
  url: '/maps/documentation/utilities/images/marker_mm_20_yellow.png'
};

var tempIcon = {
  url: '/maps/documentation/utilities/images/marker_mm_20_green.png'
};

var locationIcon = {
  url: '/maps/documentation/utilities/images/marker_mm_20_blue.png'
};

// Create the Google Map to be used.
function initialize() {

  var chicago = {'lat': 41.850033, 'lng': -87.6500523};
  var mapOptions = {
      zoom: 12,
      center: chicago,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map_google'), mapOptions);

  tempMarker.setOptions({
    icon: tempIcon,
    draggable: true
  });

  google.maps.event.addListener(map, 'click', showTempMarker);

  displayPath = new google.maps.Polyline({
    map: map,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
    path: latlngs
  });
}

function showTempMarker(e) {

  tempMarker.setPosition(e.latLng);

  // Only show 5 decimal places
  document.getElementById('txtLatitude').value = e.latLng.lat().toFixed(5);
  document.getElementById('txtLongitude').value = e.latLng.lng().toFixed(5);

  google.maps.event.addListener(tempMarker, 'drag', function() {
    document.getElementById('txtLatitude').value =
        tempMarker.getPosition().lat();
    document.getElementById('txtLongitude').value =
        tempMarker.getPosition().lng();
  });

  tempMarker.setMap(map);
}

// Add a location to the location list.
function addLocationFromInput() {
  var lat = document.getElementById('txtLatitude').value;
  var pLat = parseFloat(lat);
  var lng = document.getElementById('txtLongitude').value;
  var pLong = parseFloat(lng);

  if (isNaN(lat) || isNaN(lng)) {
    alert('Latitudes and Longitudes can\'t be text.');
    return;
  }

  if (pLat < -90 || pLat > 90) {
    alert('Invalid latitude entered. Must be in range of -90 to 90');
    return;
  }

  if (pLong < -180 || pLong > 180) {
    alert('Invalid longitude entered. Must be in range of -180 to 180');
    return;
  }

  var level = document.getElementById('txtLevel').value;
  var pLevel = parseInt(level, 10);

  if (isNaN(level)) {
    alert('Level must be an integer number');
    return;
  }

  if (pLevel < 0 || pLevel > 3) {
    alert('Invalid minimum level entered. Must be in range of 0 to 3');
    return;
  }

  // Only show 5 decimal places
  addLocation(pLat.toFixed(5), pLong.toFixed(5), pLevel);
}

function addLocation(lat, lng, level) {
  var newLocation = new google.maps.LatLng(lat, lng);
  markers.push(createLocationMarker(newLocation));
  addLocationToList(lat, lng, level);
  latlngs.push(newLocation);
  levels.push(level);
  displayPath.setPath(latlngs);
  showEncoding();
}

function createLocationMarker(location) {
  if (tempMarker) {
    tempMarker.setMap(null);
  }

  var locationMarker = new google.maps.Marker();

  locationMarker.setOptions({
    icon: locationIcon,
    draggable: true,
    map: map,
    position: location
  });

  google.maps.event.addListener(locationMarker, 'click', function() {
    highlight(findMarkerIndex(locationMarker));
  });

  google.maps.event.addListener(locationMarker, 'drag', function() {
    var index = findMarkerIndex(locationMarker);

    if (index >= 0) {
      var nLatLng = locationMarker.getPosition();
      latlngs.setAt(index, nLatLng);

      var nLat = nLatLng.lat().toFixed(5);
      var nLng = nLatLng.lng().toFixed(5);

      var pLevel = locations[index].Level;

      var modifiedLocation = {
        Latitude: nLat,
        Longitude: nLng,
        Level: pLevel
      };

      displayPath.setPath(latlngs);
      locations[index] = modifiedLocation;
      document.getElementById('locations').options[index] =
          new Option('(' + nLat + ',' + nLng + ') Level: ' + pLevel, index);
      highlight(index);
      showEncoding();
    }
  });

  return locationMarker;
}

// Creates a location and adds it to the list.
function addLocationToList(lat, lng, pLevel) {

  // Add the location to the UI
  var displayLocation = new Option('(' + lat + ',' + lng + ') Level: ' + pLevel,
                                locations.length);
  document.getElementById('locations').options.add(displayLocation);

  // Create a text location for the array
  var newLocation = {
    Latitude: lat,
    Longitude: lng,
    Level: pLevel
  };

  locations.push(newLocation);
}

// Returns the index of the marker in the polyline.
function findMarkerIndex(locationMarker) {
  var index = -1;

  for (var i = 0; i < markers.length; ++i) {
    if (markers[i] == locationMarker) {
      index = i;
      break;
    }
  }

  return index;
}

// Highlights the location specified by index in both the map and the location
// list.
function highlight(index) {

  if (selectedMarker == null) {
    selectedMarker = markers[index];
  }
  if (selectedMarker != markers[index]) {
    selectedMarker.setIcon(locationIcon);
  }

  markers[index].setIcon(highlightIcon);
  selectedMarker = markers[index];

  // Mark which location is selected.
  if (index < locations.length) {
    locations.selected = index;
    document.getElementById('locations').options[index].selected = true;
  }
}

// Delete a location
function deleteLocation() {
  if (locations.length > 0) {
    var locationToRemove = document.getElementById('locations').selectedIndex;

    if (locationToRemove >= 0 && locationToRemove < locations.length) {
      locations.splice(locationToRemove, 1);

      if (selectedMarker == markers[locationToRemove]) {
        selectedMarker = null;
      }

      markers[locationToRemove].setMap(null);
      markers.splice(locationToRemove, 1);
      document.getElementById('locations').options[locationToRemove] = null;

      latlngs.removeAt(locationToRemove);
      levels.splice(locationToRemove, 1);
      displayPath.setPath(latlngs);
      showEncoding();
    }

    if (locations.length > 0) {
      if (locationToRemove == 0) {
        locationToRemove++;
      }
    }
  }
}

// Delete *all* the locations from the polyline.
function deleteAllLocations() {
  document.getElementById('locations').options.length = 0;
  locations = [];
  for (var i = 0; i < markers.length; ++i) {
    var markerToRemove = markers[i];
    markerToRemove.setMap(null);
  }
  markers = [];
  latlngs = new google.maps.MVCArray();
  levels = [];
  displayPath.setPath(latlngs);
  showEncoding();
}

function showEncoding() {
  var encodeString = google.maps.geometry.encoding.encodePath(latlngs);
  document.getElementById('encodedPolyline').value = encodeString;

  var encodeLevelsString = '';
  for (var i = 0; i < levels.length; i++) {
    encodeLevelsString += encodeNumber(levels[i]);
  }
  document.getElementById('encodedLevels').value = encodeLevelsString;
}

// Encode an unsigned number in the encode format.
function encodeNumber(num) {
  var encodeString = '';

  while (num >= 0x20) {
    encodeString += (String.fromCharCode((0x20 | (num & 0x1f)) + 63));
    num >>= 5;
  }

  encodeString += (String.fromCharCode(num + 63));
  return encodeString;
}

// Decode an encoded levels string into an array of levels.
function decodeLevels(encodedLevelsString) {
  var decodedLevels = [];

  for (var i = 0; i < encodedLevelsString.length; ++i) {
    var level = encodedLevelsString.charCodeAt(i) - 63;
    decodedLevels.push(level);
  }

  return decodedLevels;
}

// Decode the supplied encoded polyline and levels.
function decodePath() {
  var encodedPolyline = document.getElementById('encodedPolyline').value;
  var encodedLevels = document.getElementById('encodedLevels').value;

  if (encodedPolyline.length == 0) {
    return;
  }

  var decodedPath = google.maps.geometry.encoding.decodePath(encodedPolyline);
  var decodedLevels = decodeLevels(encodedLevels);

  if (decodedPath.length == 0) {
    return;
  }

  // If no levels are supplied, default to use level 3, the least restrictive.
  if (decodedLevels.length == 0) {
    for (var i = 0; i < decodedPath.length; i++) {
      decodedLevels[i] = 3;
    }
  }

  if (decodedPath.length != decodedLevels.length) {
    alert('Point count and level count do not match');
    return;
  }

  var replaceConfim = confirm('Are you sure you want to replace all the ' +
      'locations from this polyline?');

  if (!replaceConfim) {
    return;
  }

  deleteAllLocations();

  var mapBounds = new google.maps.LatLngBounds();
  for (i = 0; i < decodedPath.length; ++i) {
    addLocation(decodedPath[i].lat().toFixed(5),
                decodedPath[i].lng().toFixed(5),
                decodedLevels[i]);
    mapBounds.extend(decodedPath[i]);
  }
  showEncoding();

  map.fitBounds(mapBounds);
}

function centerMap() {
  var address = document.getElementById('txtAddress').value;

  if (address.length > 0) {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': address }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
      } else {
        alert('Address not found' + status.toString());
      }
    });
  }
}

// Move the map to the selected location in the location list.
function jumpToLocation() {
  var locationList = document.getElementById('locations');
  if (locationList.selectedIndex >= 0) {
    var location = locations[locationList.selectedIndex];
    map.setCenter(
        new google.maps.LatLng(location.Latitude, location.Longitude));
  }
}
google.maps.event.addDomListener(window, 'load', initialize);
