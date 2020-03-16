export const ActorModel = (connection, type) => {
  return connection.define('actor', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: type.STRING(100),
      allowNull: false
    },
    picture: {
      type: type.STRING(200),
      allowNull: true
    },
    birthplace: {
      type: type.STRING(100),
      allowNull: true
    }
  })
}
