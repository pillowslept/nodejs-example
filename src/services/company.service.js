import { Company } from 'models'

export const all = async () => {
  return Company.findAll()
}

export const byId = async (id) => {
  return Company.findOne({ where: { id } })
}

export const create = async ({ name, since }) => {
  return Company.create({ name, since })
}

export const update = async (id, { name }) => {
  const company = await byId(id)

  return company.update({ name })
}
