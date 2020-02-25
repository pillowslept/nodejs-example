import { ApiException } from 'utils/errors.exceptions'
import { BAD_REQUEST, NOT_FOUND } from 'http-status'
import { sanitize, validate } from 'schema-inspector'
import { createValidation, addGenresValidation } from 'validations/movie.validation'
import * as movieService from 'services/movie.service'
import * as companyService from 'services/company.service'
import { RECORD_NOT_FOUND, RECORD_NOT_UPDATED } from 'constants/messages.constant'
import { success } from 'utils/format-response'
import * as reportComponent from 'components/report.component'

export const all = async (req, res, next) => {
  try {
    const data = await movieService.all()

    return success(res, data)
  } catch (err) {
    next(err)
  }
}

export const byId = async ({ params: { id } }, res, next) => {
  try {
    const data = await movieService.byId(id)

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
    sanitize(createValidation.sanitize, body)
    const validation = validate(createValidation.validate, body)

    if (!validation.valid) {
      throw new ApiException(validation.format(), BAD_REQUEST)
    }

    const company = await companyService.byId(body.companyId)

    if (!company) {
      throw new ApiException('Company does not found', NOT_FOUND)
    }

    const data = await movieService.create(body)

    return success(res, data)
  } catch (err) {
    next(err)
  }
}

export const addGenres = async ({ params: { id }, body }, res, next) => {
  try {
    const movie = await movieService.byId(id)

    if (!movie) {
      throw new ApiException(RECORD_NOT_FOUND, NOT_FOUND)
    }

    sanitize(addGenresValidation.sanitize, body)
    const validation = validate(addGenresValidation.validate, body)

    if (!validation.valid) {
      throw new ApiException(validation.format(), BAD_REQUEST)
    }

    const data = await movieService.addGenres(id, body)

    return success(res, data)
  } catch (err) {
    next(err)
  }
}

export const markAsWatched = async ({ params: { id } }, res, next) => {
  try {
    const movie = await movieService.byId(id)

    if (!movie) {
      throw new ApiException(RECORD_NOT_FOUND, NOT_FOUND)
    }

    const data = await movieService.markAsWatched(id)

    if (!data) {
      throw new ApiException(RECORD_NOT_UPDATED, BAD_REQUEST)
    }

    return success(res, movie)
  } catch (err) {
    next(err)
  }
}

export const seen = async (req, res, next) => {
  try {
    const data = await movieService.seen()

    return success(res, data)
  } catch (err) {
    next(err)
  }
}

export const toWatch = async (req, res, next) => {
  try {
    const data = await movieService.toWatch()

    return success(res, data)
  } catch (err) {
    next(err)
  }
}

export const report = async ({ params: { id } }, res, next) => {
  try {
    const movie = await movieService.byId(id)

    if (!movie) {
      throw new ApiException(RECORD_NOT_FOUND, NOT_FOUND)
    }

    const filename = `report_${movie.id}.pdf`

    res.setHeader('Content-disposition', `inline; filename="${filename}"`)
    res.setHeader('Content-type', 'application/pdf')

    const doc = reportComponent.byMovie(movie)

    doc.pipe(res)
    doc.end()
  } catch (err) {
    next(err)
  }
}
