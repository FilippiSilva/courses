angular.module('app').controller('courseListCtrl', function ($scope, $filter, $mdDialog, courseService) {
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

  $scope.showModalUsers = function (course) {
    function DialogController($scope, $mdDialog, course) {
      $scope.course = course;
     
      $scope.cancel = function() {
        $mdDialog.hide();
      }
    }

    $mdDialog.show({
      templateUrl: 'view/courseModalUsers.html',
      controller: DialogController,
      clickOutsideToClose: true,
      locals: {
        course
      }
    })
  }

  $scope.print = async function () {
    const courses = (await courseService.fetchCourses({limit: 99999, sort: 'id'})).data

    let doc = new jsPDF('p', 'pt')
    doc.setFontSize(12)
    doc.setTextColor(0)
    doc.setFontStyle('bold')
    doc.text('Cursos', 40, 50)
  
    const courseHeader = ['ID', 'Título', 'Carga horária', 'Valor']
    const courseKeys = ['id', 'title', 'workload', 'value']
    const courseBody = getCourseBody()
    doc.autoTable({
      head: [courseHeader],
      body: courseBody,
      startY: 60
    })

    doc.text('Matriculas', 40, doc.autoTable.previous.finalY + 40)
    
    const userHeader = ['ID Curso', 'Nome', 'Email', 'Telefone']
    const userKeys = ['name', 'email', 'phone']
    const userBody = getUserBody()
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 50,
      head: [userHeader],
      body: userBody,
      theme: 'grid'
    })
    
    window.open(doc.output('bloburl'), '_blank')

    function getCourseBody () {
      return courses.map(item => {
        return courseKeys.map(key => {
          let data = item[key]
          if (key === 'workload') data = $filter('durationTimeByMinutes')(data)
          else if (key === 'value') data = $filter('currency')(data)
  
          return data
        })
      })
    }

    function getUserBody () {
      let body = []
      courses.forEach(course => {
        if (course.users.length < 1) return

        course.users.forEach((user, index) => {
          var row = []

          if (index < 1) {
            row.push({
              rowSpan: course.users.length,
              content: course.id,
              styles: { valign: 'middle', halign: 'center' }
            })
          }

          userKeys.forEach(key => {
            let data = user[key]
            if (key === 'phone') data = $filter('phone')(data)
            
            row.push(data)
          })
          body.push(row)
        })
      })
      
      return body
    }
  }

  $scope.fetch()
})