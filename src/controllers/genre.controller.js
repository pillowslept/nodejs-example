import { sanitize, validate } from 'schema-inspector'
import { createValidation } from 'validations/genre.validation'
import * as genreService from 'services/genre.service'
import { RECORD_NOT_FOUND } from 'constants/messages.constant'
import { success, notFound, badRequest } from 'utils/format-response'

export const all = async (req, res) => {
  const data = await genreService.all()

  return success(res, data)
}

export const byId = async ({ params: { id } }, res) => {
  const data = await genreService.byId(id)

  if (!data) {
    return notFound(res, RECORD_NOT_FOUND)
  }

  return success(res, data)
}

export const create = async ({ body }, res) => {
  sanitize(createValidation.sanitize, body)
  const validation = validate(createValidation.validate, body)

  if (!validation.valid) {
    return badRequest(res, validation.format())
  }

  const data = await genreService.create(body)

  return success(res, data)
}

export const moviesByGenre = async ({ params: { id } }, res) => {
  const record = await genreService.byId(id)

  if (!record) {
    return notFound(res, RECORD_NOT_FOUND)
  }

  const data = await genreService.moviesByGenre(id)

  return success(res, data)
}
