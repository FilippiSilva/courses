angular.module('app').controller('userFormCtrl', function ($scope, $state, $stateParams, userService) {
  $scope.user = {}
  $scope.loading = true

  $scope.fetch = function (id) {
    $scope.changeLoading(true)
    userService.fetchUser(id).then(data => {
      $scope.changeLoading(false)
      $scope.user = data
    })
  }

  $scope.onSubmit = function () {
    $scope.changeLoading(true)
    userService.save($scope.user).then(data => {
      $scope.changeLoading(false)
      $scope.user = data
      $state.go('users')
    })
  }
  
  $scope.changeLoading =  _.debounce(changeLoading, 250)

  function changeLoading (data) {
    $scope.loading = data
    $scope.$apply()
  }

  const id = $stateParams.id
  if (id) {
    $scope.fetch(id)
  } else {
    $scope.changeLoading(false)
  }
})