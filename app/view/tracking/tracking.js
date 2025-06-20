app.controller("TrackingController", function ($scope, $timeout, ) {


  if (window.isMapInitialized) {
    return; // ถ้า map เคยสร้างแล้ว ให้ skip
  }
  window.isMapInitialized = true;

  $timeout(() => {
    const streetLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "&copy; OpenStreetMap contributors",
      }
    );

    const map = L.map("map", {
      center: [13.7563, 100.5018],
      zoom: 13,
      zoomControl: false,
      layers: [streetLayer],
      attributionControl: false,
    });

    const gpsLayer = L.layerGroup().addTo(map);

    function createGoogleIcon() {
      return L.icon({
        iconUrl:
          "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png",
        iconSize: [27, 43],
        iconAnchor: [13, 43],
        popupAnchor: [0, -40],
      });
    }

    map.locate({ setView: true, maxZoom: 16 });

    map.on("locationfound", function (e) {
      gpsLayer.clearLayers();

      L.marker(e.latlng, { icon: createGoogleIcon() }).addTo(gpsLayer);

      L.circle(e.latlng, e.accuracy / 2).addTo(gpsLayer);
    });

    map.on("locationerror", function () {
      alert("ไม่สามารถระบุตำแหน่งของคุณได้");
    });
  }, 100);
  
  $scope.isExpanded = false;

  $scope.toggleTrackingInfo = function () {
    $scope.isExpanded = !$scope.isExpanded;
  };
});
