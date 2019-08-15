import { connection } from 'config/connections'

export const all = async () => {
  return connection.query('SELECT * from movie')
}

export const byId = async (id) => {
  return connection.query('SELECT * from movie where id = ?', [id])
}

export const create = async ({ name, state = 'I' }) => {
  return connection.query('INSERT INTO movie (name, state) VALUES (?,?)', [name, state])
}

export const markAsWatched = async (id) => {
  return connection.query('UPDATE movie set state = ? where id = ?', ['A', id])
}

export const seen = async () => {
  return connection.query('SELECT * from movie where state = ?', ['A'])
}

export const toWatch = async () => {
  return connection.query('SELECT * from movie where state = ?', ['I'])
}
