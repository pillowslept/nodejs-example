import { OK, BAD_REQUEST, NOT_FOUND, CONFLICT } from 'http-status'
import * as movieService from 'services/movie.service'

import {
  RECORD_NOT_FOUND,
  RECORD_NOT_UPDATED,
  NAME_FIELD_REQUIRED
} from 'constants/messages.constant'

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
      message: RECORD_NOT_FOUND
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
      message: NAME_FIELD_REQUIRED
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
      message: RECORD_NOT_FOUND
    })
  }

  const [{ affectedRows }] = await movieService.markAsWatched(id)

  if (!affectedRows) {
    return res.status(CONFLICT).send({
      success: false,
      message: RECORD_NOT_UPDATED
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
