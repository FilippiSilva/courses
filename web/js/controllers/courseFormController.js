angular.module('app').controller('courseFormCtrl', function ($scope, $stateParams, $element, $state, courseService, userService) {
  $scope.course = {}
  $scope.users = []
  $scope.loading = true
  $scope.searchTerm

  $scope.fetch = function (id) {
    $scope.changeLoading(true)
    courseService.fetchCourse(id).then(data => {
      $scope.changeLoading(false)
      data.users = data.users.map(user => user.id)
      $scope.course = data
    })
  }

  $scope.fetchUsers = function () {
    // $scope.changeLoading(true)
    userService.fetchUsers().then(data => {
      // $scope.changeLoading(false)
      $scope.users = data.data
    })
  }

  $scope.onSubmit = function () {
    $scope.changeLoading(true)
    courseService.save($scope.course).then(data => {
      $scope.changeLoading(false)
      $scope.course = data
      $state.go('courses')
    })
  }
  
  $scope.clearSearchTerm = function() {
    $scope.searchTerm = '';
  };

  $scope.changeLoading =  _.debounce(changeLoading, 250)

  function changeLoading (data) {
    $scope.loading = data
    $scope.$apply()
  }

  angular.element($element[0].querySelector('input.select-header-searchBox')).on('keydown', function(ev) {
      ev.stopPropagation();
  });

  const id = $stateParams.id
  if (id) {
    $scope.fetch(id)
  } else {
    $scope.changeLoading(false)
  }

  $scope.fetchUsers()
})
