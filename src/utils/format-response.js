import { OK, BAD_REQUEST, NOT_FOUND } from 'http-status'

export const success = (res, data) => {
  return res.status(OK).send({
    success: true,
    data
  })
}

export const notFound = (res, message) => {
  return res.status(NOT_FOUND).send({
    success: false,
    message
  })
}

export const badRequest = (res, message) => {
  return res.status(BAD_REQUEST).send({
    success: false,
    message
  })
}
