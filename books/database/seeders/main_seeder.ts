import { BookCategorieFactory } from '#database/factories/book_categorie_factory'
import { BookFactory } from '#database/factories/book_factory'
import { UserFactory } from '#database/factories/user_factory'
import BookCategorie from '#models/book_categorie'
import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const users = await UserFactory.createMany(6)
    await Category.createMany([
      { name: 'Littérature' },
      { name: 'Fantasy' },
      { name: 'Mystère' },
      { name: 'Romance' },
      { name: 'Biographie' },
      { name: 'Histoire' },
      { name: 'Science' },
      { name: 'Bien-être' },
      { name: 'Art' },
      { name: 'Cuisine' },
      { name: 'Poésie' },
      { name: 'Théâtre' },
      { name: 'Philosophie' },
      { name: 'Religion' },
      { name: 'Éconameie' },
      { name: 'Politique' },
      { name: 'Psychologie' },
      { name: 'Aventure' },
      { name: 'Horreur' },
      { name: 'Humour' },
    ])
    const books = await BookFactory.createMany(50)
    await BookCategorie.createMany([
      { bookId: 1, categorieId: 5 },
      { bookId: 2, categorieId: 12 },
      { bookId: 3, categorieId: 8 },
      { bookId: 4, categorieId: 3 },
      { bookId: 5, categorieId: 18 },
      { bookId: 6, categorieId: 7 },
      { bookId: 7, categorieId: 15 },
      { bookId: 8, categorieId: 11 },
      { bookId: 9, categorieId: 1 },
      { bookId: 10, categorieId: 9 },
      { bookId: 11, categorieId: 6 },
      { bookId: 12, categorieId: 14 },
      { bookId: 13, categorieId: 10 },
      { bookId: 14, categorieId: 4 },
      { bookId: 15, categorieId: 16 },
      { bookId: 16, categorieId: 2 },
      { bookId: 17, categorieId: 19 },
      { bookId: 18, categorieId: 17 },
      { bookId: 19, categorieId: 13 },
      { bookId: 20, categorieId: 20 },
      { bookId: 21, categorieId: 7 },
      { bookId: 22, categorieId: 2 },
      { bookId: 23, categorieId: 10 },
      { bookId: 24, categorieId: 5 },
      { bookId: 25, categorieId: 16 },
      { bookId: 26, categorieId: 12 },
      { bookId: 27, categorieId: 4 },
      { bookId: 28, categorieId: 14 },
      { bookId: 29, categorieId: 8 },
      { bookId: 30, categorieId: 1 },
      { bookId: 31, categorieId: 9 },
      { bookId: 32, categorieId: 17 },
      { bookId: 33, categorieId: 3 },
      { bookId: 34, categorieId: 11 },
      { bookId: 35, categorieId: 18 },
      { bookId: 36, categorieId: 6 },
      { bookId: 37, categorieId: 13 },
      { bookId: 38, categorieId: 20 },
      { bookId: 39, categorieId: 15 },
      { bookId: 40, categorieId: 19 },
    ])
  }
}
