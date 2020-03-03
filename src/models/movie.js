export const MovieModel = (connection, type) => {
  return connection.define('movie', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: type.STRING(100),
      allowNull: false
    },
    state: {
      type: type.STRING(1),
      allowNull: false
    },
    rate: {
      type: type.INTEGER(1),
      allowNull: true
    }
  })
}
