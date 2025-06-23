
app.controller("TravelController", function ($scope, $http) {
  $scope.getBorderClass = function (station) {
    if (station === 'EXPRESS') return 'border-pink';
    if (station === 'BLINE') return 'border-orange';
    if (station === 'FLINE') return 'border-green';
    return '';
  };

$scope.getBorderColorClass = function(station) {
  if (!station) return '';
  
  if (station === 'EXPRESS') return 'border-pink-2';
  if (station === 'BLINE') return 'border-orange-2';
  if (station === 'FLINE') return 'border-green-2';

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


     $scope.step = 1;
      $scope.tracking = [];
      $scope.travelList = [];


// ฟังก์ชันเปลี่ยน step และเก็บ item ที่ถูกเลือก (ถ้าต้องการ)
$scope.goToStep2 = function(trackingId, travelItem) {
    $scope.step = 2;
    const found = $scope.tracking.find(t => t.id === trackingId);
    $scope.selectedTracking = found || null;
    $scope.selectedTravelItem = travelItem;
  };
});
