import Category from '#models/category'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class CategoriesController {
  async index({}: HttpContext) {
    return await Category.all()
  }

  async indexByUser({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const userId = user.id
    const categoriesRequest = await db.rawQuery(
      `
      SELECT DISTINCT c.name
      FROM books b
      INNER JOIN book_categories bc ON b.id = bc.book_id
      INNER JOIN categories c ON bc.categorie_id = c.id
      WHERE b.user_id = :user_id`,
      {
        user_id: userId,
      }
    )
    let categories: Array<string> = []
    for (let categorie of categoriesRequest[0]) {
      categories.push(categorie.name)
    }
    return categories
  }
}
