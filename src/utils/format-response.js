import { OK } from 'http-status'

export const success = (res, data) => {
  return res.status(OK).send({
    success: true,
    data
  })
}
