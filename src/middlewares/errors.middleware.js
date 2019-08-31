import { ApiException } from 'utils/errors.exceptions'
import { INTERNAL_SERVER_ERROR } from 'http-status'
import { ERROR_HAPPEN } from 'constants/messages.constant'
import * as logger from 'config/logger'

export const errorsHandler = (err, req, res, next) => {
  let message = err.message
  let status = err.status

  if (!(err instanceof ApiException)) {
    message = ERROR_HAPPEN
    status = INTERNAL_SERVER_ERROR
    logger.error(`${ERROR_HAPPEN} => ${err.message}`)
  }

  res.status(status).send({
    success: false,
    message
  })
}
