angular.module('app').controller('courseListCtrl', function ($scope, courseService) {
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


  $scope.fetch()
})