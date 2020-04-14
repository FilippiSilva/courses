angular.module('app').service('courseService', function () {
  this.course = {}
  this.courses = []

  function fetchCourse(id) {
    return iAxios.get('/courses/' + id)
      .then(response => {
        const data = response.data.data
        this.course = data
        return data
      })
  }

  function fetchCourses(query = {}) {
    return iAxios.get('/courses', {
        params: query
      })
      .then(response => {
        const data = response.data
        this.courses = data.data
        return data
      })
  }

  return {
    fetchCourse,
    fetchCourses
  }
})