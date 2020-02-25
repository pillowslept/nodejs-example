import { ACTIVE, INACTIVE } from 'constants/states.constant'
import { Movie, Genre, Company } from 'models'

const RELATIONS = [{ model: Genre, through: { attributes: [] } }, { model: Company }]

export const all = async () => {
  return Movie.findAll({
    include: RELATIONS
  })
}

export const byId = async (id) => {
  return Movie.findOne({
    where: { id },
    include: RELATIONS
  })
}

export const create = async ({ name, state = INACTIVE, companyId }) => {
  return Movie.create({ name, state, companyId })
}

export const addGenres = async (id, { genres }) => {
  const movie = await byId(id)

  movie.setGenres(genres)

  return movie.update(movie)
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
