angular.module('app', ['ui.router', 'ngMaterial', 'md.data.table', 'angular.filter'])
  	.config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('courses');

      $stateProvider
        .state({
          name: 'courses',
          url: '/courses',
          templateUrl: 'view/courseList.html',
          controller: 'courseListCtrl'
        })
        .state({
          name: 'users',
          url: '/users',
          templateUrl: 'view/userList.html',
          controller: 'userListCtrl'
        })
        .state({
          name: 'user',
          url: '/users/new',
          templateUrl: 'view/userForm.html',
          controller: 'userFormCtrl'
        })
        .state({
          name: 'userEdit',
          url: '/users/:id/edit',
          templateUrl: 'view/userForm.html',
          controller: 'userFormCtrl',
          // resolve: {
          //   user: function (userFormCtrl, $stateParams) {
          //     return userFormCtrl.fetch($stateParams.id)
          //   }
          // }
        })
    })