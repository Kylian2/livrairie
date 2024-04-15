import { DateTime } from 'luxon'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import Category from '#models/category'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare cover: string

  @column()
  declare author: string

  @column()
  declare resume: string

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @manyToMany(() => Category, {
    pivotForeignKey: 'categorie_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'book_id',
    pivotTable: 'book_categories',
  })
  declare categories: ManyToMany<typeof Category>
}
