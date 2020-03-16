import { Actor, Movie } from 'models'

export const all = async () => {
  return Actor.findAll()
}

export const byId = async (id) => {
  return Actor.findOne({ where: { id } })
}

export const create = async (attributes) => {
  return Actor.create(attributes)
}

export const update = async (id, attributes) => {
  const actor = await byId(id)

  return actor.update(attributes)
}

export const byMovie = async (id) => {
  return Actor.findAll({
    include: [{ model: Movie, attributes: [], where: { id } }]
  })
}
