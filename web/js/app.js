angular.module('app', ['ui.router', 'ngMaterial', 'md.data.table', 'angular.filter'])
  	.config(function($stateProvider, $urlRouterProvider, $mdDateLocaleProvider) {
      $urlRouterProvider.otherwise('courses');

      $stateProvider
        .state({
          name: 'courses',
          url: '/courses',
          templateUrl: 'view/courseList.html',
          controller: 'courseListCtrl'
        })
        .state({
          name: 'course',
          url: '/courses/new',
          templateUrl: 'view/courseForm.html',
          controller: 'courseFormCtrl'
        })
        .state({
          name: 'courseEdit',
          url: '/courses/:id/edit',
          templateUrl: 'view/courseForm.html',
          controller: 'courseFormCtrl'
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
          controller: 'userFormCtrl'
        })

        const maskDate = 'DD/MM/YYYY'
        $mdDateLocaleProvider.formatDate = function(date) {
          return date ? moment(date).format(maskDate) : '';
        };

        $mdDateLocaleProvider.parseDate = function(dateString) {
          var m = moment(dateString, maskDate, true);
          return m.isValid() ? m.toDate() : new Date(NaN);
        };
    })