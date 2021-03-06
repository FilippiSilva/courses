'use strict'

/*
|--------------------------------------------------------------------------
| CourseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class CourseSeeder {
  async run () {
    const courseArray = await Factory
      .model('App/Models/Course')
      .createMany(8)
  }
}

module.exports = CourseSeeder
