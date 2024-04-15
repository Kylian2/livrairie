import factory from '@adonisjs/lucid/factories'
import BookCategorie from '#models/book_categorie'

export const BookCategorieFactory = factory
  .define(BookCategorie, async ({ faker }) => {
    return {
      bookId: faker.number.int({ min: 1, max: 40 }),
      categorieId: faker.number.int({ min: 1, max: 20 }),
    }
  })
  .build()
