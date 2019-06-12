import { OK } from 'http-status'
import {
  CHEER_MESSAGE,
  HELLO_MESSAGE,
  DEFAULT_MESSAGE
} from 'constants/default.constant'

export const hello = (req, res) => {
  res.status(OK).send({
    success: true,
    data: HELLO_MESSAGE
  })
}

export const cheer = (req, res) => {
  res.status(OK).send({
    success: true,
    data: CHEER_MESSAGE
  })
}

export const def = (req, res) => {
  res.status(OK).send({
    success: true,
    data: DEFAULT_MESSAGE
  })
}
