angular.module('app').controller('userFormCtrl', function ($scope, $stateParams, userService) {
  $scope.user = {}
  $scope.loading = false

  $scope.fetch = function (id) {
    $scope.loading = userService.fetchUser(id).then(data => {
      $scope.loading = false
      $scope.user = data
    })
  }

  $scope.onSubmit = function () {
    $scope.loading = userService.save($scope.user).then(data => {
      $scope.loading = false
      $scope.user = data
    })
  }

  const id = $stateParams.id
  if (id) {
    $scope.fetch(id)
  }
})