import { OK } from 'http-status'
import * as movieService from 'services/movie.service'

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
