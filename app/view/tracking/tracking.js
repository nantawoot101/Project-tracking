app.controller("TrackingController", function ($scope, $timeout, $http) {
  let map, gpsLayer, userMarker;

  $timeout(() => {
    // ตรวจสอบว่ามี map อยู่ก่อนแล้วไหม
    if (map && map._container) {
      map.remove();
      map = null;
    }

    const streetLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "&copy; OpenStreetMap contributors",
      }
    );


    map = L.map("map", {
      center: [13.7563, 100.5018],
      zoom: 13,
      zoomControl: false,
      layers: [streetLayer],
      attributionControl: false,
    });

    gpsLayer = L.layerGroup().addTo(map);

    function createGoogleIcon() {
      return L.icon({
        iconUrl:
          "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png",
        iconSize: [27, 43],
        iconAnchor: [13, 43], // จุดยึดไอคอนกับพิกัด (center bottom)
        popupAnchor: [0, -40],
      });
    }

    map.locate({ setView: true, maxZoom: 16 });

    map.on("locationfound", function (e) {
      gpsLayer.clearLayers();

      userMarker = L.marker(e.latlng, { icon: createGoogleIcon() }).addTo(
        gpsLayer
      );

      L.circle(e.latlng, e.accuracy / 2).addTo(gpsLayer);
    });

    map.on("locationerror", function () {
      alert("ไม่สามารถระบุตำแหน่งของคุณได้");
    });
  }, 100);

  $http
    .get("app/data/tracking.json")
    .then(function (response) {
      $scope.tracking = response.data.tracking;
      $scope.travelList = response.data.travel;
    })
    .catch(function (error) {
      console.error("เกิดข้อผิดพลาดในการโหลด JSON", error);
    });


 $scope.getBorderClass = function (station) {
    if (station === 'EXPRESS') return 'border-pink';
    if (station === 'BLINE') return 'border-orange';
    if (station === 'FLINE') return 'border-green';
    return '';
  };

$scope.isExpanded = false;

$scope.toggleTrackingInfo = function () {
  $scope.isExpanded = !$scope.isExpanded;
};



});
