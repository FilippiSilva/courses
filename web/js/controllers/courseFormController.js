angular.module('app').controller('courseFormCtrl', function ($scope, courseService) {
  $scope.course = {}
  $scope.loading = false

  $scope.fetch = function (id) {
    $scope.loading = courseService.fetchCourse(id).then(data => {
      $scope.loading = false
      $scope.course = data
    })
  }
})