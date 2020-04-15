angular.module('app').controller('courseFormCtrl', function ($scope, $stateParams, $element, courseService, userService) {
  $scope.course = {}
  $scope.users = []
  $scope.loading = false
  $scope.searchTerm

  $scope.fetch = function (id) {
    $scope.loading = courseService.fetchCourse(id).then(data => {
      $scope.loading = false
      data.users = data.users.map(user => user.id)
      $scope.course = data
    })
  }

  $scope.fetchUsers = function () {
    $scope.loading = userService.fetchUsers().then(data => {
      $scope.loading = false
      $scope.users = data.data
    })
  }

  $scope.onSubmit = function () {
    $scope.loading = courseService.save($scope.course).then(data => {
      $scope.loading = false
      $scope.course = data
    })
  }

  $scope.clearSearchTerm = function() {
    $scope.searchTerm = '';
  };

  angular.element($element[0].querySelector('input.select-header-searchBox')).on('keydown', function(ev) {
      ev.stopPropagation();
  });

  const id = $stateParams.id
  if (id) {
    $scope.fetch(id)
  }

  $scope.fetchUsers()
})
