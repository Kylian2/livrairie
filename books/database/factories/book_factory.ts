import factory from '@adonisjs/lucid/factories'
import Book from '#models/book'

export const BookFactory = factory
  .define(Book, async ({ faker }) => {
    return {
      title: faker.music.songName(),
      cover: faker.image.urlPicsumPhotos(),
      author: faker.person.fullName(),
      resume: faker.lorem.text(),
      userId: faker.number.int({ min: 1, max: 5 }),
    }
  })
  .build()
