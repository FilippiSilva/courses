angular.module('app').service('courseService', function () {
  this.course = {}
  this.courses = []

  function fetchCourse(id) {
    return iAxios.get('/courses/' + id)
      .then(response => {
        const data = response.data
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

  function remove(id) {
    return iAxios.delete('/courses/' + id)
  }


  function persist(payload) {
    return iAxios.post('/courses', payload)
      .then(response => {
        const data = response.data
        this.user = data.data
        return data
      })
  }

  function update(payload) {
    return iAxios.put('/courses/' + payload.id, payload)
      .then(response => {
        const data = response.data
        this.user = data.data
        return data
      })
  }

  function save(payload) {
    if (payload.id) return this.update(payload)
    else return this.persist(payload)
  }

  return {
    fetchCourse,
    fetchCourses,
    remove,
    persist,
    update,
    save
  }
})