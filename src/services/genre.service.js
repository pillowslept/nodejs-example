import { Genre, Movie } from 'models'

export const all = async () => {
  return Genre.findAll()
}

export const byId = async (id) => {
  return Genre.findOne({ where: { id } })
}

export const create = async ({ name }) => {
  return Genre.create({ name })
}

export const update = async (id, { name }) => {
  const genre = await byId(id)

  return genre.update({ name })
}

export const moviesByGenre = async (id) => {
  return Movie.findAll({
    include: [{ model: Genre, attributes: [], where: { id } }]
  })
}
