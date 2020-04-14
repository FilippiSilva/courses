angular.module('app').service('userService', function () {
  this.user = {}
  this.users = []

  this.fetchUser = function(id) {
    return iAxios.get('/users/' + id)
      .then(response => {
        const data = response.data.data
        this.user = data
        return data
      })
  }

  this.fetchUsers = function(query = {}) {
    return iAxios.get('/users', {
        params: query
      })
      .then(response => {
        const data = response.data
        this.users = data.data
        return data
      })
  }

  this.delete = function(id) {
    return iAxios.delete('/users/' + id)
  }


  this.persist = function(payload) {
    return iAxios.post('/users', payload)
      .then(response => {
        const data = response.data
        this.user = data.data
        return data
      })
  }

  this.update = function(payload) {
    return iAxios.put('/users', payload)
      .then(response => {
        const data = response.data
        this.user = data.data
        return data
      })
  }

  this.save = function(payload) {
    if (payload.id) return this.update(payload)
    else return this.persist(payload)
  }
})