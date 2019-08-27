import { ACTIVE, INACTIVE } from 'constants/states.constant'
import { Movie, Genre } from 'models'

export const all = async () => {
  return Movie.findAll({
    include: [{ model: Genre, through: { attributes: [] } }]
  })
}

export const byId = async (id) => {
  return Movie.findOne({
    where: { id },
    include: [{ model: Genre, through: { attributes: [] } }]
  })
}

export const create = async ({ name, state = INACTIVE }) => {
  return Movie.create({ name, state })
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
