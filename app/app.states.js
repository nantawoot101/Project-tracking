app.config(function($stateProvider, $urlRouterProvider) {
  // Default route
  $urlRouterProvider.otherwise('');

  // State definitions
$stateProvider.state('tracking', {
  url: '/tracking',
  templateUrl: 'app/view/tracking/tracking.html',
  controller: 'TrackingController',
});

} );