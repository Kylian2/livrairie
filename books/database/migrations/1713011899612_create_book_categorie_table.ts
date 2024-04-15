import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'book_categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('book_id')
        .notNullable()
        .unsigned()
        .references('books.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('categorie_id')
        .notNullable()
        .unsigned()
        .references('categories.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.unique(['book_id', 'categorie_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
