import { connection } from 'config/connections'

export const seen = async () => {
  return connection.query('SELECT * from movie where state = ?', ['A'])
}

export const toWatch = async () => {
  return connection.query('SELECT * from movie where state = ?', ['I'])
}
