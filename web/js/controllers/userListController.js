angular.module('app').controller('userListCtrl', function ($scope, userService) {
  $scope.loading = false
  $scope.users = []
  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  }

  $scope.fetch = function () {
    const query = {
      sort: $scope.query.order,
      limit: $scope.query.limit,
      page: $scope.query.page
    }
    $scope.loading = userService.fetchUsers(query).then(response => {
      $scope.users = response.data
      $scope.query.total = response.total
    })
  }

  $scope.delete = function (id) {
    console.log(id)
    $scope.loading = userService.delete(id)
  }


  $scope.fetch()
})