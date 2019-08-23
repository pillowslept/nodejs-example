export const GenreModel = (connection, type) => {
  return connection.define('genre', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: type.STRING(100),
      allowNull: false
    }
  })
}
