angular.module('app').service('userService', function () {
  this.user = {}
  this.users = []

  function fetchUser(id) {
    return iAxios.get('/users/' + id)
      .then(response => {
        const data = response.data
        this.user = data
        return data
      })
  }

  function fetchUsers(query = {}) {
    return iAxios.get('/users', {
        params: query
      })
      .then(response => {
        const data = response.data
        this.users = data.data
        return data
      })
  }

  function remove(id) {
    return iAxios.delete('/users/' + id)
  }


  function persist(payload) {
    return iAxios.post('/users', payload)
      .then(response => {
        const data = response.data
        this.user = data.data
        return data
      })
  }

  function update(payload) {
    return iAxios.put('/users', payload)
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
    fetchUser,
    fetchUsers,
    remove,
    persist,
    update,
    save
  }
})