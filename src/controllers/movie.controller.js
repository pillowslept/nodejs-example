import { sanitize, validate } from 'schema-inspector'
import { createValidation } from 'validations/movie.validation'
import * as movieService from 'services/movie.service'
import { RECORD_NOT_FOUND, RECORD_NOT_UPDATED } from 'constants/messages.constant'
import { success, notFound, badRequest } from 'utils/format-response'

export const all = async (req, res) => {
  const [rows] = await movieService.all()

  return success(res, rows)
}

export const byId = async ({ params: { id } }, res) => {
  const [record] = await movieService.byId(id)

  if (!record || !record.length) {
    return notFound(res, RECORD_NOT_FOUND)
  }

  return success(res, record)
}

export const create = async ({ body }, res) => {
  sanitize(createValidation.sanitize, body)
  const validation = validate(createValidation.validate, body)

  if (!validation.valid) {
    return badRequest(res, validation.format())
  }

  const [{ insertId }] = await movieService.create(body)

  return success(res, insertId)
}

export const markAsWatched = async ({ params: { id } }, res) => {
  const [record] = await movieService.byId(id)

  if (!record || !record.length) {
    return notFound(res, RECORD_NOT_FOUND)
  }

  const [{ affectedRows }] = await movieService.markAsWatched(id)

  if (!affectedRows) {
    return badRequest(res, RECORD_NOT_UPDATED)
  }

  return success(res, record)
}

export const seen = async (req, res) => {
  const [rows] = await movieService.seen()

  return success(res, rows)
}

export const toWatch = async (req, res) => {
  const [rows] = await movieService.toWatch()

  return success(res, rows)
}
