angular.module('app').controller('courseFormCtrl', function ($scope, $stateParams, courseService) {
  $scope.course = {}
  $scope.loading = false

  $scope.fetch = function (id) {
    $scope.loading = courseService.fetchCourse(id).then(data => {
      $scope.loading = false
      $scope.course = data
    })
  }

  $scope.onSubmit = function () {
    $scope.loading = courseService.save($scope.course).then(data => {
      $scope.loading = false
      $scope.course = data
    })
  }

  const id = $stateParams.id
  if (id) {
    $scope.fetch(id)
  }
})
