import { Sequelize } from 'sequelize'
import { connection } from 'config/connections'
import { MovieModel } from './movie'
import * as logger from 'config/logger'

export const Movie = MovieModel(connection, Sequelize)

connection.sync({ force: true })
  .then(() => {
    logger.info('Database sync executed correctly')
  })
