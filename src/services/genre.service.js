import { Genre } from 'models'

export const all = async () => {
  return Genre.findAll()
}

export const byId = async (id) => {
  return Genre.findOne({ where: { id } })
}

export const create = async ({ name }) => {
  return Genre.create({ name })
}
