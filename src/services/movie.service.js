import { ACTIVE, INACTIVE } from 'constants/states.constant'
import { Movie } from 'models'

export const all = async () => {
  return Movie.findAll()
}

export const byId = async (id) => {
  return Movie.findOne({ where: { id } })
}

export const create = async ({ name, state = INACTIVE }) => {
  return Movie.create({ name, state })
}

export const markAsWatched = async (id) => {
  return Movie.update({ state: ACTIVE }, { where: { id } })
}

export const seen = async () => {
  return Movie.findAll({ where: { state: ACTIVE } })
}

export const toWatch = async () => {
  return Movie.findAll({ where: { state: INACTIVE } })
}
