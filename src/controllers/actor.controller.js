import { ApiException } from 'utils/errors.exceptions'
import { BAD_REQUEST, NOT_FOUND } from 'http-status'
import { sanitize, validate } from 'schema-inspector'
import { createUpdateValidation } from 'validations/actor.validation'
import * as actorService from 'services/actor.service'
import * as movieService from 'services/movie.service'
import { RECORD_NOT_FOUND } from 'constants/messages.constant'
import { success } from 'utils/format-response'
import * as requestUtil from 'utils/request.util'

const REQUEST_ATTRIBUTES = ['name', 'picture', 'birthplace']

export const all = async (req, res, next) => {
  try {
    const data = await actorService.all()

    return success(res, data)
  } catch (err) {
    next(err)
  }
}

export const byId = async ({ params: { id } }, res, next) => {
  try {
    const data = await actorService.byId(id)

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

    const attributes = requestUtil.only(REQUEST_ATTRIBUTES, body)

    const data = await actorService.create(attributes)

    return success(res, data)
  } catch (err) {
    next(err)
  }
}

export const update = async ({ body, params: { id } }, res, next) => {
  try {
    const record = await actorService.byId(id)

    if (!record) {
      throw new ApiException(RECORD_NOT_FOUND, NOT_FOUND)
    }

    sanitize(createUpdateValidation.sanitize, body)
    const validation = validate(createUpdateValidation.validate, body)

    if (!validation.valid) {
      throw new ApiException(validation.format(), BAD_REQUEST)
    }

    const attributes = requestUtil.only(REQUEST_ATTRIBUTES, body)

    const data = await actorService.update(id, attributes)

    return success(res, data)
  } catch (err) {
    next(err)
  }
}

export const byMovie = async ({ params: { id } }, res, next) => {
  try {
    const record = await movieService.byId(id)

    if (!record) {
      throw new ApiException(RECORD_NOT_FOUND, NOT_FOUND)
    }

    const data = await actorService.byMovie(id)

    return success(res, data)
  } catch (err) {
    next(err)
  }
}
