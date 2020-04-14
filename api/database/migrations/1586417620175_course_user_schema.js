'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CourseUserSchema extends Schema {
  up () {
    this.create('course_user', (table) => {
      table.increments()
      table
        .integer('course_id')
        .unsigned()
        .references('course.id')
        .onDelete('cascade')
        .index('course_id')
      table
        .integer('user_id')
        .unsigned()
        .references('user.id')
        .onDelete('cascade')
        .index('user_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('course_user')
  }
}

module.exports = CourseUserSchema
