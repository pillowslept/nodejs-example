import { Sequelize } from 'sequelize'
import { connection } from 'config/connections'
import { MovieModel } from './movie'
import { GenreModel } from './genre'
import { CompanyModel } from './company'
import * as logger from 'config/logger'

export const Movie = MovieModel(connection, Sequelize)
export const Genre = GenreModel(connection, Sequelize)
export const Company = CompanyModel(connection, Sequelize)

const movieGenresRelation = {
  through: 'movie_genres',
  timestamps: false
}

Movie.belongsTo(Company)
Company.hasOne(Movie)
Movie.belongsToMany(Genre, movieGenresRelation)
Genre.belongsToMany(Movie, movieGenresRelation)

connection.sync({ force: true })
  .then(() => {
    logger.info('Database sync executed correctly')
  })
