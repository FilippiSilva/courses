angular.module('app').controller('courseListCtrl', function ($scope, $mdDialog, courseService) {
  $scope.loading = false
  $scope.courses = []
  $scope.query = {
    order: 'title',
    limit: 5,
    page: 1
  }

  $scope.fetch = function () {
    const query = {
      sort: $scope.query.order,
      limit: $scope.query.limit,
      page: $scope.query.page
    }
    $scope.loading = courseService.fetchCourses(query).then(response => {
      $scope.courses = response.data
      $scope.query.total = response.total
    })
  }

  
  $scope.remove = function (course) {
    var confirm = $mdDialog.confirm()
    .title('Tem certeza disso?')
    .textContent(`Você vai remover o curso "${course.title}".`)
    .ok('Sim')
    .cancel('Não')

    $mdDialog.show(confirm).then(function() {
        $scope.loading = courseService.remove(course.id)
          .then(() => $scope.fetch())
      }, function() {
        console.log('remove -> confirm -> false')
      })
  }

  $scope.fetch()
})