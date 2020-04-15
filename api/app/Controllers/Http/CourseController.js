'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Course = use('App/Models/Course')

/**
 * Resourceful controller for interacting with courses
 */
class CourseController {
  /**
   * Show a list of all courses.
   * GET courses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let { page = 1, limit = 10, sort = 'title', sortDirection = 'asc'} = request.all()
    return Course.query().with('users').orderBy(sort, sortDirection).paginate(page, limit)
  }

  /**
   * Create/save a new course.
   * POST courses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['title', 'description', 'workload', 'value', 'cover'])
    const course = await Course.create(data)

    const { users } = request.post()
    console.log({users})
    if (users && users.length > 0) {
      await course.users().detach()
      await course.users().attach(users)
      course.users = await course.users().fetch()
    }

    return course
  }

  /**
   * Display a single course.
   * GET courses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    return Course.query().with('users').where('id', '=', params.id).first()
  }

  /**
   * Update course details.
   * PUT or PATCH courses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.only(['title', 'description', 'workload', 'value', 'cover'])
    const course = await Course.find(params.id)

    course.merge(data)
    await course.save()

    const { users } = request.post()
    console.log({users})
    if (users && users.length > 0) {
      await course.users().detach()
      await course.users().attach(users)
      course.users = await course.users().fetch()
    }

    return course
  }

  /**
   * Delete a course with id.
   * DELETE courses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const course = await Course.find(params.id)

    return course.delete()
  }
}

module.exports = CourseController
