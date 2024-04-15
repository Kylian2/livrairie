import { FieldContext } from '@vinejs/vine/types'
import vine from '@vinejs/vine'
/**
 * Options accepted by the unique rule
 */
export type Options = {
  table: string
  column: string
}

/**
 * Implementation
 */
async function unique(value: unknown, options: Options, field: FieldContext) {
  /**
   * We do not want to deal with non-string
   * values. The "string" rule will handle the
   * the validation.
   */
  if (typeof value !== 'string') {
    return
  }

  const row = await db
    .select(options.column)
    .from(options.table)
    .where(options.column, value)
    .first()

  if (row) {
    field.report('The {{ field }} field is not unique', 'unique', field)
  }
}

export const uniqueRule = vine.createRule(unique)
