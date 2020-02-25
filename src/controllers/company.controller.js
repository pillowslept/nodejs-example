import { ApiException } from 'utils/errors.exceptions'
import { BAD_REQUEST, NOT_FOUND } from 'http-status'
import { sanitize, validate } from 'schema-inspector'
import { createUpdateValidation } from 'validations/company.validation'
import * as copmpanyService from 'services/company.service'
import { RECORD_NOT_FOUND } from 'constants/messages.constant'
import { success } from 'utils/format-response'

export const all = async (req, res, next) => {
  try {
    const data = await copmpanyService.all()

    return success(res, data)
  } catch (err) {
    next(err)
  }
}

export const byId = async ({ params: { id } }, res, next) => {
  try {
    const data = await copmpanyService.byId(id)

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

    const data = await copmpanyService.create(body)

    return success(res, data)
  } catch (err) {
    next(err)
  }
}

export const update = async ({ body, params: { id } }, res, next) => {
  try {
    const record = await copmpanyService.byId(id)

    if (!record) {
      throw new ApiException(RECORD_NOT_FOUND, NOT_FOUND)
    }

    sanitize(createUpdateValidation.sanitize, body)
    const validation = validate(createUpdateValidation.validate, body)

    if (!validation.valid) {
      throw new ApiException(validation.format(), BAD_REQUEST)
    }

    const data = await copmpanyService.update(id, body)

    return success(res, data)
  } catch (err) {
    next(err)
  }
}
