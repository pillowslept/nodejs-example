import { sanitize, validate } from 'schema-inspector'
import { createValidation } from 'validations/movie.validation'
import * as movieService from 'services/movie.service'
import { RECORD_NOT_FOUND, RECORD_NOT_UPDATED } from 'constants/messages.constant'
import { success, notFound, badRequest } from 'utils/format-response'

export const all = async (req, res) => {
  const data = await movieService.all()

  return success(res, data)
}

export const byId = async ({ params: { id } }, res) => {
  const data = await movieService.byId(id)

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

  const data = await movieService.create(body)

  return success(res, data)
}

export const markAsWatched = async ({ params: { id } }, res) => {
  const movie = await movieService.byId(id)

  if (!movie) {
    return notFound(res, RECORD_NOT_FOUND)
  }

  const data = await movieService.markAsWatched(id)

  if (!data) {
    return badRequest(res, RECORD_NOT_UPDATED)
  }

  return success(res, movie)
}

export const seen = async (req, res) => {
  const data = await movieService.seen()

  return success(res, data)
}

export const toWatch = async (req, res) => {
  const data = await movieService.toWatch()

  return success(res, data)
}
