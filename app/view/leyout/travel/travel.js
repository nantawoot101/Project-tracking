app.controller("TravelController", function ($scope, $http) {
  $scope.getBorderClass = function (station) {
    if (station === 'EXPRESS') return 'border-pink';
    if (station === 'B LINE') return 'border-orange';
    if (station === 'F LINE') return 'border-green';
    return '';
  };

$scope.getBorderColorClass = function(station) {
  if (!station) return '';
  
  if (station === 'EXPRESS') return 'border-pink-2';
  if (station === 'B LINE') return 'border-orange-2';
  if (station === 'F LINE') return 'border-green-2';

  return '';
};


$scope.getStationColorClass = function (station) {
  if (station === 'EXPRESS') return 'bus-wrapper-pink';
  if (station === 'B LINE') return 'bus-wrapper-orange';
  if (station === 'F LINE') return 'bus-wrapper-green';
  return '';
};



  $http.get("app/data/tracking.json")
    .then(function (response) {
      $scope.tracking = response.data.tracking;
      $scope.travelList = response.data.travel;
      $scope.nearby_bus = response.data.nearby_bus; // ต้องมีบรรทัดนี้หลังโหลด json
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


$scope.isExpanded = false;
$scope.dragging = false;
$scope.startY = 0;
$scope.currentY = 0;

function onDocumentMouseMove(e) {
  if (!$scope.dragging) return;
  $scope.currentY = e.clientY;
}

function onDocumentMouseUp(e) {
  if (!$scope.dragging) return;
  var endY = e.clientY;
  var deltaY = endY - $scope.startY;
  if (deltaY < -40) {
    $scope.isExpanded = true;
  } else if (deltaY > 40 && $scope.isExpanded) {
    // ย่อได้เฉพาะตอนขยายอยู่
    $scope.isExpanded = false;
  }
  $scope.dragging = false;
  $scope.$applyAsync();
  document.removeEventListener('mousemove', onDocumentMouseMove);
  document.removeEventListener('mouseup', onDocumentMouseUp);
}

$scope.startDrag = function(event) {
  // รองรับทั้ง mouse และ touch
  var e = event.touches ? event.touches[0] : event;
  $scope.dragging = true;
  $scope.startY = e.clientY;
  $scope.currentY = $scope.startY;
  if (event.type.startsWith('touch')) event.preventDefault();

  // mouse
  if (!event.touches) {
    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
  }
};

$scope.onDrag = function(event) {
  if (!$scope.dragging) return;
  if (event.touches) {
    $scope.currentY = event.touches[0].clientY;
  }
};

$scope.endDrag = function(event) {
  if (!$scope.dragging) return;
  var endY;
  if (event.changedTouches) {
    endY = event.changedTouches[0].clientY;
  } else {
    endY = event.clientY;
  }
  var deltaY = endY - $scope.startY;
  if (deltaY < -40) {
    $scope.isExpanded = true;
  } else if (deltaY > 40 && $scope.isExpanded) {
    // ย่อได้เฉพาะตอนขยายอยู่
    $scope.isExpanded = false;
  }
  $scope.dragging = false;
  $scope.$applyAsync();
  // mouse: document event จะลบเอง
};

$scope.toggleTrackingInfo = function() {
  $scope.isExpanded = !$scope.isExpanded;
};
});
