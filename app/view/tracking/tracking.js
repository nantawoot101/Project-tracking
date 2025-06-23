app.controller("TrackingController", function ($scope, $timeout) {
  
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

    $scope.map = map;

    const userLocationIcon = L.divIcon({
      className: "google-user-location-icon",
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15],
      html: '<div class="blue-dot-halo"></div>',
    });

    map.locate({ setView: true, maxZoom: 16 });

    map.on("locationfound", function (e) {
      gpsLayer.clearLayers();

      L.marker(e.latlng, { icon: userLocationIcon }).addTo(gpsLayer);

      L.circle(e.latlng, e.accuracy / 2).addTo(gpsLayer);
    });

    map.on("locationerror", function () {
      alert("ไม่สามารถระบุตำแหน่งของคุณได้");
    });


    // ฟังก์ชันเมื่อกดปุ่ม paper-plane



  }, 100);

  $scope.isExpanded = false;

  $scope.toggleTrackingInfo = function () {
    $scope.isExpanded = !$scope.isExpanded;
  };


    $scope.gotoMyLocation = function () {
    if ($scope.map) {
      $scope.map.locate({ setView: true, maxZoom: 16 });
    }
  };

  
});
