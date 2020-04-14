angular.module('app').controller('userListCtrl', function ($scope, $mdDialog, userService) {
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

  $scope.remove = function (user) {
    var confirm = $mdDialog.confirm()
    .title('Tem certeza disso?')
    .textContent(`Você vai remover o usuário "${user.name}".`)
    .ok('Sim')
    .cancel('Não')

    $mdDialog.show(confirm).then(function() {
        $scope.loading = userService.remove(user.id)
          .then(() => $scope.fetch())
      }, function() {
        console.log('remove -> confirm -> false')
      })
  }


  $scope.fetch()
})