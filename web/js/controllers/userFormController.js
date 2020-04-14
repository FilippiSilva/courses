angular.module('app').controller('userFormCtrl', function ($scope, userService) {
  $scope.user = {}
  $scope.loading = false

  $scope.fetch = function (id) {
    $scope.loading = userService.fetchUser(id).then(data => {
      $scope.loading = false
      $scope.user = data
    })
  }

  $scope.onSubmit = function () {
    console.log($scope.user)
    $scope.loading = userService.save($scope.user).then(data => {
      $scope.loading = false
      $scope.user = data
    })
  }
})