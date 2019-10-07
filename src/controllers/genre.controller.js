import { ApiException } from 'utils/errors.exceptions'
import { BAD_REQUEST, NOT_FOUND } from 'http-status'
import { sanitize, validate } from 'schema-inspector'
import { createUpdateValidation } from 'validations/genre.validation'
import * as genreService from 'services/genre.service'
import { RECORD_NOT_FOUND } from 'constants/messages.constant'
import { success } from 'utils/format-response'
import * as reportComponent from 'components/report.component'

export const all = async (req, res, next) => {
  try {
    const data = await genreService.all()

    return success(res, data)
  } catch (err) {
    next(err)
  }
}

export const byId = async ({ params: { id } }, res, next) => {
  try {
    const data = await genreService.byId(id)

    if (!data) {
      throw new ApiException(RECORD_NOT_FOUND, NOT_FOUND)
    }

    return success(res, data)
  } catch (err) {
    next(err)
  }
}

export const create = async ({ body }, res, next) => {
  try {
    sanitize(createUpdateValidation.sanitize, body)
    const validation = validate(createUpdateValidation.validate, body)

    if (!validation.valid) {
      throw new ApiException(validation.format(), BAD_REQUEST)
    }

    const data = await genreService.create(body)

    return success(res, data)
  } catch (err) {
    next(err)
  }
}

export const update = async ({ body, params: { id } }, res, next) => {
  try {
    const record = await genreService.byId(id)

    if (!record) {
      throw new ApiException(RECORD_NOT_FOUND, NOT_FOUND)
    }

    sanitize(createUpdateValidation.sanitize, body)
    const validation = validate(createUpdateValidation.validate, body)

    if (!validation.valid) {
      throw new ApiException(validation.format(), BAD_REQUEST)
    }

    const data = await genreService.update(id, body)

    return success(res, data)
  } catch (err) {
    next(err)
  }
}

export const moviesByGenre = async ({ params: { id } }, res, next) => {
  try {
    const record = await genreService.byId(id)

    if (!record) {
      throw new ApiException(RECORD_NOT_FOUND, NOT_FOUND)
    }

    const data = await genreService.moviesByGenre(id)

    return success(res, data)
  } catch (err) {
    next(err)
  }
}

export const report = async ({ params: { id } }, res, next) => {
  try {
    const genre = await genreService.byId(id)

    if (!genre) {
      throw new ApiException(RECORD_NOT_FOUND, NOT_FOUND)
    }

    const movies = await genreService.moviesByGenre(id)

    const filename = `report_${genre.id}.pdf`

    res.setHeader('Content-disposition', `inline; filename="${filename}"`)
    res.setHeader('Content-type', 'application/pdf')

    const doc = reportComponent.byGenre(genre, movies)

    doc.pipe(res)
    doc.end()
  } catch (err) {
    next(err)
  }
}
