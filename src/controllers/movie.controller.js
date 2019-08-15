import { OK, BAD_REQUEST, NOT_FOUND, CONFLICT } from 'http-status'
import * as movieService from 'services/movie.service'

export const all = async (req, res) => {
  const [rows] = await movieService.all()

  return res.status(OK).send({
    success: true,
    data: rows
  })
}

export const byId = async ({ params: { id } }, res) => {
  const [record] = await movieService.byId(id)

  if (!record || !record.length) {
    return res.status(NOT_FOUND).send({
      success: false,
      message: 'The record wasn\'t found'
    })
  }

  return res.status(OK).send({
    success: true,
    data: record
  })
}

export const create = async ({ body }, res) => {
  if (!body.name) {
    return res.status(BAD_REQUEST).send({
      success: false,
      message: 'The field name is required'
    })
  }

  const [{ insertId }] = await movieService.create(body)

  return res.status(OK).send({
    success: true,
    data: insertId
  })
}

export const markAsWatched = async ({ params: { id } }, res) => {
  const [record] = await movieService.byId(id)

  if (!record || !record.length) {
    return res.status(NOT_FOUND).send({
      success: false,
      message: 'The record wasn\'t found'
    })
  }

  const [{ affectedRows }] = await movieService.markAsWatched(id)

  if (!affectedRows) {
    return res.status(CONFLICT).send({
      success: false,
      message: 'The record wasn\'t updated'
    })
  }

  return res.status(OK).send({
    success: true,
    data: record
  })
}

export const seen = async (req, res) => {
  const [rows] = await movieService.seen()

  return res.status(OK).send({
    success: true,
    data: rows
  })
}

export const toWatch = async (req, res) => {
  const [rows] = await movieService.toWatch()

  return res.status(OK).send({
    success: true,
    data: rows
  })
}
