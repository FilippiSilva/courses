'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
  return {
    username: faker.username(),
    password: faker.password(),
    email: faker.email(),
    name: faker.name(),
    phone: faker.phone({ country: 'br', formatted: false }),
    address: faker.address(),
    admission_date: faker.date({ min: new Date('2015-01-01 00:00')}),
    avatar: faker.avatar()
  }
})

Factory.blueprint('App/Models/Course', (faker) => {
  return {
    title: "Gestão em vendas Módulo " + faker.integer({ min: 1, max: 10 }),
    description: faker.paragraph({ sentences: 3 }),
    workload: faker.integer({ min: 240, max: 2400 }),
    value: faker.integer({ min: 0, max: 500 }),
    cover: "https://assets.entrepreneur.com/content/3x2/2000/20191127190639-shutterstock-431848417-crop.jpeg?width=700&crop=2:1"
  }
})
