
app.controller("TravelController", function ($scope, $http) {
  $scope.getBorderClass = function (station) {
    if (station === 'EXPRESS') return 'border-pink';
    if (station === 'BLINE') return 'border-orange';
    if (station === 'FLINE') return 'border-green';
    return '';
  };

  $http.get("app/data/tracking.json")
    .then(function (response) {
      $scope.tracking = response.data.tracking;
      $scope.travelList = response.data.travel;
    })
    .catch(function (error) {
      console.error("เกิดข้อผิดพลาดในการโหลด JSON", error);
    });
});
