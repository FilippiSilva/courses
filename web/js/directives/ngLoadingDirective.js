angular.module("app").directive("ngLoading", function ($compile) {
  const loadingSpinner = `
    <div class="ng-loading-panel">
      <div class="ng-loading-icon">
        <md-progress-circular md-mode="indeterminate" class="inline-block"></md-progress-circular>
      </div>
    </div>

    <style>
      .ng-loading-container {
        position: relative!important;
      }
      
      .ng-loading-panel {
        position: absolute;
        z-index: 2000;
        background-color: hsla(0,0%,100%,.9);
        margin: 0;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transition: opacity .3s;
      }

      .ng-loading-icon {
        top: 50%;
        margin-top: -25px;
        width: 100%;
        text-align: center;
        position: absolute;
      }
    </style>
  `;

  return {
    restrict: "A",
    link: function (scope, element, attrs) {
      element.addClass("ng-loading-container")
      element.append(loadingSpinner)
      $compile(element.find('md-progress-circular'))(scope)
      scope.$watch(attrs.ngLoading, function (val) {
        if (val) {
          element.addClass("ng-loading-container")
          angular.element(element[0].querySelector(".ng-loading-panel")).removeClass('hide')
        } else {
          element.removeClass("ng-loading-container")
          angular.element(element[0].querySelector(".ng-loading-panel")).addClass('hide')
        }
      })
    },
  }
})
